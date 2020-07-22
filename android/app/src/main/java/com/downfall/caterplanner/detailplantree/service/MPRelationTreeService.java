package com.downfall.caterplanner.detailplantree.service;


import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.algorithm.MPRelationTree;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.algorithm.NodeList;
import com.downfall.caterplanner.detailplantree.manufacture.BaseScheduleMaker;
import com.downfall.caterplanner.detailplantree.manufacture.BottomViewDataMaker;
import com.downfall.caterplanner.detailplantree.manufacture.EntryDataMaker;
import com.downfall.caterplanner.detailplantree.manufacture.MPScheduleMaker;
import com.downfall.caterplanner.detailplantree.manufacture.TopViewDataMaker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

//TODO 나중에 유지 보수 코드 정리 필요
public class MPRelationTreeService implements CaterPlannerDetailPlanTreeService{

    private MPRelationTree tree;
    private NodeList nodeList;

    private BaseScheduleMaker scheduleMaker;

    public MPRelationTreeService() {
        this.scheduleMaker = new MPScheduleMaker();
    }

    @Override
    public void create(){
        nodeList = new NodeList();
        tree = new MPRelationTree(nodeList);
    }

    @Override
    public WritableMap get(int key) throws Exception {
        return DetailPlan.parseWritableMap(tree.select(key).getData());
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
       tree.insert(parentKey, new Node(DetailPlan.valueOf(data)));
    }

    public WritableMap mapBottomViewData(int activeParentKey) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node parent = tree.select(activeParentKey);
        if(parent == null)
            throw new Exception("Node does not exist.");
        return new BottomViewDataMaker().make(parent);
    }

    public WritableArray mapTopViewData(int activeParentKey) throws Exception{
        if(tree == null)
            throw new Exception("Please create a tree first.");
        Node parent = tree.select(activeParentKey);
        if(parent == null)
            throw new Exception("Node does not exist.");
        return new TopViewDataMaker().make(parent);
    }

    @Override
    public void build(ReadableArray param) throws Exception{
        if(tree != null)
            throw new Exception("The tree is already created.");
        DetailPlan[] list = new DetailPlan[param.size()];
        for(int i = 0; i < param.size(); i++){
            list[i] = DetailPlan.valueOf(param.getMap(i));
        }
        tree = new MPRelationTree(nodeList, list);
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


}
