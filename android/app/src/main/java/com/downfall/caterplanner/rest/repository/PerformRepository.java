package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;

public class PerformRepository extends BaseRepository{

    public PerformRepository(SQLiteHelper helper) {
        super(helper);
    }

    //id not AI
    public void insert(Perform perform){
        final String sql =
                "insert into perform values(?,?,?,?,?,?)";
        db.execSQL(sql, new String[]{String.valueOf(perform.getPurposeId()) ,String.valueOf(perform.getGoalKey()), String.valueOf(perform.getId()),
                String.valueOf(perform.getName()), String.valueOf(perform.getStartDate()), String.valueOf(perform.getEndDate()), String.valueOf(perform.getCycle())});
    }

    public Perform[] selectByPurposeId(long purposeId) throws ParseException {
        final String sql =
                "select purpose_id, goal_key, id, name, start_date, end_date, cycle " +
                        "where purpose_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId)});
        Perform[] performs = new Perform[c.getCount()];
        while(c.moveToNext()){
            performs[c.getPosition()] =
                    Perform.builder()
                            .purposeId(c.getLong(0))
                            .goalKey(c.getInt(1))
                            .id(c.getInt(2))
                            .name(c.getString(3))
                            .startDate(DateUtil.parseToDate(c.getString(4)))
                            .endDate(DateUtil.parseToDate(c.getString(5)))
                            .cycle(c.getString(6))
                            .build();
        }
        return performs;
    }

    public Perform[] selectByKey(long purposeId, int goalKey) throws ParseException {
        final String sql =
                "select purpose_id, goal_key, id, name, start_date, end_date, cycle " +
                        "where purpose_id = ? and goal_key = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId) ,String.valueOf(goalKey)});
        Perform[] performs = new Perform[c.getCount()];
        while(c.moveToNext()){
            performs[c.getPosition()] =
                    Perform.builder()
                        .purposeId(c.getLong(0))
                        .goalKey(c.getInt(1))
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
