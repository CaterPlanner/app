package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.Type;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class Goal extends StatisticsDetailPlan{

    private long purposeId;
    private int key;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private int hopeAchievement;
    private String color;
    private int stat;

    @Getter
    private List<Perform> performs;


    public Goal(long purposeId, int key, String name, LocalDate startDate, LocalDate endDate, int hopeAchievement, String color, int stat) {
        this.purposeId = purposeId;
        this.key = key;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hopeAchievement = hopeAchievement;
        this.color = color;
        this.stat = stat;
    }


    public void setPerforms(List<Perform> performs) {
        this.performs = performs;
        statistion();
    }

    @Override
    public void statistion() {
        if(this.performs == null)
            throw new RuntimeException();

        for (Perform p : performs) {
            this.maxTime += p.getMaxTime();
            this.currentPerfectTime += p.getCurrentPerfectTime();
            this.currentBriefingCount += p.getCurrentBriefingCount();
        }

        isStatizable = true;
    }

    @Override
    public int achieve() {
        int value = super.achieve();
        return value >= this.getHopeAchievement() ? 100 : value;
    }

    @Override
    public int getCurrentBriefingCount() {
        return achieve() == 100 ? super.getMaxTime() :  super.getCurrentBriefingCount();
    }

    public static Goal valueOf(ReadableMap data) throws Exception{

        return Goal.builder()
                .key(data.getInt("key"))
                .purposeId((long) data.getInt("purposeId"))
                .name(data.getString("name"))
                .startDate(DateUtil.parseToDate(data.getString("startDate")))
                .endDate(DateUtil.parseToDate(data.getString("endDate")))
                .hopeAchievement(data.hasKey("hopeAchievement") ? data.getInt("hopeAchievement") : null)
                .color(data.getString("color"))
                .stat(data.getInt("stat"))
                .build();
    }

    public static WritableMap parseWritableMap(Goal goal) throws Exception{

        WritableMap goalMap = Arguments.createMap();
        goalMap.putInt("key", goal.getKey());
        goalMap.putInt("purposeId", (int) goal.getPurposeId());
        goalMap.putString("name", goal.getName());
        goalMap.putString("startDate", DateUtil.formatFromDate(goal.getStartDate()));
        goalMap.putString("endDate", DateUtil.formatFromDate(goal.getEndDate()));
        goalMap.putInt("hopeAchievement", goal.getHopeAchievement());
        goalMap.putString("color", goal.getColor());
        goalMap.putInt("stat", goal.getStat());
        return goalMap;
    }
}
