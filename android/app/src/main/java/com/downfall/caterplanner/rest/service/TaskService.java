package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.common.model.Task;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.TaskRepositiory;
import com.facebook.react.bridge.ReadableArray;

public class TaskService extends BaseService{

    TaskRepositiory taskRepositiory;

    public TaskService(SQLiteHelper helper, TaskRepositiory taskRepositiory) {
        super(helper);
        this.taskRepositiory = taskRepositiory;
    }

    public void createByReact(ReadableArray r_tasks) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            for(int i = 0; i < r_tasks.size(); i++){
                Task task = Task.valueOf(r_tasks.getMap(i));
                taskRepositiory.insert(task);
            }
        });
    }

    public void pass(long headerId, int detailPlanKey) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            Task task = taskRepositiory.selectByKey(headerId, detailPlanKey);
            taskRepositiory.updateActive(headerId, task.getDetailPlanKey());
            taskRepositiory.deleteByKey(headerId, task.getDetailPlanKey());
        });
    }
}
