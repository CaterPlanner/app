package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.model.Briefing;
import com.downfall.caterplanner.rest.db.SQLiteManager;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class BriefingRepository extends BaseRepository{


    public List<Briefing> selectByHeaderId(long headerId) throws ParseException {
        final String sql =
                "select header_id, perfrom_id, create_at, score " +
                        "from briefing " +
                        "where header_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId)});
        List<Briefing> briefings = new ArrayList<>();
        while(c.moveToNext()){
            briefings.add(
                    Briefing.builder()
                            .headerId(c.getLong(1))
                            .performId(c.getInt(3))
                            .createAt(DateUtil.parseToDateTime(c.getString(4)))
                            .score(c.getInt(5))
                            .build()
            );
        }
        return briefings;
    }


    public void insert(long headerId, int performId){
        final String sql =
                "insert into briefing values(?, ?, datetime(\'now\'), 0)";
        db.execSQL(sql, new String[]{String.valueOf(headerId), String.valueOf(performId)});
    }


}
