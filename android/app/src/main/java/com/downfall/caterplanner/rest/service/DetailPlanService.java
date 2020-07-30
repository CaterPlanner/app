package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.Briefing;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PerformRepository;
import com.facebook.react.bridge.ReadableArray;


import java.text.ParseException;
import java.util.List;

public class DetailPlanService extends BaseService {

    private GoalRepository goalRepository;
    private PerformRepository performRepository;
    private BriefingRepository briefingRepository;
    private DetailPlanHeaderRepository detailPlanHeaderRepository;
    private TasksService tasksService;

    public DetailPlanService(
            SQLiteHelper helper,
            GoalRepository goalRepository,
            PerformRepository performRepository,
            BriefingRepository briefingRepository,
            DetailPlanHeaderRepository detailPlanHeaderRepository,
            TasksService tasksService) {
        super(helper);

        this.goalRepository = goalRepository;
        this.performRepository = performRepository;
        this.briefingRepository = briefingRepository;
        this.detailPlanHeaderRepository = detailPlanHeaderRepository;
        this.tasksService = tasksService;

    }

    public long createByReact(ReadableArray r_detailPlans, Integer authorId, String authorName, Integer baseId) throws Exception{
        return SQLiteHelper.transaction(db, () -> {
            long headerId = detailPlanHeaderRepository.insert((long) authorId, authorName, (long)baseId);

            DetailPlans.quest(r_detailPlans, (goal, r_performs) -> {

                for(int i = 0; i < r_performs.size(); i++){
                    Perform perform = Perform.valueOf(r_performs.getMap(i));
                    perform.setGoalId(goal.getId());
                    performRepository.insert(perform);
                }

                goalRepository.insert(goal);
            });


            return headerId;
        });
    }

    public long createByReact(ReadableArray r_detailPlans, Integer authorId, String authorName) throws Exception{
        return this.createByReact(r_detailPlans, authorId, authorName, null);
    }


    /**
     * headerId와 일치하는 모든 detailPlan 들을 가져옴
     * headerId와 관련있는 모든 데이터들을 가져온 다음 껴맞춤
     *
     * @param headerId
     * @return
     * @throws ParseException
     */
    public DetailPlans read(long headerId) throws ParseException {
        List<Goal> goals = this.goalRepository.selectByHeaderId(headerId);
        List<Perform> performs = this.performRepository.selectByHeaderId(headerId);
        List<Briefing> briefings = this.briefingRepository.selectByHeaderId(headerId);

        return DetailPlans.valueOf(goals, performs, briefings);
    }

    public DetailPlans readShort(long headerId) throws ParseException{
        List<Goal> goals = this.goalRepository.selectByHeaderId(headerId);
        List<Perform> performs = this.performRepository.selectByHeaderId(headerId);
        return DetailPlans.valueOf(goals, performs);
    }

    /**
     * detailPlan 들을 수정
     * 기존 detailPlan 데이터를 모두 삭제후 새로운 데이터를 집어넣음
     * (서로 데이터들은 복잡한 관계를 맺고 잇으므로 update로 하나하나 바꿔주기엔 무리가 있음 안전성을 위해)
     *
     * @param headerId
     * @param r_detailPlans
     * @throws Exception
     */
    public void updateByReact(Integer headerId, ReadableArray r_detailPlans) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            goalRepository.deleteByHeaderId(headerId);
            //CASCADE 관계로 하위의 Goals 모두 삭제

            DetailPlans.quest(r_detailPlans, (goal, r_performs) -> {

                for(int i = 0; i < r_performs.size(); i++){
                    Perform perform = Perform.valueOf(r_performs.getMap(i));
                    perform.setGoalId(goal.getId());
                    performRepository.insert(perform);
                }

                goalRepository.insert(goal);
            });

            this.tasksService.updateSchedule(headerId, tasksService.create(DetailPlans.valueOf(r_detailPlans)));

        });
    }

    /**
     * detailPlan을 통으로 삭제
     *
     * @param headerId
     */
    public void deleteByReact(Integer headerId){
        this.goalRepository.deleteByHeaderId(headerId);
    }


    //setClear

}
