package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.db.SQLiteManager;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PerformRepository extends BaseRepository{


    //id not AI
    public void insert(Perform perform){
        final String sql =
                "insert into perform values(?,?,?,?,?,?,?)";
        db.execSQL(sql, new String[]{String.valueOf(perform.getId()), String.valueOf(perform.getHeaderId()) ,String.valueOf(perform.getGoalId()),
                String.valueOf(perform.getName()), String.valueOf(perform.getCycle()), String.valueOf(perform.getStartDate()), String.valueOf(perform.getEndDate())});
    }

    public List<Perform> selectByHeaderId(long headerId) throws ParseException {
        final String sql =
                "select header_id, goal_id, id, name, cycle, start_date, end_date " +
                        "from perform " +
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
                            .cycle(c.getString(4))
                            .startDate(DateUtil.parseToDate(c.getString(5)))
                            .endDate(DateUtil.parseToDate(c.getString(6)))
                            .build()
            );
        }
        return performs;
    }


    public List<Perform> selectByHeaderIdAndInGoalId(long headerId, List<Goal> goals) throws ParseException {
        final String sql =
                "select header_id, goal_id, id, name, cycle, start_date, end_date " +
                        "from perform " +
                        "where header_id = ? " +
                        "and goal_id in (?)";

        StringBuilder builder = new StringBuilder();
        builder.append(goals.get(0).getId());
        for(int i = 1; i < goals.size(); i++) {
            builder.append(",");
            builder.append(goals.get(i).getId());
        }
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId), builder.toString()});
        List<Perform> performs = new ArrayList<>(c.getCount());
        while(c.moveToNext()){
            performs.add(
                    Perform.builder()
                        .headerId(c.getLong(0))
                        .goalId(c.getInt(1))
                        .id(c.getInt(2))
                        .name(c.getString(3))
                        .cycle(c.getString(4))
                        .startDate(DateUtil.parseToDate(c.getString(5)))
                        .endDate(DateUtil.parseToDate(c.getString(6)))
                        .build()
            );
        }
        return performs;
    }


}
