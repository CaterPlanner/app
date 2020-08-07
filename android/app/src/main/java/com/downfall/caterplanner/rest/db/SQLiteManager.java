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
                db.execSQL("create table purpose( " +
                        "id integer primary key autoincrement, " +
                        "name text not null, " +
                        "description text not null, " +
                        "image_url text not null, " +
                        "disclosure_scope integer not null, " +
                        "start_at text not null, " +
                        "decimal_day text " +
                        "stat integer not null" +
                        ")");
//                db.execSQL("create table purpose( " + detailPlanHeader는 그냥 삭제하기로 결정 왜냐면 사용자가 편집할때마다 새로운 아이디가 생성되야하므로
//                        "id integer primary key autoincrement, " +     왜냐면 변경하였을때 어떤 사용자가 적용하였을경우 그 데이터는 남아있어얗마ㅡ로
//                        "purpose_id integer, " +
//                        "detailPlan_header_id integer," +
//                        "foreign key(purpose_id) references purpose(id) on update cascade on delete cascade" +
//                        ")");
                db.execSQL("create table goal( " +
                        "purpose_id integer, " +
                        "id integer, " +
                        "name text not null, " +
                        "start_date text not null, " +
                        "end_date text not null, " +
                        "color text not null, " +
                        "stat integer not null, " +
                        "foreign key(purpose_id) references purpose(id) on update cascade on delete cascade," +
                        "primary key(id, purpose_id)" +
                        ")");
                db.execSQL("create table perform( " +
                        "id integer, " +
                        "purpose_id integer, " +
                        "goal_id integer not null, " +
                        "name text not null, " +
                        "cycle text not null, " +
                        "start_date text not null, " +
                        "end_date text not null," +
                        "foreign key(goal_id) references goal(id) on update cascade on delete cascade, " +
                        "foreign key(purpose_id) references purpose(id) on update cascade on delete cascade, " +
                        "primary key(id, purpose_id)" +
                        ")");
                db.execSQL("create table briefing( " +
                        "purpose_id integer, " +
                        "perform_id integer, " +
                        "create_at text not null, " +
                        "score integer default 0, " +
                        "foreign key(purpose_id) references purpose(id) on update cascade on delete cascade, " +
                        "foreign key(perform_id) references perform(id) on update cascade on delete cascade, " +
                        "primary key(purpose_id, perform_id)" +
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
