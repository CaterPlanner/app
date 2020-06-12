package com.downfall.caterplanner.detailplantree.service;


import com.downfall.caterplanner.detailplantree.algorithm.MPOrderRelationTree;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.dto.PlanData;
import com.downfall.caterplanner.detailplantree.processor.ScheduleMaker;
import com.downfall.caterplanner.detailplantree.processor.ViewDataMaker;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;


public class MPOrderRelationTreeService {

    private MPOrderRelationTree tree;

    public void create(){
        tree = new MPOrderRelationTree();
    }

    public void insert(String parentKey, ReadableMap data, Callback success) throws Exception {
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node result = tree.insert(parentKey, new Node(readableToPlanData(data)));
        success.invoke(result.getKey());
    }

    public WritableArray findChildren(String parentKey) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node parent = tree.select(parentKey);
        if(parent == null)
            throw new Exception("Node does not exist.");
        return new ViewDataMaker().make(parent);
    }

    public void build(ReadableArray param) throws Exception{
        if(tree != null)
            throw new Exception("The tree is already created.");
        PlanData[] list = new PlanData[param.size()];
        for(int i = 0; i < param.size(); i++){
            list[i] = readableToPlanData(param.getMap(i));
        }
        tree = new MPOrderRelationTree(list);
    }

    public void delete(String key) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.delete(key);
    }

    public WritableArray schedules(Callback promise) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return new ScheduleMaker().make(tree.getRoot());
    }

    public void next(String previousKey, ReadableMap data, Callback success) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node result = tree.next(previousKey, new Node(readableToPlanData(data)));
        success.invoke(result.getKey());
    }

    private PlanData readableToPlanData(ReadableMap data){
        return new PlanData(data.getString("key"),  data.getString("type"), data.getBoolean("isClear"));
    }

    public void pass(String key) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node node = tree.select(key);
        node.getData().setEnd(true);

    }
}
