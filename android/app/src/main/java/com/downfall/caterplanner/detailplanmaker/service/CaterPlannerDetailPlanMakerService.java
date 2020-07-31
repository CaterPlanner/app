package com.downfall.caterplanner.detailplanmaker.service;

import com.downfall.caterplanner.detailplanmaker.algorithm.Level;
import com.downfall.caterplanner.detailplanmaker.algorithm.LevelContainer;
import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
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

    private LevelContainer goalLevelContainer;

    public void create(){
        goalLevelContainer = new LevelContainer();
    }

    public WritableArray entry() {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        return DetailPlans.parseWritableMap(DetailPlans.valueOf(goalLevelContainer.getAllNodes()));
    }

    public void insertPerform(int goalId, ReadableMap r_perform) throws ParseException {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Perform perform = Perform.valueOf(r_perform);
        goalLevelContainer.select(goalId).addChild(new Node(perform));
    }

    public void insertGoal(int level, ReadableMap r_goal) throws ParseException {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalLevelContainer.insert(level, new Node(Goal.valueOf(r_goal)));
    }

    public void build(ReadableArray r_detailPlans) throws ParseException {
        if(goalLevelContainer != null)
            throw new RuntimeException("The goalRelationTree is already created.");
        goalLevelContainer = LevelContainer.builder().build(DetailPlans.valueOf(r_detailPlans));
    }

    public WritableMap getGoal(int key)  {
        return Goal.parseWritableMap((Goal) goalLevelContainer.select(key).getData());
    }

    public WritableMap getPerform(int goalId, int performId){
        return Perform.parseWritableMap((Perform) goalLevelContainer.select(goalId).getChildren().get(performId).getData());
    }

    public void modifyGoal(int goalId, ReadableMap r_goal) throws ParseException {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Node node = goalLevelContainer.select(goalId);
        ((Goal)node.getData()).modify(Goal.valueOf(r_goal));
    }

    public void modifyPerform(int goalId, int performId, ReadableMap r_perform) throws Exception {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Node node = goalLevelContainer.select(goalId);
        ((Goal)node.getData()).getPerforms().get(performId).modify(Perform.valueOf(r_perform));
    }

    public void deleteGoal(int goalId) {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalLevelContainer.delete(goalId);
    }

    public void deletePerform(int goalId, int performId){
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalLevelContainer.select(goalId).removeChilde(performId);
    }

    public WritableArray goalViewData() {
        if(goalLevelContainer == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Level[] levelList = goalLevelContainer.getAllLevel();
        WritableArray result = Arguments.createArray();

        for(Level level : levelList){
            WritableMap w_level = Arguments.createMap();
            w_level.putInt("level", level.getLevel());

            WritableArray w_elements = Arguments.createArray();
            List<Node> nodeList = level.getNodeList();

            for(Node node : nodeList){
                WritableMap w_element = Arguments.createMap();
                Goal goal = (Goal) node.getData();

                w_element.putInt("id", goal.getId());
                w_element.putString("color", goal.getColor());
                w_element.putString("name", goal.getName());
                w_elements.pushMap(w_element);
            }

            w_level.putArray("elements", w_elements);
            result.pushMap(w_level);
        }

        return result;
    }

}
