package com.downfall.caterplanner.rest.repository;

import android.content.ContentValues;
import android.database.Cursor;

import com.downfall.caterplanner.common.model.Purpose;
import com.downfall.caterplanner.rest.db.SQLiteHelper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
        contentValues.put("detailPlan_header_id", purpose.getDetailPlanHeaderId());
        return db.insert("purpose", null, contentValues);
    }

    public Purpose selectById(long id) {
        final String sql =
                "select id , author_name, author_id, group_name, group_id, name, " +
                        "description, image_url, disclosure_scope, decimal_day, detailPlan_header_id " +
                        "from purpose where id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(id)});
        Purpose purpose = null;
        if(c.moveToFirst()){
            purpose = new Purpose(
                    c.getLong(1),
                    c.isNull(2) ? null : c.getString(2),
                    c.isNull(3) ? null : c.getLong(3),
                    c.isNull(4) ? null : c.getString(4),
                    c.isNull(5) ? null :  c.getLong(5),
                    c.getString(6),
                    c.getString(7),
                    c.getString(8),
                    c.getInt(9),
                    LocalDate.parse(c.getString(10), DateTimeFormatter.ISO_DATE),
                    LocalDate.parse(c.getString(11), DateTimeFormatter.ISO_DATE),
                    c.isNull(12) ? null : c.getLong(12)
            );
        }
        return purpose;
    }

    public Purpose[] selectByStatIsActive() {
        final String sql =
                "select id , author_name, author_id, group_name, group_id, name, " +
                        "description, image_url, disclosure_scope, decimal_day, detailPlan_header_id " +
                        "from purpose where stat = 0";
        Cursor c = db.rawQuery(sql, null);
        Purpose[] purposes = new Purpose[c.getCount()];
        if(c.moveToNext()){
            purposes[c.getPosition()] = new Purpose(
                    c.getLong(1),
                    c.isNull(2) ? null : c.getString(2),
                    c.isNull(3) ? null : c.getLong(3),
                    c.isNull(4) ? null : c.getString(4),
                    c.isNull(5) ? null :  c.getLong(5),
                    c.getString(6),
                    c.getString(7),
                    c.getString(8),
                    c.getInt(9),
                    LocalDate.parse(c.getString(10), DateTimeFormatter.ISO_DATE),
                    LocalDate.parse(c.getString(11), DateTimeFormatter.ISO_DATE),
                    c.isNull(12) ? null : c.getLong(12)
            );
        }
        return purposes.length == 0 ? null : purposes;
    }

    public void updatePurposeDate(long id , Purpose purpose){
        final String sql =
                "update purpose " +
                        "set name = ?, description = ?, image_url = ?, disclosure_scope = ?, " +
                        "start_at = ?, decimal_day = ?, detailplan_header_id = ? " +
                        "where id = ?";
        db.execSQL(sql,
                new String[]{
                    purpose.getName(), purpose.getDescription(), purpose.getImageUrl(),
                        String.valueOf(purpose.getDisclosureScope()), purpose.getStartAt().toString(), purpose.getDecimalDay().toString(), String.valueOf(purpose.getDetailPlanHeaderId())
                });
    }

    public void deleteById(long id){
        final String sql =
                "delete from purpose where id = ?";
        db.execSQL(sql, new String[]{String.valueOf(id)});
    }


}
