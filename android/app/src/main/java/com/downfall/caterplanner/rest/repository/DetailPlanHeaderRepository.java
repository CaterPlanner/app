package com.downfall.caterplanner.rest.repository;

import android.content.ContentValues;

import com.downfall.caterplanner.rest.db.SQLiteHelper;

public class DetailPlanHeaderRepository extends BaseRepository{

    public DetailPlanHeaderRepository(SQLiteHelper helper) {
        super(helper);
    }

    public void insert(long purposeId, long authorId, String authorName, long baseId){
        final String sql =
                "insert into detailPlan_header values(?,?,?,?)";
        db.execSQL(sql, new String[]{String.valueOf(purposeId), String.valueOf(authorId), String.valueOf(authorName), String.valueOf(baseId)});
    }

    public void deleteById(long id){
        final String sql =
                "delete from detailPlan_header where id = ?";
        db.execSQL(sql, new String[]{String.valueOf(id)});
    }
}
