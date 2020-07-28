package com.downfall.caterplanner.rest.db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class SQLiteHelper extends SQLiteOpenHelper {

    private static boolean inTransactionShare = false;

    public SQLiteHelper(Context context, int version) {
        super(context, "/rest/CaterPlanner.db", null, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    public static <T> T transaction(SQLiteDatabase db, TransactionReturnableTask<T> method) throws Exception{
        T result;
        try{
            boolean isMain = false;

            if(!db.inTransaction()) {
                db.beginTransaction();
                inTransactionShare = true;
                isMain = true;
            }
            result = method.task();

            if(db.inTransaction() && isMain) {
                db.setTransactionSuccessful();
                inTransactionShare = false;
            }
        }catch (Exception e){
            throw e;
        }finally {
            if(db.inTransaction())
                db.endTransaction();
        }
        return result;
    }


    public static void transaction(SQLiteDatabase db, TransactionTask method) throws Exception{
        try{
            boolean isMain = false;

            if(!db.inTransaction()) {
                db.beginTransaction();
                inTransactionShare = true;
                isMain = true;
            }
            method.task();

            if(db.inTransaction() && isMain) {
                db.setTransactionSuccessful();
                inTransactionShare = false;
            }
        }catch (Exception e){
            throw e;
        }finally {
            if(db.inTransaction())
                db.endTransaction();
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
