package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.model.Purpose;
import com.downfall.caterplanner.rest.db.SQLiteManager;
import com.downfall.caterplanner.rest.model.State;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;

import java.text.ParseException;

public class PurposeService{

    private PurposeRepository purposeRepository;
    private DetailPlansService detailPlanService;
    private BriefingRepository briefingRepository;
    private GoalRepository goalRepository;

    public PurposeService(PurposeRepository purposeRepository, DetailPlansService detailPlanService, BriefingRepository briefingRepository, GoalRepository goalRepository) {
        this.purposeRepository = purposeRepository;
        this.briefingRepository = briefingRepository;
        this.detailPlanService = detailPlanService;
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
        purpose.setStat(State.WAIT);
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
    public Long createByReact(ReadableMap r_purpose, ReadableArray r_detailPlans, Long baseId) throws Exception{
        return SQLiteManager.getInstance().transaction(() -> {
            Purpose purpose = Purpose.valueOf(r_purpose);
            purpose.setStat(State.WAIT);
            purpose.setDetailPlanHeaderId((long) baseId);
            Long id = purposeRepository.insert(purpose);
            if(r_detailPlans != null){
                long detailPlanHeaderId = detailPlanService.createByReact(r_detailPlans, purpose.getAuthorId(), purpose.getAuthorName(), baseId);
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
    public WritableMap readForCard(long id) throws ParseException {
        return writableCard(read(id));
    }


    public WritableArray readAllForCard() throws ParseException {
        Purpose[] purposes = this.purposeRepository.selectByStatIsActive();
        WritableArray result = Arguments.createArray();
        for(Purpose purpose : purposes){
            result.pushMap(writableCard(purpose));
        }
        return result;
    }

    public void updateShort(long id, ReadableMap r_purpose) throws Exception {
        this.purposeRepository.updatePurposeDate(id, Purpose.valueOf(r_purpose));
    }

    public void update(long id, ReadableMap r_purpose, ReadableArray r_detailPlans) throws Exception {
        SQLiteManager.getInstance().transaction(() -> {
            this.purposeRepository.updatePurposeDate(id, Purpose.valueOf(r_purpose));
            this.detailPlanService.update(id, r_detailPlans);
        });
    }

    public void delete(long id) throws Exception{
        SQLiteManager.getInstance().transaction(() -> {
            Purpose purpose = this.purposeRepository.selectById(id);
            if(purpose == null)
                throw new Exception();

            this.purposeRepository.deleteById(id);
            this.detailPlanService.delete((int) purpose.getId());
        });
    }

    public void startSchedule(long id){
        this.purposeRepository.updateStatById(id, State.PROCEED);
    }

    public void stopSchedule(long id){
        this.purposeRepository.updateStatById(id, State.WAIT);
    }

    @Deprecated
    public void refresh() throws Exception {
        SQLiteManager.getInstance().transaction(() -> {
            Purpose[] purposes = purposeRepository.selectByStatIsActive();
            LocalDate today = LocalDate.now();

            for(Purpose purpose : purposes){
                DetailPlans detailPlans = detailPlanService.readShort(purpose.getDetailPlanHeaderId());

                int t_proceesUpdateLevel = -1;

                for(Goal goal : detailPlans.getEntryData()) {
                    if(goal.getLevel() >= t_proceesUpdateLevel)
                        continue;
                    if (goal.getStat().isPass())
                        continue;

                    if (today.isAfter(goal.getEndDate())) {
                        goal.setStat(goal.achieve() >= 80 ? State.SUCCESS : State.PROCEED);
                        goalRepository.updateStatByKey(purpose.getDetailPlanHeaderId(), goal.getId(), goal.getStat());

                        if(detailPlans.isLevelClear(goal.getLevel())){
                            for(Goal nextGoal : detailPlans.getGoalsByLevel(goal.getLevel() + 1)){
                                goalRepository.updateStatByKey(purpose.getDetailPlanHeaderId(), nextGoal.getId(), State.PROCEED);
                                t_proceesUpdateLevel = goal.getLevel() + 1;
                            }
                        }
                    }

                }

                purpose.statistion();

                //실패처리를 어떻게 할것인지
                if(today.isAfter(purpose.getDecimalDay())){
                    purpose.setStat(purpose.achieve() == 100 ? State.SUCCESS : State.FAIL);
                    purposeRepository.updateStatById(purpose.getId(), purpose.getStat());
                }
            }
        });
    }

    public void addBriefing(long id, int goalId, int performId) throws Exception {
        SQLiteManager.getInstance().transaction(() -> {
            Purpose purpose = purposeRepository.selectById(id);
            briefingRepository.insert(purpose.getDetailPlanHeaderId(), performId);

            DetailPlans detailPlans = detailPlanService.read(purpose.getDetailPlanHeaderId());
            Goal goal = detailPlans.getEntryData().get(goalId - 1);


            if(goal.achieve() == 100 && goal.getStat() == State.PROCEED){
                goal.setStat(State.SUCCESS);
                goalRepository.updateStatByKey(purpose.getDetailPlanHeaderId(), goalId, State.SUCCESS);

                if(detailPlans.isLevelClear(goal.getLevel())){
                    for(Goal nextGoal : detailPlans.getGoalsByLevel(goal.getLevel() + 1)){
                        goalRepository.updateStatByKey(purpose.getDetailPlanHeaderId(), nextGoal.getId(), State.PROCEED);
                    }
                }
            }
            if(purpose.achieve() == 100 && purpose.getStat() == State.PROCEED){
                purpose.setStat(State.SUCCESS);
                purposeRepository.updatePurposeDate(purpose.getId(), purpose);
            }
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
            if(goal.getStat().isPass())
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
