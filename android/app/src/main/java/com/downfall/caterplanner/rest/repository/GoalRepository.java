package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.State;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class GoalRepository extends BaseRepository {

    public void insert(Goal goal){
        final String sql =
                "insert into goal values(?,?,?,?,?,?,?)";
        db.execSQL(sql, new String[]{
                String.valueOf(goal.getPurposeId()),
                String.valueOf(goal.getId()),
                String.valueOf(goal.getName()),
                String.valueOf(goal.getStartDate()),
                String.valueOf(goal.getEndDate()),
                String.valueOf(goal.getColor()),
                String.valueOf(goal.getStat())
        });
    }

    public List<Goal> selectByHeaderIdAndStat(long purposeId, State stat) throws ParseException {
        final String sql =
                "select purpose_id, id, name, start_date, end_date, color, stat " +
                        "from goal " +
                        "where purpose_id = ? and stat = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId), String.valueOf(stat)});
        List<Goal> goals = new ArrayList<>();
        while(c.moveToNext()){
            goals.add(
                    Goal.builder()
                            .purposeId(c.getLong(0))
                            .id(c.getInt(1))
                            .name(c.getString(3))
                            .startDate(DateUtil.parseToDate(c.getString(4)))
                            .endDate(DateUtil.parseToDate(c.getString(5)))
                            .color(c.getString(6))
                            .stat(State.findByValue(c.getInt(7)))
                            .build()
            );
        }
        return goals;
    }

    public List<Goal> selectByPurposeId(long purposeId) throws ParseException {
        final String sql =
                "select purpose_id, id, name, start_date, end_date, color, stat " +
                        "from goal " +
                        "where purpose_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId)});
        List<Goal> goals = new ArrayList<>(c.getCount());
        while(c.moveToNext()){
           goals.add(
                   Goal.builder()
                           .purposeId(c.getLong(0))
                           .id(c.getInt(1))
                           .name(c.getString(3))
                           .startDate(DateUtil.parseToDate(c.getString(4)))
                           .endDate(DateUtil.parseToDate(c.getString(5)))
                           .color(c.getString(6))
                           .stat(State.findByValue(c.getInt(7)))
                           .build()
           );
        }
        return goals;
    }

    public void deleteByPurposeId(long purposeId){
        final String sql =
                "delete from goal where purpose_id = ?";
        db.execSQL(sql, new String[]{String.valueOf(purposeId)});
    }

    public void updateStatByKey(long purposeId, int id, State state){
        final String sql =
                "update goal " +
                        "set stat = ? " +
                        "where purpose_id = ? and id = ?";
        db.execSQL(sql, new String[]{
                String.valueOf(state.getValue()),
                String.valueOf(purposeId),
                String.valueOf(id)
        });
    }




}
