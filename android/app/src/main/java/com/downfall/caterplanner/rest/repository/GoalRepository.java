package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class GoalRepository extends BaseRepository {
    public GoalRepository(SQLiteHelper helper) {
        super(helper);
    }

    public void insert(Goal goal){
        final String sql =
                "insert into goal values(?,?,?,?,?,?,?)";
        db.execSQL(sql, new String[]{
                String.valueOf(goal.getHeaderId()),
                String.valueOf(goal.getId()),
                String.valueOf(goal.getName()),
                String.valueOf(goal.getStartDate()),
                String.valueOf(goal.getEndDate()),
                String.valueOf(goal.getColor()),
                String.valueOf(goal.getStat())
        });
    }

    public List<Goal> selectByHeaderIdAndStat(long headerId, int stat) throws ParseException {
        final String sql =
                "select header_id, id, previous_id, name, start_date, end_date, color, stat " +
                        "from goal " +
                        "where header_id = ? and stat = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId), String.valueOf(stat)});
        List<Goal> goals = new ArrayList<>();
        while(c.moveToNext()){
            goals.add(
                    Goal.builder()
                            .headerId(c.getLong(0))
                            .id(c.getInt(1))
                            .level(c.getInt(2))
                            .name(c.getString(3))
                            .startDate(DateUtil.parseToDate(c.getString(4)))
                            .endDate(DateUtil.parseToDate(c.getString(5)))
                            .color(c.getString(7))
                            .stat(c.getInt(8))
                            .build()
            );
        }
        return goals;
    }

    public List<Goal> selectByHeaderId(long headerId) throws ParseException {
        final String sql =
                "select header_id, id, previous_id, name, start_date, end_date, color, stat " +
                        "from goal " +
                        "where header_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId)});
        List<Goal> goals = new ArrayList<>(c.getCount());
        while(c.moveToNext()){
           goals.add(
                    Goal.builder()
                        .headerId(c.getLong(0))
                        .id(c.getInt(1))
                        .level(c.getInt(2))
                        .name(c.getString(3))
                        .startDate(DateUtil.parseToDate(c.getString(4)))
                        .endDate(DateUtil.parseToDate(c.getString(5)))
                        .color(c.getString(7))
                        .stat(c.getInt(8))
                        .build()
           );
        }
        return goals;
    }

    public void deleteByHeaderId(long headerId){
        final String sql =
                "delete from goal where header_id = ?";
        db.execSQL(sql, new String[]{String.valueOf(headerId)});
    }

    public void updateStatByKey(long headerId, int id, int stat){
        final String sql =
                "update goal " +
                        "set stat = ? " +
                        "where header_id = ? and id = ?";
        db.execSQL(sql, new String[]{
                String.valueOf(headerId),
                String.valueOf(id),
                String.valueOf(stat)
        });
    }

}
