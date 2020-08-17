package com.downfall.caterplanner.rest.repository;

import android.content.ContentValues;
import android.database.Cursor;

import com.downfall.caterplanner.rest.model.Purpose;
import com.downfall.caterplanner.rest.db.SQLiteManager;
import com.downfall.caterplanner.rest.model.State;
import com.downfall.caterplanner.util.DateUtil;

import java.text.ParseException;

public class PurposeRepository extends BaseRepository {

    public long insert(Purpose purpose){
        ContentValues contentValues = new ContentValues();
        contentValues.put("id", purpose.getId());
        contentValues.put("name", purpose.getName());
        contentValues.put("description", purpose.getDescription());
        contentValues.put("image_url", purpose.getImageUrl());
        contentValues.put("disclosure_scope",purpose.getDisclosureScope());
        contentValues.put("start_at", purpose.getStartAt().toString());
        contentValues.put("decimal_day", purpose.getDecimalDay().toString());
        contentValues.put("stat", purpose.getStat().getValue());
        return db.insert("purpose", null, contentValues);
    }

    public Purpose selectById(long id) throws ParseException {
        final String sql =
                "select id, name, " +
                        "description, image_url, disclosure_scope, start_at, decimal_day, stat " +
                        "from purpose where id = ?";
        Cursor c = db.rawQuery(sql, new String[]{String.valueOf(id)});
        Purpose purpose = null;
        if(c.moveToFirst()){
            purpose = Purpose.builder()
                    .id(c.getLong(1))
                    .name(c.getString(2))
                    .description(c.getString(3))
                    .imageUrl(c.getString(4))
                    .disclosureScope( c.getInt(5))
                    .startAt(DateUtil.parseToDateTime(c.getString(6)))
                    .decimalDay(DateUtil.parseToDate(c.getString(7)))
                    .stat(State.findByValue(c.getInt(8)))
                    .build();

        }
        return purpose;
    }

    public Purpose[] selectByStatIsActive() throws ParseException {
        final String sql =
                "select id, name, " +
                        "description, image_url, disclosure_scope, start_at, decimal_day, stat " +
                        "from purpose where stat = 1";
        Cursor c = db.rawQuery(sql, null);
        Purpose[] purposes = new Purpose[c.getCount()];
        if(c.moveToNext()){
            purposes[c.getPosition()] =
                    Purpose.builder()
                    .id(c.getLong(1))
                    .name(c.getString(2))
                    .description(c.getString(3))
                    .imageUrl(c.getString(4))
                    .disclosureScope( c.getInt(5))
                    .startAt(DateUtil.parseToDateTime(c.getString(6)))
                    .decimalDay(DateUtil.parseToDate(c.getString(7)))
                    .stat(State.findByValue(c.getInt(8)))
                    .build();
        }
        return purposes.length == 0 ? null : purposes;
    }

    public void updatePurposeDate(long id , Purpose purpose){
        final String sql =
                "update purpose " +
                        "set name = ?, description = ?, image_url = ?, disclosure_scope = ?, " +
                        "start_at = ?, decimal_day = ?, stat = ?" +
                        "where id = ?";
        db.execSQL(sql,
                new String[]{
                    purpose.getName(), purpose.getDescription(), purpose.getImageUrl(),
                        String.valueOf(purpose.getDisclosureScope()), purpose.getStartAt().toString(), purpose.getDecimalDay().toString(),
                        String.valueOf(purpose.getStat().getValue())
                });
    }

    public void updateStatById(long id, State stat){
        final String sql =
                "update purpose " +
                        "set stat = ? " +
                        "where id = ?";
        db.execSQL(sql,
                new String[]{
                        String.valueOf(id),
                        String.valueOf(stat.getValue())
                });
    }

    public void deleteById(long id){
        final String sql =
                "delete from purpose where id = ?";
        db.execSQL(sql, new String[]{String.valueOf(id)});
    }



}
