package com.downfall.caterplanner.detailplantree.service;


import com.downfall.caterplanner.detailplantree.algorithm.MPOrderRelationTree;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.processor.BottomViewDataMaker;
import com.downfall.caterplanner.detailplantree.processor.EntryDataMaker;
import com.downfall.caterplanner.detailplantree.processor.ScheduleMaker;
import com.downfall.caterplanner.detailplantree.processor.TopViewDataMaker;
import com.downfall.caterplanner.detailplantree.util.NodeUtil;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


public class MPOrderRelationTreeService implements CaterPlannerDetailPlanTreeService{

    private MPOrderRelationTree tree;

    @Override
    public void create(){
        tree = new MPOrderRelationTree();
    }

    @Override
    public WritableMap get(String key) throws Exception {
        return DetailPlan.parseReadableMap(tree.select(key).getData());
    }

    @Override
    public WritableArray entry() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return new EntryDataMaker().make(tree.getNodes());
    }

    @Override
    public void insert(String parentKey, ReadableMap data) throws Exception {
        if(tree == null)
            throw new Exception("Please create a tree first.");
       tree.insert(parentKey, new Node(DetailPlan.valueOf(data)));
    }

    @Override
    public WritableMap mapBottomViewData(String activeParentKey) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node parent = tree.select(activeParentKey);
        if(parent == null)
            throw new Exception("Node does not exist.");
        return new BottomViewDataMaker().make(parent);
    }

    @Override
    public WritableArray mapTopViewData(String activeParentKey) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node constructor = tree.select(NodeUtil.getConsturctorKey(activeParentKey));
        if(constructor == null)
            throw new Exception("Node does not exist.");
        return new TopViewDataMaker().make(constructor);
    }

    @Override
    public void build(ReadableArray param) throws Exception{
        if(tree != null)
            throw new Exception("The tree is already created.");
        DetailPlan[] list = new DetailPlan[param.size()];
        for(int i = 0; i < param.size(); i++){
            list[i] = DetailPlan.valueOf(param.getMap(i));
        }
        tree = new MPOrderRelationTree(list);
    }

    @Override
    public void delete(String key) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.delete(key);
    }

    @Override
    public WritableArray schedules() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return new ScheduleMaker().make(tree.getRoot());
    }

    @Override
    public void successor(String previousKey, ReadableMap data) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        tree.next(previousKey, new Node(DetailPlan.valueOf(data)));
    }

    @Override
    public void modify(String key, ReadableMap param) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node node = tree.select(key);
        node.getData().modify(DetailPlan.valueOf(param));
    }


}
