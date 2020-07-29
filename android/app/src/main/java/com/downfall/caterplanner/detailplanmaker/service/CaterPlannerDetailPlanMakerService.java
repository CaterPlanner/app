package com.downfall.caterplanner.detailplanmaker.service;

import com.downfall.caterplanner.detailplanmaker.util.Pair;
import com.downfall.caterplanner.detailplanmaker.algorithm.RelationTree;
import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.service.DetailPlanService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Stack;

//perform추가는 여기에서
//nodeList는 밖으로 뺀다
public class CaterPlannerDetailPlanMakerService{

    private RelationTree goalRelationTree;

    public void create(){
        goalRelationTree = new RelationTree();
    }

    public WritableMap getGoal(int key)  {
        return Goal.parseWritableMap((Goal) goalRelationTree.select(key).getData());
    }

    @Deprecated
    public WritableArray entry() {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        return DetailPlans.parseWritableMap(DetailPlans.valueOf(goalRelationTree.getUseNodes()));
    }

    /**
     *
     * 확정된 데이터가 아니므로 간이적으로 Goal 과 Perform 을 연결
     *
     * @param goalId
     * @param r_perform
     * @throws ParseException
     */
    public void insert(int goalId, ReadableMap r_perform) throws ParseException {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Perform perform = Perform.valueOf(r_perform);
        goalRelationTree.select(goalId).addChild(new Node(perform));
    }
    
    public void build(ReadableArray r_detailPlans) throws ParseException {
        if(goalRelationTree != null)
            throw new RuntimeException("The goalRelationTree is already created.");
        goalRelationTree = RelationTree.builder().build(DetailPlans.valueOf(r_detailPlans));
    }


    public void deleteGoal(int goalId) {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalRelationTree.delete(goalId);
    }

    public void deletePerform(int goalId, int performId){
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalRelationTree.select(goalId).removeChilde(performId);
    }


    public void successor(int goalId, ReadableMap r_goal) throws ParseException {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        goalRelationTree.successor(goalId, new Node(Goal.valueOf(r_goal)));
    }


    public void modifyGoal(int goalId, ReadableMap r_goal) throws ParseException {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Node node = goalRelationTree.select(goalId);
        ((Goal)node.getData()).modify(Goal.valueOf(r_goal));
    }

    public void modifyPerform(int goalId, int performId, ReadableMap r_perform) throws Exception {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");
        Node node = goalRelationTree.select(goalId);
        ((Goal)node.getData()).getPerforms().get(performId).modify(Perform.valueOf(r_perform));
    }

    public WritableMap mapGoalBottomViewData() {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");

        Node root = goalRelationTree.getRoot();

        WritableMap result = Arguments.createMap();
        List<Pair<Integer, Integer>> keyIndexList = new ArrayList<>();

        Stack<Node> stack = new Stack<>();

        WritableArray brotherGroups = Arguments.createArray();

        int currentIndex = 0;
        stack.push(root);

        while(!stack.isEmpty()){
            Node element = stack.pop();

            WritableArray brotherGroup = Arguments.createArray();

            for(Node successor : element.getSuccessors()){
                WritableMap brother = Arguments.createMap();

                brother.putInt("id", successor.getKey());
                if(successor.getSuccessors().length != 0){
                    brother.putInt("successorHead", successor.getSuccessors()[0].getKey());
                }

                keyIndexList.add(new Pair<>(successor.getKey(), currentIndex));
                brotherGroup.pushMap(brother);
                stack.push(successor);
            }

            if(brotherGroup.size() != 0) {
                brotherGroups.pushArray(brotherGroup);
                currentIndex++;
            }
        }

        result.putArray("brotherGroups", brotherGroups);

        WritableMap pathMap = Arguments.createMap();

        for(Pair<Integer, Integer> pair : keyIndexList){
            pathMap.putInt(String.valueOf(pair.getKey()), pair.getValue());
        }

        result.putMap("path", pathMap);

        return result;
    }

    public WritableMap mapGoalTopViewData() {
        if(goalRelationTree == null)
            throw new RuntimeException("Please create a goalRelationTree first.");

        Node root = goalRelationTree.getRoot();

        class Space {
            int key;
            int pos;

            public Space(int key, int pos) {
                this.key = key;
                this.pos = pos;
            }

        }

        class FloorLevel {
            int currentPos;
            List<Space> elements;

            public FloorLevel() {
                this.currentPos = 0; //항상 다음에 추가될 층(위치)를 가지고 있음
                this.elements = new ArrayList<>();
            }
        } //단계에 따른 정보를 갖고 있음


        List<FloorLevel> floorLevelList = new ArrayList<>();
        Stack<Node> stack = new Stack<>();

        HashMap<Integer, Space> spaceHashMap = new HashMap<>();


        stack.push(root);

        int previousFloorArrayIndex = 0;

        while(!stack.isEmpty()){
            Node element = stack.pop();
            FloorLevel floorLevel;

            if(element.getConstructor().getSuccessors()[0] == element){
                floorLevel = floorLevelList.get(previousFloorArrayIndex);
            }else{
                floorLevel = new FloorLevel(); //currentpos를 부모로부터 이어받아야함
                floorLevelList.add(floorLevel);
                previousFloorArrayIndex = floorLevelList.size() - 1;
            }

            Space space = new Space(element.getKey(), element.getConstructor().getKey() == 0 ? 0 : spaceHashMap.get(element.getConstructor().getKey()).pos + 1);
            floorLevel.elements.add(space);
            spaceHashMap.put(element.getKey(), space);


            Node[] successors = element.getSuccessors();

            for(int i = successors.length - 1;  i >= 0; i--){
                stack.push(successors[i]);
            }

        }


        WritableMap result = Arguments.createMap();
        int maxPos = 0;

        WritableArray floorArray = Arguments.createArray();

        for(FloorLevel level : floorLevelList){
            //max 그헹힘
            WritableMap levelMap = Arguments.createMap();
            WritableArray elementArray = Arguments.createArray();

            maxPos = Math.max(maxPos, level.elements.size());

            for(Space space : level.elements){
                WritableMap spaceMap = Arguments.createMap();
                spaceMap.putInt("id", space.key);
                spaceMap.putInt("pos", space.pos);
                elementArray.pushMap(spaceMap);
            }
            levelMap.putArray("elements", elementArray);
            floorArray.pushMap(levelMap);
        }

        result.putArray("floorArray", floorArray);
        result.putInt("maxPos", maxPos - 1);

        return result;
    }

}
