package com.downfall.caterplanner.detailplanmaker.service;

import com.downfall.caterplanner.detailplanmaker.algorithm.DetailPlanRelationContainer;
import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.downfall.caterplanner.detailplanmaker.algorithm.PlanType;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.text.ParseException;
import java.util.List;

//perform추가는 여기에서
//nodeList는 밖으로 뺀다
public class CaterPlannerDetailPlanMakerService{

    private DetailPlanRelationContainer detailPlanRelationContainer;

    public void create(){
        detailPlanRelationContainer = new DetailPlanRelationContainer();
    }

    public WritableArray entry() {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        return DetailPlans.parseWritableMap(DetailPlans.valueOf(detailPlanRelationContainer.getAllGNodes()));
    }

    public void insertPerform(int goalId, ReadableMap r_perform) throws ParseException {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");

        Perform perform = Perform.valueOf(r_perform);
        perform.setGoalId(goalId);
        Node node = new Node(perform);
        detailPlanRelationContainer.insert(goalId, node, PlanType.P);
    }

    public void insertGoal(int level, ReadableMap r_goal) throws ParseException {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        detailPlanRelationContainer.insert(level, new Node(Goal.valueOf(r_goal)), PlanType.G);
    }

    public void build(ReadableArray r_detailPlans) throws ParseException {
        if(detailPlanRelationContainer != null)
            throw new RuntimeException("The goalRelationTree is already created.");
        detailPlanRelationContainer = DetailPlanRelationContainer.builder().build(DetailPlans.valueOf(r_detailPlans));
    }

    public WritableMap getGoal(int id)  {
        return Goal.parseWritableMap((Goal) detailPlanRelationContainer.select(id, PlanType.G).getData());
    }

    public WritableMap getPerform(int id){
        return Perform.parseWritableMap((Perform) detailPlanRelationContainer.select(id, PlanType.P).getData());
    }

    public void modifyGoal(int id, ReadableMap r_goal) throws ParseException {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Node node = detailPlanRelationContainer.select(id, PlanType.G);
        ((Goal)node.getData()).modify(Goal.valueOf(r_goal));
    }

    public void modifyPerform(int id, ReadableMap r_perform) throws Exception {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Node node = detailPlanRelationContainer.select(id, PlanType.P);
        ((Perform) node.getData()).modify(Perform.valueOf(r_perform));
    }

    public void deleteGoal(int id) {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        detailPlanRelationContainer.delete(id, PlanType.G);
    }

    public void deletePerform(int id){
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        detailPlanRelationContainer.delete(id, PlanType.P);
    }

    public WritableArray goalViewData() {
        if(detailPlanRelationContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");

        Node[] goalList = detailPlanRelationContainer.getAllGNodes();
        WritableArray result = Arguments.createArray();

        for(Node node : goalList){
            WritableMap w_goal = Arguments.createMap();
            Goal goal = (Goal) node.getData();

            w_goal.putInt("id", goal.getId());
            w_goal.putString("color", goal.getColor());
            w_goal.putString("name", goal.getName());
            result.pushMap(w_goal);
        }

        return result;
    }

}
