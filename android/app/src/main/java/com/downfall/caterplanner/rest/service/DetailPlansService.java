package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.Briefing;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.db.SQLiteManager;
import com.downfall.caterplanner.rest.model.State;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PerformRepository;
import com.facebook.react.bridge.ReadableArray;


import java.text.ParseException;
import java.util.List;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DetailPlansService{

    private GoalRepository goalRepository;
    private PerformRepository performRepository;
    private BriefingRepository briefingRepository;


    public void createByReact(ReadableArray r_detailPlans, Long purposeId) throws Exception{
        SQLiteManager.getInstance().transaction(() -> {

            DetailPlans.quest(r_detailPlans, (goal, r_performs) -> {

                for(int i = 0; i < r_performs.size(); i++){
                    Perform perform = Perform.valueOf(r_performs.getMap(i));
                    perform.setPurposeId(purposeId);
                    perform.setGoalId(goal.getId());
                    performRepository.insert(perform);
                }
                goal.setPurposeId(purposeId);
                goalRepository.insert(goal);
            });


        });
    }



    /**
     * headerId와 일치하는 모든 detailPlan 들을 가져옴
     * headerId와 관련있는 모든 데이터들을 가져온 다음 껴맞춤
     *
     * @param purposeId
     * @return
     * @throws ParseException
     */
    public DetailPlans read(long purposeId) throws ParseException {
        List<Goal> goals = this.goalRepository.selectByPurposeId(purposeId);
        List<Perform> performs = this.performRepository.selectByPurposeId(purposeId);
        List<Briefing> briefings = this.briefingRepository.selectByHeaderId(purposeId);

        return DetailPlans.valueOf(goals, performs, briefings);
    }

    public DetailPlans readShort(long purposeId) throws ParseException{
        List<Goal> goals = this.goalRepository.selectByPurposeId(purposeId);
        List<Perform> performs = this.performRepository.selectByPurposeId(purposeId);
        return DetailPlans.valueOf(goals, performs);
    }

    @Deprecated //목표 화면 ui에 정해진 것이 없음
    public DetailPlans readInActive(long purposeId) throws ParseException {
        List<Goal> goals = this.goalRepository.selectByHeaderIdAndStat(purposeId, State.PROCEED);
        List<Perform> performs = this.performRepository.selectByPurposeIdAndInGoalId(purposeId, goals);
        return DetailPlans.valueOf(goals, performs);
    }

    /**
     * detailPlan 들을 수정
     * 기존 detailPlan 데이터를 모두 삭제후 새로운 데이터를 집어넣음
     * (서로 데이터들은 복잡한 관계를 맺고 잇으므로 update로 하나하나 바꿔주기엔 무리가 있음 안전성을 위해)
     *
     * @param purposeId
     * @param r_detailPlans
     * @throws Exception
     */
    public void update(long purposeId, ReadableArray r_detailPlans) throws Exception {
        SQLiteManager.getInstance().transaction(() -> {
            goalRepository.deleteByPurposeId(purposeId);
            //CASCADE 관계로 하위의 Goals 모두 삭제

            DetailPlans.quest(r_detailPlans, (goal, r_performs) -> {

                for(int i = 0; i < r_performs.size(); i++){
                    Perform perform = Perform.valueOf(r_performs.getMap(i));
                    perform.setGoalId(goal.getId());
                    performRepository.insert(perform);
                }

                goalRepository.insert(goal);
            });
        });
    }

    /**
     * detailPlan을 통으로 삭제
     *
     * @param headerId
     */
    public void delete(Integer headerId){
        this.goalRepository.deleteByPurposeId(headerId);
    }


    //setClear

}
