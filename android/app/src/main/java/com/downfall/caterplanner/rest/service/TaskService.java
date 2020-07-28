package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.Task;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.TaskRepositiory;
import com.facebook.react.bridge.ReadableArray;

public class TaskService extends BaseService{

    TaskRepositiory taskRepositiory;

    public TaskService(SQLiteHelper helper, TaskRepositiory taskRepositiory) {
        super(helper);
        this.taskRepositiory = taskRepositiory;
    }

    public void createByReact(Integer purposeId, ReadableArray r_tasks) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            for(int i = 0; i < r_tasks.size(); i++){
                Task task = Task.valueOf(r_tasks.getMap(i));
                taskRepositiory.insert(purposeId, task);
            }
        });
    }

}
