package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.common.model.Briefing;
import com.downfall.caterplanner.rest.db.SQLiteHelper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BriefingRepository extends BaseRepository{

    public BriefingRepository(SQLiteHelper helper) {
        super(helper);
    }

    public Briefing[] selectByHeaderIdAndDetailPlanKey(long headerId, long detailPlanKey){
        final String sql =
                "select header_id, detailplan_key, create_at, score " +
                        "from briefing " +
                        "where header_id = ? and detailplan_key = ?";

        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(headerId), String.valueOf(detailPlanKey)});
        Briefing[] briefings = new Briefing[c.getCount()];
        while(c.moveToNext()){
            briefings[c.getPosition()] =
                    Briefing.builder()
                    .headerId(c.getLong(1))
                    .detailPlanKey(c.getLong(2))
                    .createAt(LocalDate.parse(c.getString(3), DateTimeFormatter.ISO_DATE))
                    .score(c.getInt(4))
                    .build();
        }
        return briefings.length == 0 ? null : briefings;
    }

    public void insert(long headerId, long detailPlanKey){
        final String sql =
                "insert into briefing values(?, ? , datetime(\'now\'), 0)";
        db.execSQL(sql, new String[]{String.valueOf(headerId), String.valueOf(detailPlanKey)});
    }
}
