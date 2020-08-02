package com.downfall.caterplanner.rest.repository;

import android.database.sqlite.SQLiteDatabase;

import com.downfall.caterplanner.rest.db.SQLiteManager;

public abstract class BaseRepository {

    protected SQLiteDatabase db;

    public BaseRepository(){
        db = SQLiteManager.getInstance().openDatabase();
    }
}
