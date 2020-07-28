package com.downfall.caterplanner.rest.repository;

import android.content.ContentValues;
import android.database.Cursor;

import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;

public class DetailPlanRepository extends BaseRepository {

    public DetailPlanRepository(SQLiteHelper helper) {
        super(helper);
    }

    public int insert(DetailPlan detailPlan) {
        ContentValues contentValues = new ContentValues();
        contentValues.put("key", detailPlan.getKey());
        contentValues.put("purpose_Id", detailPlan.getPurposeId());
        contentValues.put("constructor_key", detailPlan.getConstructorKey());
        contentValues.put("constructor_relation_type", detailPlan.getConstructorRelationType());
        contentValues.put("name", detailPlan.getName());
        contentValues.put("type", detailPlan.getType().getValue());
        contentValues.put("start_date", detailPlan.getStartDate().toString());
        contentValues.put("end_date", detailPlan.getEndDate().toString());
        contentValues.put("hope_achievement", detailPlan.getHopeAchievement());
        contentValues.put("color", detailPlan.getColor());
        contentValues.put("stat", detailPlan.getStat());

        return (int) db.insert("detailPlan", null, contentValues);
    }

    public DetailPlan selectByKey(long key) throws ParseException {
        final String sql =
                "select key, purpose_id, constructor_key, constructor_relation_type, name, type, " +
                        "start_date, end_date, hope_achievement, color, cycle, stat " +
                        "from detailPlan where key = ?";

        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(key)});
        DetailPlan detailPlan = null;
        if (c.moveToFirst()) {
            detailPlan =
                    DetailPlan.builder()
                            .key(c.getInt(0))
                            .purposeId(c.getLong(1))
                            .constructorKey(c.getInt(2))
                            .constructorRelationType(c.getInt(3))
                            .name(c.getString(4))
                            .type(Type.findByValue(c.getString(5)))
                            .startDate(DateUtil.parseToDate(c.getString(6)))
                            .endDate(DateUtil.parseToDate(c.getString(7)))
                            .hopeAchievement(c.getInt(8))
                            .color(c.getString(9))
                            .cycle(c.getString(10))
                            .stat(c.getInt(11))
                            .build();

        }
        return detailPlan;
    }

    public DetailPlan[] selectByPurposeId(long purposeId) throws ParseException {
        final String sql =
                "select key, purpose_id, constructor_key, constructor_relation_type, name, type, " +
                        "start_date, end_date, hope_achievement, color, cycle, stat " +
                        "from detailPlan where purpose_id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(purposeId)});
        DetailPlan[] detailPlans = new DetailPlan[c.getCount()];

        while (c.moveToNext()) {
            String type = c.getString(5);
            detailPlans[c.getPosition()] = type.equals("G") ?
                    new Goal(
                            c.getInt(0),
                            c.getLong(1),
                            c.getInt(2),
                            c.getInt(3),
                            c.getString(4),
                            Type.findByValue(type),
                            DateUtil.parseToDate(c.getString(6)),
                            DateUtil.parseToDate(c.getString(7)),
                            c.getInt(8),
                            c.getString(9),
                            c.getString(10),
                            c.getInt(11)) :
                    new Perform(
                            c.getInt(0),
                            c.getLong(1),
                            c.getInt(2),
                            c.getInt(3),
                            c.getString(4),
                            Type.findByValue(type),
                            DateUtil.parseToDate(c.getString(6)),
                            DateUtil.parseToDate(c.getString(7)),
                            c.getInt(8),
                            c.getString(9),
                            c.getString(10),
                            c.getInt(11));

        }
        return detailPlans.length == 0 ? null : detailPlans;
    }


    public void updateStatByKey(long headerid, int detailPlanKey, int stat){
        final String sql =
                "update detailPlan " +
                        "set stat = ? " +
                        "where purpose_id = ? and detailPlan_key = ?";
        db.execSQL(sql, new String[]{String.valueOf(stat), String.valueOf(headerid), String.valueOf(detailPlanKey)});
    }

    public void deleteByPurposeId(long purposeId) {
        final String sql =
                "delete from detailPlan where purpose_id = ?";
        db.execSQL(sql, new String[]{String.valueOf(purposeId)});
    }
}
