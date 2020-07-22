package com.downfall.caterplanner.detailplantree.service;

import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.algorithm.GPRelationTree;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.manufacture.BaseScheduleMaker;
import com.downfall.caterplanner.detailplantree.manufacture.BottomViewDataMaker;
import com.downfall.caterplanner.detailplantree.manufacture.EntryDataMaker;
import com.downfall.caterplanner.detailplantree.manufacture.GPScheduleMaker;
import com.downfall.caterplanner.detailplantree.manufacture.TopViewDataMaker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class GPRelationTreeService implements CaterPlannerDetailPlanTreeService {

    private GPRelationTree tree;
    private BaseScheduleMaker scheduleMaker;

    public GPRelationTreeService() {
        this.scheduleMaker = new GPScheduleMaker();
    }

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
        return new EntryDataMaker().make(tree.getUseNodes());
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
    public WritableArray schedules() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return scheduleMaker.make(tree.getRoot());
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
        return new BottomViewDataMaker().make(tree.getRoot());
    }

    public WritableMap mapGoalTopViewData() throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        return new TopViewDataMaker().make(tree.getRoot());
    }

}
