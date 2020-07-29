package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.Purpose;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PerformRepository;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;


import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class DetailPlanService extends BaseService {

    private GoalRepository goalRepository;
    private PerformRepository performRepository;
    private BriefingRepository briefingRepository;

    public DetailPlanService(
            SQLiteHelper helper,
            GoalRepository goalRepository,
            PerformRepository performRepository,
            BriefingRepository briefingRepository) {
        super(helper);

        this.goalRepository = goalRepository;
        this.performRepository = performRepository;
        this.briefingRepository = briefingRepository;
    }

    public void createByReact(Integer purposeId, ReadableArray r_detailPlans) throws Exception{
        SQLiteHelper.transaction(db, () -> {

            for(int i = 0; i < r_detailPlans.size(); i++){
                ReadableMap map = r_detailPlans.getMap(i);
                Goal goal = Goal.valueOf(map);
                goal.setPurposeId(purposeId);
                ReadableArray r_performs = map.getArray("performs");

                for(int j = 0; j < r_performs.size(); j++){
                    Perform perform = Perform.valueOf(r_performs.getMap(i));
                    perform.setGoalKey(goal.getKey());
                    performRepository.insert(perform);
                }

                goalRepository.insert(goal);
            }
        });
    }


    /**
     * headerId와 일치하는 모든 detailPlan 들을 가져옴
     *
     * @param purposeId
     * @return
     * @throws ParseException
     */
    public Goal[] read(long purposeId) throws ParseException {
        Goal[] goals = this.goalRepository.selectByPurposeId(purposeId);
        Perform[] performs = this.performRepository.selectByPurposeId(purposeId);

        List<Perform>[] performListByGoal = new List[goals.length];
        for(Perform perform : performs){
            final int INDEX = perform.getGoalKey() - 1;
            if(performListByGoal[INDEX] == null){
                performListByGoal[INDEX] = new ArrayList<>();
            }
            performListByGoal[INDEX].add(perform);
        }

        for(int i = 0; i < performs.length; i++){
            goals[i].setPerforms(performListByGoal[i].toArray(new Perform[performListByGoal[i].size()]));
        }

        return goals;
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
    public void updateByReact(Integer purposeId, ReadableArray r_detailPlans) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            goalRepository.deleteByPurposeId(purposeId);
            //CASCADE 관계로 하위의 Goals 모두 삭제

            for(int i = 0; i < r_detailPlans.size(); i++){
                ReadableMap map = r_detailPlans.getMap(i);
                Goal goal = Goal.valueOf(map);
                ReadableArray r_performs = map.getArray("performs");

                for(int j = 0; j < r_performs.size(); j++){
                    Perform perform = Perform.valueOf(r_performs.getMap(i));
                    performRepository.insert(perform);
                }

                goalRepository.insert(goal);
            }

        });
    }

    /**
     * detailPlan을 통으로 삭제
     *
     * @param purposeId
     */
    public void deleteByReact(Integer purposeId){
        this.goalRepository.deleteByPurposeId(purposeId);
    }


    //setClear

}
