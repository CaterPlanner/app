package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;
import android.view.ActionMode;

import com.downfall.caterplanner.common.model.Task;
import com.downfall.caterplanner.rest.db.SQLiteHelper;

public class TaskRepositiory extends BaseRepository{

    public TaskRepositiory(SQLiteHelper helper) {
        super(helper);
    }

    public void insert(Task task){
        String sql =
                "insert into task values(?, ?, ?)";
        db.execSQL(sql, new String[]{String.valueOf(task.getHeaderId()), String.valueOf(task.getDetailPlanKey()), String.valueOf(task.getPreviousDetailPlanKey())});
    }

    public Task selectByKey(long headerId, int previousDetailPlanKey){
        String sql =
                "select header_id, detailPlan_key, previous_detailPlan_key from task header_id = ? and previous_detailPlan_key = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId), String.valueOf(previousDetailPlanKey)});
        Task task = null;
        if(c.moveToNext()){
            task = Task.builder()
                    .headerId(c.getLong(1))
                    .detailPlanKey(c.getInt(2))
                    .previousDetailPlanKey(c.getInt(3))
                    .build();
        }
        return task;
    }

    public Task[] selectActive(){
        String sql =
                "select header_id, detailPlan_key, previous_detailPlan_key from task where previous_detailPlan_key is null";
        Cursor c = db.rawQuery(sql, null);
        Task[] tasks = new Task[c.getCount()];

        while(c.moveToNext()){
            tasks[c.getPosition()] =
                    Task.builder()
                    .headerId(c.getLong(0))
                    .detailPlanKey(c.getInt(1))
                    .previousDetailPlanKey(c.getInt(2))
                    .build();
        }
        return tasks;
    }

    public void updateActive(long headerId, int previousDetailPlanKey){
        String sql =
                "update task set previous_detailPlan_key = null where header_id = ? and previous_detailPlan_key = ?";
        db.execSQL(sql, new String[]{String.valueOf(headerId), String.valueOf(previousDetailPlanKey)});
    }

    public void deleteByKey(long headerId, int detailPlanKey){
        String sql =
                "delete from task where header_id = ? and detail_plan_key = ?";
        db.execSQL(sql, new String[]{String.valueOf(headerId), String.valueOf(detailPlanKey)});
    }


}
