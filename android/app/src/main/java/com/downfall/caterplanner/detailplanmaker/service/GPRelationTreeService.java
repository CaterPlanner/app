package com.downfall.caterplanner.detailplanmaker.service;

import com.downfall.caterplanner.detailplanmaker.util.Pair;
import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.detailplanmaker.algorithm.GPRelationTree;
import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Stack;

//perform추가는 여기에서
//nodeList는 밖으로 뺀다
public class GPRelationTreeService implements CaterPlannerDetailPlanTreeService {

    private GPRelationTree tree;

    @Override
    public void create(){
        tree = new GPRelationTree();
    }

    @Override
    public WritableMap get(int key) throws Exception {
        return DetailPlan.parseWritableMap(tree.select(key).getData());
    }

    @Override
    public WritableArray entry() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");

        Node[] nodes = tree.getUseNodes();
        WritableArray result = Arguments.createArray();
        for(Node node : nodes) {
            result.pushMap(DetailPlan.parseWritableMap(node.getData()));
        }

        return result;
    }

    @Override
    public void insert(int parentKey, ReadableMap data) throws Exception {
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.insert(parentKey, new Node(DetailPlan.valueOf(data)));
    }

    @Override
    public void build(ReadableArray param) throws Exception{
        if(tree != null)
            throw new Exception("The tree is already created.");
        DetailPlan[] list = new DetailPlan[param.size()];
        for(int i = 0; i < param.size(); i++){
            list[i] = DetailPlan.valueOf(param.getMap(i));
        }
        tree = new GPRelationTree(list);
    }

    @Override
    public void delete(int key) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.delete(key);
    }

    @Override
    public void successor(int previousKey, ReadableMap data) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.successor(previousKey, new Node(DetailPlan.valueOf(data)));
    }

    @Override
    public void modify(int key, ReadableMap param) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node node = tree.select(key);
        node.getData().modify(DetailPlan.valueOf(param));
    }

    public WritableMap mapGoalBottomViewData() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");

        Node root = tree.getRoot();

        WritableMap result = Arguments.createMap();
        List<Pair<Integer, Integer>> keyIndexList = new ArrayList<>();

        Stack<Node> stack = new Stack<>();

        WritableArray brotherGroups = Arguments.createArray();

        int currentIndex = 0;

        WritableArray firstbrotherGroup = Arguments.createArray();

        for(Node child : root.getChildren()) {
            WritableMap brother = Arguments.createMap();

            brother.putInt("key", child.getKey());

            if(child.getSuccessors().length != 0){
                brother.putInt("successorHead", child.getSuccessors()[0].getKey());
            }

            keyIndexList.add(new Pair<>(child.getKey(), currentIndex));
            firstbrotherGroup.pushMap(brother);

            stack.push(child);
        }

        brotherGroups.pushArray(firstbrotherGroup);

        currentIndex++;

        while(!stack.isEmpty()){
            Node element = stack.pop();

            WritableArray brotherGroup = Arguments.createArray();

            for(Node successor : element.getSuccessors()){
                WritableMap brother = Arguments.createMap();

                brother.putInt("key", successor.getKey());
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

    public WritableMap mapGoalTopViewData() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");

        Node root = tree.getRoot();

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

        Node[] firstChildren = root.getChildren(); //root

        for(int i = firstChildren.length - 1;  i >= 0; i--){
            stack.push(firstChildren[i]);
        }
        //후에는 next로만 할 것이기 때문에 미리 root의 자식들을 init

        int previousFloorArrayIndex = 0;

        while(!stack.isEmpty()){
            Node element = stack.pop();
            FloorLevel floorLevel;

            if(element.getConstructor().getChildren()[0] == element){
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
                spaceMap.putInt("key", space.key);
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
