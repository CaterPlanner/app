package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.Period;
import org.joda.time.PeriodType;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class Purpose{

    private long id;
    private String name;
    private String description;
    private String imageUrl;
    private int disclosureScope;
    private LocalDateTime startAt;
    private LocalDate decimalDay;
    private State stat; //0 보류중 1 진행중 2 성공 3 실패

    private DetailPlans detailPlans;


    public int progress() {
        return detailPlans.progress();
    }

    public int achieve() {
        return detailPlans.achieve();
    }

    public static Purpose valueOf(ReadableMap data) throws Exception{
        return Purpose.builder()
                .id(data.getInt("id"))
                .name(data.getString("name"))
                .description(data.getString("description"))
                .imageUrl(data.getString("imageUrl"))
                .disclosureScope( data.getInt("disclosureScope"))
                .startAt(data.hasKey("startAt") ? DateUtil.parseToDateTime(data.getString("startAt")) : null)
                .decimalDay(data.hasKey("decimalDay") ? DateUtil.parseToDate(data.getString("decimalDay")) : null)
                .stat(State.findByValue(data.getInt("stat")))
                .build();
    }

    public static WritableMap parseWritableMap(Purpose purpose){
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("id", (int)purpose.getId());
        writableMap.putString("authorName", purpose.getName());
        writableMap.putString("name", purpose.getName());
        writableMap.putString("description", purpose.getDescription());
        writableMap.putString("imageUrl", purpose.getImageUrl());
        writableMap.putInt("disclosureScope", purpose.getDisclosureScope());
        writableMap.putString("startAt", DateUtil.formatFromDateTime(purpose.getStartAt()));
        writableMap.putString("decimalDay", DateUtil.formatFromDate(purpose.getDecimalDay()));
        writableMap.putInt("stat", purpose.getStat().getValue());
        return writableMap;
    }

    public int getLeftDay() {
        if(decimalDay == null)
            throw new RuntimeException();
        return new Period(LocalDate.now(), decimalDay, PeriodType.days()).getDays();
    }

}
