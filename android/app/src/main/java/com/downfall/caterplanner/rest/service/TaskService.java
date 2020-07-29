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

    public void registerSchedule(long headerId, Task[] tasks) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            for(int i = 0; i < tasks.length; i++){
                taskRepositiory.insert(headerId, tasks[i]);
            }
        });
    }

    public void updateSchedule(long headerId, Task[] tasks){
        
    }

    public void unregisterSchedule(long headerId, Task[] tasks){

    }

}
