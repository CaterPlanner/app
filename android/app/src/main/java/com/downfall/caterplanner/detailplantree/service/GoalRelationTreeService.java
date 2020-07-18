package com.downfall.caterplanner.detailplantree.service;

import com.downfall.caterplanner.common.Goal;
import com.downfall.caterplanner.detailplantree.algorithm.GoalRelationTree;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.algorithm.NodeList;
import com.downfall.caterplanner.detailplantree.manufacture.BaseScheduleMaker;
import com.downfall.caterplanner.detailplantree.manufacture.EntryDataMaker;
import com.downfall.caterplanner.detailplantree.manufacture.GoalScheduleMaker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class GoalRelationTreeService implements CaterPlannerDetailPlanTreeService {

    private GoalRelationTree tree;
    private NodeList nodeList;

    private BaseScheduleMaker scheduleMaker;

    public GoalRelationTreeService() {
        this.scheduleMaker = new GoalScheduleMaker();
    }

    @Override
    public void create(){
        nodeList = new NodeList();
        tree = new GoalRelationTree(nodeList);
    }

    @Override
    public WritableMap get(int key) throws Exception {
        return Goal.parseWritableMap(tree.select(key).getData());
    }

    @Override
    public WritableArray entry() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return new EntryDataMaker().make(tree.getNodes());
    }

    @Override
    public void insert(int parentKey, ReadableMap data) throws Exception {
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.insert(parentKey, new Node(Goal.valueOf(data)));
    }

    @Override
    public void build(ReadableArray param) throws Exception{
        if(tree != null)
            throw new Exception("The tree is already created.");
        Goal[] list = new Goal[param.size()];
        for(int i = 0; i < param.size(); i++){
            list[i] = Goal.valueOf(param.getMap(i));
        }
        tree = new GoalRelationTree(nodeList, list);
    }

    @Override
    public void delete(int key) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.delete(key);
    }

    @Override
    public WritableArray schedules() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return scheduleMaker.make(tree.getRoot());
    }

    @Override
    public void successor(int previousKey, ReadableMap data) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.successor(previousKey, new Node(Goal.valueOf(data)));
    }

    @Override
    public void modify(int key, ReadableMap param) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node node = tree.select(key);
        node.getData().modify(Goal.valueOf(param));
    }

}
