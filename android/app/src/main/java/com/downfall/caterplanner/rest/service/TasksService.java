package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.detailplanmaker.algorithm.RelationTree;
import com.downfall.caterplanner.detailplanmaker.manufacture.GPScheduleMaker;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Task;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.TaskRepositiory;
import com.facebook.react.bridge.ReadableArray;

public class TasksService extends BaseService{

    private TaskRepositiory taskRepositiory;
    private GoalRepository goalRepository;

    public TasksService(SQLiteHelper helper, TaskRepositiory taskRepositiory, GoalRepository goalRepository) {
        super(helper);
        this.taskRepositiory = taskRepositiory;
        this.goalRepository = goalRepository;
    }

    public Task[] create(DetailPlans detailPlans) throws Exception {
        RelationTree tree = RelationTree.Builder.build(detailPlans);
        GPScheduleMaker maker = new GPScheduleMaker();

        return maker.make(tree.getRoot());
    }

    @Deprecated
    //purpose가 시간차로 종료되더라도 결국엔
    public void clear(long headerId, int goalKey) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            taskRepositiory.updateActive(headerId, goalKey);
            taskRepositiory.deleteByHeaderIdAndGoalId(headerId, goalKey);
        });
    }

    public void registerSchedule(long headerId, Task[] tasks) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            for(int i = 0; i < tasks.length; i++){
                taskRepositiory.insert(headerId, tasks[i]);
            }
        });
    }

    public void updateSchedule(long headerId, Task[] tasks) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            taskRepositiory.deleteByHeaderID(headerId);
            registerSchedule(headerId, tasks);
        });
    }

    public void unregisterSchedule(long headerId){
        taskRepositiory.deleteByHeaderID(headerId);
    }

}
