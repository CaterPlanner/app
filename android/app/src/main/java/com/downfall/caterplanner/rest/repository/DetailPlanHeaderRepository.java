package com.downfall.caterplanner.rest.repository;

import android.content.ContentValues;
import android.content.Context;

import com.downfall.caterplanner.rest.db.SQLiteHelper;

public class DetailPlanHeaderRepository extends BaseRepository{

    public DetailPlanHeaderRepository(SQLiteHelper helper) {
        super(helper);
    }

    public long insert(Long authorId, String authorName, Long baseId){
        ContentValues contentValues = new ContentValues();
        contentValues.put("author_id", authorId);
        contentValues.put("author_name", authorName);
        contentValues.put("base_id", baseId);
        return db.insert("detailPlan_header", null, contentValues);
    }

    public void deleteById(long id){
        final String sql =
                "delete from detailPlan_header where id = ?";
        db.execSQL(sql, new String[]{String.valueOf(id)});
    }


}
