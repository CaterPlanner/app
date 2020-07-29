package com.downfall.caterplanner.rest.repository;

import android.content.ContentValues;
import android.database.Cursor;

import com.downfall.caterplanner.rest.model.Purpose;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;

public class PurposeRepository extends BaseRepository {

    public PurposeRepository(SQLiteHelper helper) {
        super(helper);
    }

    public long insert(Purpose purpose){
        ContentValues contentValues = new ContentValues();
        contentValues.put("id", purpose.getId());
        contentValues.put("author_id", purpose.getAuthorId());
        contentValues.put("author_name", purpose.getAuthorName());
        contentValues.put("group_id", purpose.getGroupId());
        contentValues.put("group_name", purpose.getGroupName());
        contentValues.put("name", purpose.getName());
        contentValues.put("description", purpose.getDescription());
        contentValues.put("imageUrl", purpose.getImageUrl());
        contentValues.put("disclosureScope",purpose.getDisclosureScope());
        contentValues.put("startAt", purpose.getStartAt().toString());
        contentValues.put("decimalDay", purpose.getDecimalDay().toString());
        contentValues.put("stat", purpose.getStat());
        contentValues.put("detailPlanHeaderId", purpose.getDetailPlanHeaderId());
        return db.insert("purpose", null, contentValues);
    }

    public Purpose selectById(long id) throws ParseException {
        final String sql =
                "select id , author_name, author_id, group_name, group_id, name, " +
                        "description, image_url, disclosure_scope, start_at, decimal_day, stat, detailPlan_header_id " +
                        "from purpose where id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(id)});
        Purpose purpose = null;
        if(c.moveToFirst()){
            purpose = Purpose.builder()
                    .id(c.getLong(1))
                    .authorName(c.isNull(2) ? null : c.getString(2))
                    .authorId(c.isNull(3) ? null : c.getLong(3))
                    .groupName(c.isNull(4) ? null : c.getString(4))
                    .groupId(c.isNull(5) ? null :  c.getLong(5))
                    .name(c.getString(6))
                    .description(c.getString(7))
                    .imageUrl(c.getString(8))
                    .disclosureScope( c.getInt(9))
                    .startAt(DateUtil.parseToDateTime(c.getString(10)))
                    .decimalDay(DateUtil.parseToDate(c.getString(11)))
                    .stat(c.getInt(12))
                    .detailPlanHeaderId(c.getLong(13))
                    .build();

        }
        return purpose;
    }

    public Purpose[] selectByStatIsActive() throws ParseException {
        final String sql =
                "select id , author_name, author_id, group_name, group_id, name, " +
                        "description, image_url, disclosure_scope, start_at, decimal_day, stat, detailPlan_header_id " +
                        "from purpose where stat = 0";
        Cursor c = db.rawQuery(sql, null);
        Purpose[] purposes = new Purpose[c.getCount()];
        if(c.moveToNext()){
            purposes[c.getPosition()] =
                    Purpose.builder()
                    .id(c.getLong(1))
                    .authorName(c.isNull(2) ? null : c.getString(2))
                    .authorId(c.isNull(3) ? null : c.getLong(3))
                    .groupName(c.isNull(4) ? null : c.getString(4))
                    .groupId(c.isNull(5) ? null :  c.getLong(5))
                    .name(c.getString(6))
                    .description(c.getString(7))
                    .imageUrl(c.getString(8))
                    .disclosureScope( c.getInt(9))
                    .startAt(DateUtil.parseToDateTime(c.getString(10)))
                    .decimalDay(DateUtil.parseToDate(c.getString(11)))
                    .stat(c.getInt(12))
                    .detailPlanHeaderId(c.getLong(13))
                    .build();
        }
        return purposes.length == 0 ? null : purposes;
    }

    public void updatePurposeDate(long id , Purpose purpose){
        final String sql =
                "update purpose " +
                        "set name = ?, description = ?, image_url = ?, disclosure_scope = ?, " +
                        "start_at = ?, decimal_day = ?, stat = ?, detailPlan_header_id = ? " +
                        "where id = ?";
        db.execSQL(sql,
                new String[]{
                    purpose.getName(), purpose.getDescription(), purpose.getImageUrl(),
                        String.valueOf(purpose.getDisclosureScope()), purpose.getStartAt().toString(), purpose.getDecimalDay().toString(),
                        String.valueOf(purpose.getStat()), String.valueOf(purpose.getDetailPlanHeaderId())
                });
    }

    public void deleteById(long id){
        final String sql =
                "delete from purpose where id = ?";
        db.execSQL(sql, new String[]{String.valueOf(id)});
    }


}
