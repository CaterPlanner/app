package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;

public class GoalRepository extends BaseRepository {
    public GoalRepository(SQLiteHelper helper) {
        super(helper);
    }

    public void insert(Goal goal){
        final String sql =
                "insert into goal values(?,?,?,?,?,?,?,?)";
        db.execSQL(sql, new String[]{
                String.valueOf(goal.getPurposeId()),
                String.valueOf(goal.getKey()),
                String.valueOf(goal.getName()),
                String.valueOf(goal.getStartDate()),
                String.valueOf(goal.getEndDate()),
                String.valueOf(goal.getHopeAchievement()),
                String.valueOf(goal.getColor()),
                String.valueOf(goal.getStat())
        });
    }

    public List<Goal> selectByPurposeId(long purposeId) throws ParseException {
        final String sql =
                "select purpose_id, key, name, start_date, end_date, hope_achievement, color, stat " +
                        "where purpose_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId)});
        Goal[] goals = new Goal[c.getCount()];
        while(c.moveToNext()){
            goals[c.getPosition()] =
                    Goal.builder()
                        .purposeId(c.getLong(0))
                        .key(c.getInt(1))
                        .name(c.getString(2))
                        .startDate(DateUtil.parseToDate(c.getString(3)))
                        .endDate(DateUtil.parseToDate(c.getString(4)))
                        .hopeAchievement(c.getInt(5))
                        .color(c.getString(6))
                        .stat(c.getInt(7))
                        .build();
        }
        return goals;
    }

    public void deleteByPurposeId(long purposeId){
        final String sql =
                "delete from goal where purpose_id = ?";
        db.execSQL(sql, new String[]{String.valueOf(purposeId)});
    }

    public void updateStatByKey(long purposeId, int key, int stat){
        final String sql =
                "update goal " +
                        "set stat = ? " +
                        "where purpose_id = ? and key = ?";
        db.execSQL(sql, new String[]{
                String.valueOf(purposeId),
                String.valueOf(key),
                String.valueOf(stat)
        });
    }

}
