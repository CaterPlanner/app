package com.downfall.caterplanner.detailplanmaker.service;

import com.downfall.caterplanner.detailplanmaker.algorithm.IndexList;
import com.downfall.caterplanner.detailplanmaker.algorithm.PlanType;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.Period;
import org.joda.time.PeriodType;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;


public class CaterPlannerDetailPlanMakerService{

    private IndexList<Goal> goalList;
    private IndexList<Perform> performList;
    private boolean isCreated;

    public void create(){
        goalList = new IndexList<>();
        performList = new IndexList<>();
        isCreated = true;
    }

    public WritableArray entry() {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        return DetailPlans.parseWritableMap(DetailPlans.valueOf(goalList.getAll(), performList.getAll()));
    }

    public void insertPerform(int goalId, ReadableMap r_perform) throws ParseException {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");

        Perform perform = Perform.valueOf(r_perform);
        perform.setGoalId(goalId);
        Goal goal = goalList.get(goalId);
        goal.getPerforms().add(perform);
    }

    public void insertGoal(ReadableMap r_goal) throws ParseException {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalList.add(Goal.valueOf(r_goal));
    }

    public void build(ReadableArray r_detailPlans) throws ParseException {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");

        DetailPlans detailPlans = DetailPlans.valueOf(r_detailPlans);
        this.goalList = new IndexList<>(detailPlans.getEntryData());
        this.performList = new IndexList<>(detailPlans.getPerformList());
    }

    public WritableMap getGoal(int id)  {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        return Goal.parseWritableMap(goalList.get(id));
    }

    public WritableMap getPerform(int id){
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        return Perform.parseWritableMap(performList.get(id));
    }

    public void modifyGoal(int id, ReadableMap r_goal) throws ParseException {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Goal goal = goalList.get(id);
        goal.modify(Goal.valueOf(r_goal));
    }

    public void modifyPerform(int id, ReadableMap r_perform) throws Exception {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Perform perform = performList.get(id);
        perform.modify(Perform.valueOf(r_perform));
    }

    public void deleteGoal(int id) {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalList.remove(id);
    }

    public void deletePerform(int id){
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");
        performList.remove(id);
    }

    //leftMarginRatio, iconWidthRatio
    public WritableArray goalGraphData(String s_purposeStartDay, String s_purposeEndDay) throws ParseException {
        if(!isCreated)
            throw new RuntimeException("Please create a goalRelationTree first.");

        LocalDate purposeStartDay = DateUtil.parseToDate(s_purposeStartDay);
        LocalDate purposeEndDay = DateUtil.parseToDate(s_purposeEndDay);

        int entryDiff = new Period(purposeStartDay, purposeEndDay, PeriodType.days()).getDays();

        List<Goal> goals = goalList.getAll();
        WritableArray result = Arguments.createArray();

        for(Goal goal : goals){
            WritableMap w_goal = Arguments.createMap();

            double leftMarginRatio = Math.round(((double) (new Period(purposeStartDay, goal.getEndDate(), PeriodType.days()).getDays()) / entryDiff) * 1000) / 1000.0;
            double iconWidthRation = Math.round(((double) (new Period(goal.getStartDate(), goal.getEndDate(), PeriodType.days()).getDays()) / entryDiff) * 1000) / 1000.0;

            w_goal.putInt("id", goal.getId());
            w_goal.putString("color", goal.getColor());
            w_goal.putDouble("leftMarginRatio" , leftMarginRatio );
            w_goal.putDouble("iconWidthRatio", iconWidthRation);

            result.pushMap(w_goal);
        }

        return result;
    }

}
