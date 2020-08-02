package com.downfall.caterplanner.rest.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class SQLiteManager{

    private static boolean inTransactionShare = false;
    private SQLiteDatabase db;
    private SQLiteOpenHelper helper;
    private static SQLiteManager instance;

    public static void init(Context context){
        if(instance == null){
            instance = new SQLiteManager(context);
        }
    }

    public static SQLiteManager getInstance() {
        return instance;
    }

    private SQLiteManager(Context context) {
        helper = new SQLiteOpenHelper(context, "CaterPlanner.db", null,1) {
            @Override
            public void onCreate(SQLiteDatabase db) {
                db.execSQL("create table detailPlan_header( " +
                        "id integer primary key autoincrement, " +
                        "author_id integer, " +
                        "author_name text, " +
                        "base_id integer " +
                        ")");
                db.execSQL("create table purpose( " +
                        "id integer primary key autoincrement, " +
                        "author_name text, " +
                        "author_id integer, " +
                        "name text not null, " +
                        "description text not null, " +
                        "image_rul text not null, " +
                        "disclosure_scope integer not null, " +
                        "start_at text not null, " +
                        "decimal_day text " +
                        "stat integer not null, " +
                        "detailPlan_header_id integer, " +
                        "foreign key(detailPlan_header_id) references detailPlan_header(id) on update cascade on delete set null" +
                        ")");
                db.execSQL("create table goal( " +
                        "header_id integer, " +
                        "id integer, " +
                        "level integer not null, " +
                        "name text not null, " +
                        "start_date text not null, " +
                        "end_date text not null, " +
                        "color text not null, " +
                        "stat integer not null, " +
                        "foreign key(header_id) references detailPlan_header(id) on update cascade on delete cascade," +
                        "primary key(id, header_id)" +
                        ")");
                db.execSQL("create table perform( " +
                        "id integer, " +
                        "header_id integer, " +
                        "goal_id integer not null, " +
                        "name text not null, " +
                        "cycle text not null, " +
                        "foreign key(goal_id) references goal(id) on update cascade on delete cascade, " +
                        "foreign key(header_id) references detailPlan_header(id) on update cascade on delete cascade, " +
                        "primary key(id, header_id)" +
                        ")");
                db.execSQL("create table briefing( " +
                        "header_id integer, " +
                        "perform_id integer, " +
                        "create_at text not null, " +
                        "score integer default 0, " +
                        "foreign key(header_id) references detailPlan_header(id) on update cascade on delete cascade, " +
                        "foreign key(perform_id) references perform(id) on update cascade on delete cascade, " +
                        "primary key(header_id, perform_id)" +
                        ")");
            }

            @Override
            public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
                onCreate(db);
            }
        };
        this.db = helper.getWritableDatabase();
    }

    public SQLiteDatabase openDatabase(){
        return db;
    }

    public <T> T transaction(TransactionReturnableTask<T> method) throws Exception{
        T result;
        boolean isMain = false;
        try{

            if(!db.inTransaction() && !inTransactionShare) {
                db.beginTransaction();
                inTransactionShare = true;
                isMain = true;
            }
            result = method.task();

            if(db.inTransaction() && isMain) {
                db.setTransactionSuccessful();
            }
        }catch (Exception e){
            throw e;
        }finally {
            if(db.inTransaction() && isMain) {
                db.endTransaction();
                inTransactionShare = false;
            }
        }
        return result;
    }


    public void transaction(TransactionTask method) throws Exception{
        boolean isMain = false;
        try{

            if(!db.inTransaction() && !inTransactionShare) {
                db.beginTransaction();
                inTransactionShare = true;
                isMain = true;
            }
            method.task();

            if(db.inTransaction() && isMain) {
                db.setTransactionSuccessful();
            }
        }catch (Exception e){
            throw e;
        }finally {
            if(db.inTransaction() && isMain) {
                db.endTransaction();
                inTransactionShare = false;
            }
        }
    }

    @FunctionalInterface
    public interface TransactionReturnableTask<T>{
        T task() throws Exception;
    }

    @FunctionalInterface
    public interface TransactionTask{
        void task() throws Exception;
    }

}
