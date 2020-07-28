package com.downfall.caterplanner.rest.repository;

import android.database.Cursor;

import com.downfall.caterplanner.rest.model.Briefing;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class BriefingRepository extends BaseRepository{

    public BriefingRepository(SQLiteHelper helper) {
        super(helper);
    }

    public List<Briefing> selectBypurposeIdAndDetailPlanKey(long purposeId, long detailPlanKey) throws ParseException {
        final String sql =
                "select purpose_id, detailplan_key, create_at, score " +
                        "from briefing " +
                        "where purpose_id = ? and detailplan_key = ?";

        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId), String.valueOf(detailPlanKey)});
        List<Briefing> briefings = new ArrayList<>();
        while(c.moveToNext()){
                briefings.add(
                    Briefing.builder()
                    .purposeId(c.getLong(1))
                    .detailPlanKey(c.getInt(2))
                    .createAt(DateUtil.parseToDateTime(c.getString(3)))
                    .score(c.getInt(4))
                    .build());
        }
        return briefings.length == 0 ? null : briefings;
    }

    public void insert(long purposeId, long detailPlanKey){
        final String sql =
                "insert into briefing values(?, ? , datetime(\'now\'), 0)";
        db.execSQL(sql, new String[]{String.valueOf(purposeId), String.valueOf(detailPlanKey)});
    }
}
