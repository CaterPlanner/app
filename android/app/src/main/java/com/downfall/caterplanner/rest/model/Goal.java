package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.Type;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Getter
@Setter
public class Goal extends StatisticsModel implements RelationTreeEntity{

    private Long headerId;
    private Integer id;
    private Integer level;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String color;
    private int stat;  //0 : 진행중, 1 : 성공 , 2: 실패 , 3: 루트

    @Getter
    @Setter(AccessLevel.NONE)
    private List<Perform> performs;


    public Goal(long headerId, int id, int level, String name, LocalDate startDate, LocalDate endDate, String color, int stat) {
        this.headerId = headerId;
        this.id = id;
        this.level = level;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.color = color;
        this.stat = stat;

        this.performs = new ArrayList<>();
    }


    public void setPerforms(List<Perform> performs) {
        setPerforms(performs, true);
    }

    public void setPerforms(List<Perform> performs, boolean statistion) {
        this.performs = performs;
        if(statistion)
            statistion();
    }

    public boolean isClear(){
        return this.stat > 0;
    }

    @Override
    public void statistion() {
        if(this.performs == null)
            throw new RuntimeException();

        for (Perform p : performs) {
            if(!p.isStatizable())
                p.statistion();

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

    public static Goal valueOf(ReadableMap data) throws ParseException {

        return Goal.builder()
                .id(data.getInt("id"))
                .headerId((long) data.getInt("headerId"))
                .level(data.getInt("level"))
                .name(data.getString("name"))
                .startDate(DateUtil.parseToDate(data.getString("startDate")))
                .endDate(DateUtil.parseToDate(data.getString("endDate")))
                .color(data.getString("color"))
                .stat(data.getInt("stat"))
                .build();
    }

    public static WritableMap parseWritableMap(Goal goal){

        WritableMap goalMap = Arguments.createMap();
        goalMap.putInt("id", goal.getId());
        goalMap.putInt("headerId", goal.getHeaderId().intValue());
        goalMap.putInt("level", goal.getConstructorKey());
        goalMap.putString("name", goal.getName());
        goalMap.putString("startDate", DateUtil.formatFromDate(goal.getStartDate()));
        goalMap.putString("endDate", DateUtil.formatFromDate(goal.getEndDate()));
        goalMap.putInt("hopeAchievement", goal.getHopeAchievement());
        goalMap.putString("color", goal.getColor());
        goalMap.putInt("stat", goal.getStat());
        return goalMap;
    }

    public void modify(Goal copy) {
        this.name = copy.getName();
        this.startDate = copy.getStartDate();
        this.endDate = copy.getEndDate();
        this.color = copy.getColor();
        this.stat = copy.getStat();
    }

    @Override
    public int getKey() {
        return id;
    }

    @Override
    public void setKey(int key) {
        this.id = key;
    }

    @Override
    public int getConstructorKey() {
        return this.level;
    }

    @Override
    public void setConstructorKey(int key) {
        this.level = key;
    }

    @Override
    public Type getType() {
        return Type.G;
    }



}
