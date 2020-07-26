package com.downfall.caterplanner.rest.repository;

import android.database.sqlite.SQLiteDatabase;

import com.downfall.caterplanner.rest.db.SQLiteHelper;

public abstract class BaseRepository {

    protected SQLiteDatabase db;

    public BaseRepository(SQLiteHelper helper){
        db = helper.getWritableDatabase();
    }
}
