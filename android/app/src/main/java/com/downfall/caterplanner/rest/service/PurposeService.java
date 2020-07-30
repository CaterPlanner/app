package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.detailplanmaker.algorithm.RelationTree;
import com.downfall.caterplanner.detailplanmaker.manufacture.GPScheduleMaker;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.model.Purpose;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.Task;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.downfall.caterplanner.rest.repository.TaskRepositiory;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;

import java.text.ParseException;

public class PurposeService extends BaseService {

    private PurposeRepository purposeRepository;
    private DetailPlanService detailPlanService;
    private BriefingRepository briefingRepository;
    private TasksService tasksService;
    private TaskRepositiory taskRepositiory;
    private GoalRepository goalRepository;

    public PurposeService(SQLiteHelper helper, PurposeRepository purposeRepository, DetailPlanService detailPlanService, BriefingRepository briefingRepository, TasksService tasksService, TaskRepositiory taskRepositiory, GoalRepository goalRepository) {
        super(helper);

        this.purposeRepository = purposeRepository;
        this.briefingRepository = briefingRepository;
        this.detailPlanService = detailPlanService;
        this.tasksService = tasksService;
        this.taskRepositiory = taskRepositiory;
        this.goalRepository = goalRepository;
    }

    /**
     * react native 에서 전달받아
     * Purpose 데이터만 등록 (detailPlans X)
     *
     * @param r_purpose
     * @return
     * @throws Exception
     */
    public Long createByReact(ReadableMap r_purpose) throws Exception {
        Purpose purpose = Purpose.valueOf(r_purpose);
        purpose.setStat(0);
        return purposeRepository.insert(purpose);
    }

    /**
     * react native 에서 전달받아
     * Purpose 등록 동시에 자신이 만든 detailPlan 들도 등록
     *
     * @param r_purpose
     * @param r_detailPlans
     * @return
     * @throws Exception
     */
    public Long createByReact(ReadableMap r_purpose, ReadableArray r_detailPlans) throws Exception{
        return createByReact(r_purpose, r_detailPlans, null);
    }

    /**
     *
     * react native 에서 전달받아
     * Purpose 등록 타 유저가 만든 detailPlan 들도 동시에 등록
     *
     * @param r_purpose
     * @param r_detailPlans
     * @param baseId
     * @return
     * @throws Exception
     */
    public Long createByReact(ReadableMap r_purpose, ReadableArray r_detailPlans, Integer baseId) throws Exception{
        return SQLiteHelper.transaction(db, () -> {
            Purpose purpose = Purpose.valueOf(r_purpose);
            purpose.setStat(0);
            purpose.setDetailPlanHeaderId((long) baseId);
            Long id = purposeRepository.insert(purpose);
            if(r_detailPlans != null){
                long detailPlanHeaderId = detailPlanService.createByReact(r_detailPlans, purpose.getAuthorId().intValue(), purpose.getAuthorName(), baseId);
                purpose.setDetailPlanHeaderId(detailPlanHeaderId);
            }
            return id;
        });
    }

    /**
     *
     * id와 일치하는 Purpose 와 관련 Perform , Goal 데이터도 불러
     * Purpose 에 대한 세부적인 데이터를 가져옴
     *
     * @param id
     * @return
     * @throws ParseException
     */
    private Purpose read(long id) throws ParseException {
        Purpose purpose = purposeRepository.selectById(id);
        DetailPlans detailPlans = this.detailPlanService.read(purpose.getDetailPlanHeaderId());
        purpose.setDetailPlans(detailPlans);
        return purpose;
    }

    /**
     * read() 결과 물을 react native 에 전달하기 위한 데이터로 가공
     *
     * @param id
     * @return
     * @throws ParseException
     */
    public WritableMap readForCardByReact(Integer id) throws ParseException {
        return writableCard(read(id));
    }


    public WritableArray readForCardAllByReact() throws ParseException {
        Purpose[] purposes = this.purposeRepository.selectByStatIsActive();
        WritableArray result = Arguments.createArray();
        for(Purpose purpose : purposes){
            result.pushMap(writableCard(purpose));
        }
        return result;
    }

    public void updateShortByReact(Integer id, ReadableMap r_purpose) throws Exception {
        this.purposeRepository.updatePurposeDate(id, Purpose.valueOf(r_purpose));
    }

