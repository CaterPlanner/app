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
    private String authorName;
    private Long authorId;
    private String groupName;
    private Long groupId;
    private String name;
    private String description;
    private String imageUrl;
    private int disclosureScope;
    private LocalDateTime startAt;
    private LocalDate decimalDay;
    private State stat; //0 보류중 1 진행중 2 성공 3 실패
    private Long detailPlanHeaderId;
    private DetailPlans detailPlans;


    public boolean isStatizable(){
        return detailPlans != null && detailPlans.isStatizable();
    }

    public int progress() {
        if(detailPlans == null || !detailPlans.isStatizable())
            throw new RuntimeException();
        return detailPlans.progress();
    }

    public int achieve() {
        if(detailPlans == null || !detailPlans.isStatizable())
            throw new RuntimeException();
        return detailPlans.achieve();
    }

    public void statistion(){
        if(detailPlans == null)
            throw new RuntimeException();
        detailPlans.statistics();
    }

    public static Purpose valueOf(ReadableMap data) throws Exception{
        return Purpose.builder()
                .id(data.getInt("id"))
                .authorName(data.hasKey("authorName") ?  data.getString("authorName") : null)
                .authorId(data.hasKey("authorId") ? Long.valueOf(data.getInt("authorId")) : null)
                .groupName(data.hasKey("groupName") ? data.getString("groupName") : null)
                .groupId( data.hasKey("groupId") ? Long.valueOf(data.getInt("groupId")) : null)
                .name(data.getString("name"))
                .description(data.getString("description"))
                .imageUrl(data.getString("imageUrl"))
                .disclosureScope( data.getInt("disclosureScope"))
                .startAt(data.hasKey("startAt") ? DateUtil.parseToDateTime(data.getString("startAt")) : null)
                .decimalDay(data.hasKey("decimalDay") ? DateUtil.parseToDate(data.getString("decimalDay")) : null)
                .stat(State.findByValue(data.getInt("stat")))
                .detailPlanHeaderId(data.hasKey("detailPlanHeaderId") ? (long) data.getInt("detailPlanHeaderId") : null)
                .build();
    }

    public static WritableMap parseWritableMap(Purpose purpose){
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("id", (int)purpose.getId());
        writableMap.putString("authorName", purpose.getName());
        writableMap.putInt("authorId", purpose.getAuthorId().intValue());
        writableMap.putString("groupName", purpose.getGroupName());
        writableMap.putInt("groupId", purpose.getGroupId().intValue());
        writableMap.putString("name", purpose.getName());
        writableMap.putString("description", purpose.getDescription());
        writableMap.putString("imageUrl", purpose.getImageUrl());
        writableMap.putInt("disclosureScope", purpose.getDisclosureScope());
        writableMap.putString("startAt", DateUtil.formatFromDateTime(purpose.getStartAt()));
        writableMap.putString("decimalDay", DateUtil.formatFromDate(purpose.getDecimalDay()));
        writableMap.putInt("stat", purpose.getStat().getValue());
        writableMap.putInt("detailPlanHeaderId", purpose.getDetailPlanHeaderId().intValue());
        return writableMap;
    }

    public int getLeftDay() {
        if(decimalDay == null)
            throw new RuntimeException();
        return new Period(LocalDate.now(), decimalDay, PeriodType.days()).getDays();
    }

}
