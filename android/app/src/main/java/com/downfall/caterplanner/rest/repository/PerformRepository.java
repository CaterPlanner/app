package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class PerformRepository extends BaseRepository{

    public PerformRepository(SQLiteHelper helper) {
        super(helper);
    }

    //id not AI
    public void insert(Perform perform){
        final String sql =
                "insert into perform values(?,?,?,?,?,?)";
        db.execSQL(sql, new String[]{String.valueOf(perform.getHeaderId()) ,String.valueOf(perform.getGoalId()), String.valueOf(perform.getId()),
                String.valueOf(perform.getName()), String.valueOf(perform.getStartDate()), String.valueOf(perform.getEndDate()), String.valueOf(perform.getCycle())});
    }

    public List<Perform> selectByHeaderId(long headerId) throws ParseException {
        final String sql =
                "select header_id, goal_id, id, name, start_date, end_date, cycle " +
                        "where header_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId)});
        List<Perform> performs = new ArrayList<>(c.getCount());
        while(c.moveToNext()){
            performs.add(
                    Perform.builder()
                            .headerId(c.getLong(0))
                            .goalId(c.getInt(1))
                            .id(c.getInt(2))
                            .name(c.getString(3))
                            .startDate(DateUtil.parseToDate(c.getString(4)))
                            .endDate(DateUtil.parseToDate(c.getString(5)))
                            .cycle(c.getString(6))
                            .build()
            );
        }
        return performs;
    }

    public Perform[] selectByKey(long headerId, int goalId) throws ParseException {
        final String sql =
                "select header_id, goal_id, id, name, start_date, end_date, cycle " +
                        "where header_id = ? and goal_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId) ,String.valueOf(goalId)});
        Perform[] performs = new Perform[c.getCount()];
        while(c.moveToNext()){
            performs[c.getPosition()] =
                    Perform.builder()
                        .headerId(c.getLong(0))
                        .goalId(c.getInt(1))
                        .id(c.getInt(2))
                        .name(c.getString(3))
                        .startDate(DateUtil.parseToDate(c.getString(4)))
                        .endDate(DateUtil.parseToDate(c.getString(5)))
                        .cycle(c.getString(6))
                        .build();
        }
        return performs;
    }

}