    public void updateByReact(Integer id, ReadableMap r_purpose, ReadableArray r_detailPlans) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            this.purposeRepository.updatePurposeDate(id, Purpose.valueOf(r_purpose));
            this.detailPlanService.updateByReact(id, r_detailPlans);
        });
    }

    public void deleteByReact(Integer id) throws Exception{
        SQLiteHelper.transaction(db, () -> {
            Purpose purpose = this.purposeRepository.selectById(id);
            if(purpose == null)
                throw new Exception();

            this.purposeRepository.deleteById(id);
            this.detailPlanService.deleteByReact((int) purpose.getId());
        });
    }

    @Deprecated
    public void refresh() throws Exception {
        SQLiteHelper.transaction(db, () -> {
            Purpose[] purposes = purposeRepository.selectByStatIsActive();
            LocalDate today = LocalDate.now();

            for(Purpose purpose : purposes){
                DetailPlans unStatisDetailPlans = detailPlanService.readShort(purpose.getDetailPlanHeaderId());
                for(Goal goal : unStatisDetailPlans.getEntryData()){
//                    if(goal.getStat() == 0 && goal.getSt)



                    for(Perform perform : goal.getPerforms()){

                    }
                }
            }
        });
    }

    @Deprecated //종료 날짜가 다가오기전 희망 달성 수치를 넘었을때 어떻게 처리할건지
    public void addBriefing(Integer id, int goalId, int performId) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            Purpose purpose = purposeRepository.selectById(id);
            briefingRepository.insert(purpose.getDetailPlanHeaderId(), goalId, performId);

            DetailPlans detailPlans = detailPlanService.read(purpose.getDetailPlanHeaderId());
            Goal goal = detailPlans.getEntryData().get(goalId - 1);

            if(goal.isClear() && goal.getStat() == 0){
                goal.setStat(1);
                taskRepositiory.updateActive(purpose.getDetailPlanHeaderId(), goalId);
                taskRepositiory.deleteByHeaderIdAndGoalId(purpose.getDetailPlanHeaderId(), goalId);

                goalRepository.updateStatByKey(purpose.getDetailPlanHeaderId(), goalId, 1);
            }

            if(purpose.achieve() == 100 && purpose.getStat() == 1){
                purpose.setStat(2);
                purposeRepository.updatePurposeDate(purpose.getId(), purpose);
            }
        });
    }

    public void startSchedule(Integer id) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            Purpose purpose = purposeRepository.selectById(id);
            DetailPlans detailPlans = detailPlanService.readShort(purpose.getDetailPlanHeaderId());

            tasksService.registerSchedule(purpose.getDetailPlanHeaderId(), tasksService.create(detailPlans));

            purpose.setStat(1);
            purposeRepository.updatePurposeDate(id, purpose);
        });
    }

    public void stopSchedule(Integer id) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            Purpose purpose = purposeRepository.selectById(id);
            tasksService.unregisterSchedule(purpose.getDetailPlanHeaderId());
            purpose.setStat(0);
            purposeRepository.updatePurposeDate(id, purpose);
        });
    }

    private WritableMap writableCard(Purpose purpose){
        if(!purpose.isStatizable())
            throw new RuntimeException();

        WritableMap writablePurpose = Purpose.parseWritableMap(purpose);

        writablePurpose.putDouble("progress", purpose.progress());
        writablePurpose.putDouble("achieve", purpose.achieve());
        writablePurpose.putInt("leftDay", purpose.getLeftDay());

        WritableArray writableActivePerforms = Arguments.createArray();

        for(Goal goal : purpose.getDetailPlans().getEntryData()){
            if(goal.getStat() >= 1)
                continue;

            for(Perform perform : goal.getPerforms()){
                if(!perform.isActive())
                    continue;

                WritableMap w_perform = Arguments.createMap();
                w_perform.putString("name", perform.getName());
                w_perform.putDouble("progress", perform.progress());
                w_perform.putDouble("achieve", perform.achieve());
                w_perform.putInt("nextDay", perform.getNextLeftDayCount());
                w_perform.putString("goalName", goal.getName());
            }
        }

        writablePurpose.putArray("activePerforms", writableActivePerforms);
        return writablePurpose;
    }

}
