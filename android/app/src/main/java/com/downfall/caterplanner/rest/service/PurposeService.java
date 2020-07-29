package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.model.Purpose;
import com.downfall.caterplanner.rest.model.StatisticsDetailPlan;
import com.downfall.caterplanner.detailplanmaker.algorithm.Type;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.downfall.caterplanner.rest.repository.TaskRepositiory;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.text.ParseException;

public class PurposeService extends BaseService {

    private PurposeRepository purposeRepository;
    private DetailPlanService detailPlanService;
    private BriefingRepository briefingRepository;
    private TaskRepositiory taskRepositiory;
    private DetailPlanHeaderRepository detailPlanHeaderRepository;

    public PurposeService(SQLiteHelper helper, PurposeRepository purposeRepository, DetailPlanService detailPlanService, BriefingRepository briefingRepository, TaskRepositiory taskRepositiory) {
        super(helper);

        this.purposeRepository = purposeRepository;
        this.briefingRepository = briefingRepository;
        this.detailPlanService = detailPlanService;
        this.taskRepositiory = taskRepositiory;
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
        purpose.setStat(3);
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
            purpose.setStat(3);
            purpose.setBaseId((long) baseId);
            Long id = purposeRepository.insert(purpose);

            if(r_detailPlans != null){
                detailPlanService.createByReact(id.intValue(), r_detailPlans);
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
        Goal[] goals = this.detailPlanService.read(purpose.getId());
        purpose.setGoals(goals);
        return purpose;
    }

    /**
     * read() 결과 물을 react native 에 전달하기 위한 데이터로 가공
     *
     * @param id
     * @return
     * @throws ParseException
     */
    public WritableMap readByReact(Integer id) throws ParseException {
        return writableCard(read(id));
    }

    /**
     *
     *
     *
     * @return
     * @throws ParseException
     */
    public WritableArray readAllByReact() throws ParseException {
        Purpose[] purposes = this.purposeRepository.selectByStatIsActive();
        WritableArray result = Arguments.createArray();
        for(Purpose purpose : purposes){
            result.pushMap(writableCard(purpose));
        }
        return result;
    }

    public void updatePurposeByReact(Integer id, ReadableMap r_purpose) throws Exception {
        this.purposeRepository.updatePurposeDate(id, Purpose.valueOf(r_purpose));
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

    public void addBriefing(Integer id, int detailPlanKey) throws Exception {
        SQLiteHelper.transaction(db, () -> {
//            Purpose purpose = read(id);
//            this.briefingRepository.insert(purpose.getId(), detailPlanKey);
//
//            Briefing briefing =
//                    Briefing.builder()
//                            .purposeId(purpose.getId())
//                            .detailPlanKey(detailPlanKey)
//                            .score(0).build();
//
//            Perform perform = (Perform) purpose.getDetailPlans()[detailPlanKey - 1];
//            perform.getBriefings().add(briefing);
//
//            perform.statistion();
//
//            Goal goal = (Goal) this.detailPlans[perform.getConstructorKey() - 1];
//            goal.statistion();
//
//            perform.statistion();
//
//            if(goal.achieve() == 100){
//                goal.setStat(1);
//                detailPlanRepository.updateStatByKey(purpose.getId(), goal.getKey(), goal.getStat());
//
//                for(Perform perform1 : goal.getPerforms()){
//                    perform1.setStat(1);
//                    detailPlanRepository.updateStatByKey(purpose.getId(), perform1.getKey(), perform1.getStat());
//
//                    Task task = taskRepositiory.selectByKey(purpose.getId(), perform1.getKey());
//                    taskRepositiory.updateActive(purpose.getId(), task.getDetailPlanKey());
//                    taskRepositiory.deleteByKey(purpose.getId(), task.getDetailPlanKey());
//                }
//            }
        });
    }


    private WritableMap writableCard(Purpose purpose) throws ParseException {
        if(!purpose.isStatizable())
            throw new RuntimeException();

        WritableMap writablePurpose = Purpose.parseWritableMap(purpose);

        writablePurpose.putDouble("progress", purpose.progress());
        writablePurpose.putDouble("achieve", purpose.achieve());
        writablePurpose.putInt("leftDay", purpose.getLeftDay());

        WritableArray writableActivePerforms = Arguments.createArray();
        for(Goal goal : purpose.getGoals()){
            if(detailPlan.getType() == Type.P){
                WritableMap writablePerformInfo = Arguments.createMap();
                Perform perform = (Perform) detailPlan;
                writablePerformInfo.putString("name", perform.getName());
                writablePerformInfo.putDouble("progress", perform.progress());
                writablePerformInfo.putDouble("achieve", perform.achieve());
                writablePerformInfo.putInt("nextDay", perform.getNextLeftDayCount());
                writableActivePerforms.pushMap(writablePerformInfo);
            }
        }

        writablePurpose.putArray("activePerforms", writableActivePerforms);
        return writablePurpose;
    }

}
