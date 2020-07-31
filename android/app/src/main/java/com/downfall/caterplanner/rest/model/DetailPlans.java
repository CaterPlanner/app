package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class DetailPlans extends StatisticsModel{

    private List<Goal> entryData;

    private DetailPlans(List<Goal> entryData, boolean isStatizable){
        this.entryData = entryData;
        this.isStatizable = isStatizable;

        if(isStatizable)
            statistion();
    }

    public static DetailPlans valueOf(Node[] nodes){
        List<Goal> entryData = new ArrayList<>();
        for(Node node : nodes){
            Goal goal = (Goal) node.getData();
            List<Perform> performs = new ArrayList<>();

            Node[] children = node.getChildren();

            for(Node childNode : children){
                performs.add((Perform) childNode.getData());
            }
            entryData.add(goal);
        }
        return new DetailPlans(entryData, false);
    }

    public static DetailPlans valueOf(ReadableArray r_detailPlans) throws ParseException {
        List<Goal> goals = new ArrayList<>();
        for(int i = 0; i < r_detailPlans.size(); i++){
            ReadableMap r_goal = r_detailPlans.getMap(i);
            goals.add(Goal.valueOf(r_goal));
            ReadableArray r_performs = r_goal.getArray("performs");

            List<Perform> performs = new ArrayList<>();
            for(int j = 0; j < r_performs.size(); j++){
                performs.add(Perform.valueOf(r_performs.getMap(i)));
            }
            goals.get(i).setPerforms(performs, false);
        }
        return new DetailPlans(goals, false);
    }

    public static DetailPlans valueOf(List<Goal> goals, List<Perform> performs, List<Briefing> briefings){

        for(Perform perform : performs){
            Goal goal = goals.get(perform.getGoalId() - 1);
            goal.getPerforms().add(perform);
            perform.setDate(goal.getStartDate(), goal.getEndDate());
        }

        if(briefings != null) {

            for (Briefing briefing : briefings) {
                Perform perform = goals.get(briefing.getGoalKey() - 1).getPerforms().get(briefing.getPerformId());
                perform.getBriefings().add(briefing);
            }

            for(Goal goal : goals){
                goal.statistion();
            }

            return new DetailPlans(goals, true);
        }else{
            return new DetailPlans(goals, false);
        }
    }

    public static DetailPlans valueOf(List<Goal> goals, List<Perform> performs){
        return valueOf(goals, performs, null);
    }

    public static void quest(ReadableArray r_detailPlans, TouchGoal touchGoal) throws ParseException {
        for(int i = 0; i < r_detailPlans.size(); i++){
            ReadableMap r_goal = r_detailPlans.getMap(i);
            Goal goal = Goal.valueOf(r_goal);
            touchGoal.method(goal, r_goal.getArray("performs"));
        }
    }

    public static WritableArray parseWritableMap(DetailPlans detailPlans){
        List<Goal> entryData = detailPlans.getEntryData();
        WritableArray r_detailPlans = Arguments.createArray();

        for(Goal goal : entryData){
            WritableMap r_goal = Goal.parseWritableMap(goal);
            WritableArray r_performs = Arguments.createArray();
            for(Perform perform : goal.getPerforms()){
                r_performs.pushMap(Perform.parseWritableMap(perform));
            }
            r_goal.putArray("performs", r_performs);
            r_detailPlans.pushMap(r_goal);
        }

        return r_detailPlans;
    }


    @Override
    public void statistion() {

        for(Goal goal : entryData){
            if(!goal.isStatizable)
                throw new RuntimeException();

            if(!goal.isStatizable())
                goal.statistion();

            this.currentPerfectTime += goal.getCurrentPerfectTime();
            this.currentBriefingCount += goal.getCurrentBriefingCount();
            this.maxTime += goal.getMaxTime();
        }

        this.isStatizable = true;
    }

    @FunctionalInterface
    public interface TouchGoal{
        void method(Goal goal, ReadableArray r_performs) throws ParseException;
    }
}
