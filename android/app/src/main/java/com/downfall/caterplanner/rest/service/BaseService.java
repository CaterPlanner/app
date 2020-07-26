package com.downfall.caterplanner.rest.service;

import android.database.sqlite.SQLiteDatabase;

import com.downfall.caterplanner.rest.db.SQLiteHelper;

public class BaseService {

    protected SQLiteDatabase db;

    public BaseService(SQLiteHelper helper){
        db = helper.getWritableDatabase();
    }
}
