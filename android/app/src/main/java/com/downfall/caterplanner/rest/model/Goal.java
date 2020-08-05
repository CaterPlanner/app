package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.PlanType;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;

import java.text.ParseException;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@AllArgsConstructor
public class Goal extends StatisticsModel implements RelationTreeEntity{

    private Long headerId;
    private int id;
    private Integer previousGoalId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String color;
    private State stat;  //0 : 진행중, 1 : 대기중 , 2: 성공 , 3: 실패

    private List<Perform> performs;


    @Override
    public int getMaxTime() {
        int maxTime = 0;
        for(Perform p : performs){
            maxTime += p.getMaxTime();
        }
        return maxTime;
    }

    @Override
    public int getCurrentPerfectTime() {
        int currentPerfectTime = 0;
        for(Perform p : performs){
            currentPerfectTime += p.getCurrentPerfectTime();
        }
        return currentPerfectTime;
    }

    @Override
    public int getCurrentBriefingCount() {
        if(achieve() == 100)
            return getMaxTime();

        int currentBriefingCount = 0;
        for(Perform p : performs){
            currentBriefingCount += p.getCurrentBriefingCount();
        }

        return currentBriefingCount;
    }

    @Override
    public int achieve() {
        return stat == State.SUCCESS ? 100 : super.achieve();
    }


    public static Goal valueOf(ReadableMap data) throws ParseException {

        return Goal.builder()
                .id(data.getInt("id"))
                .headerId((long) data.getInt("headerId"))
                .previousGoalId(data.getInt("previousGoalId"))
                .name(data.getString("name"))
                .startDate(DateUtil.parseToDate(data.getString("startDate")))
                .endDate(DateUtil.parseToDate(data.getString("endDate")))
                .color(data.getString("color"))
                .stat(State.findByValue(data.getInt("stat")))
                .build();
    }

    public static WritableMap parseWritableMap(Goal goal){

        WritableMap goalMap = Arguments.createMap();
        goalMap.putInt("id", goal.getId());
        goalMap.putInt("headerId", goal.getHeaderId().intValue());
        goalMap.putInt("previousGoalId", goal.getPreviousGoalId());
        goalMap.putString("name", goal.getName());
        goalMap.putString("startDate", DateUtil.formatFromDate(goal.getStartDate()));
        goalMap.putString("endDate", DateUtil.formatFromDate(goal.getEndDate()));
        goalMap.putString("color", goal.getColor());
        goalMap.putInt("stat", goal.getStat().getValue());
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
    public PlanType getType() {
        return PlanType.G;
    }

    @Override
    public void setConstructorKey(int constructorKey) {
        this.previousGoalId = constructorKey;
    }


}
