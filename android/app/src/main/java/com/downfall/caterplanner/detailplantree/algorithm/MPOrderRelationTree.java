package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.util.NodeSearcher;

import java.util.List;

public class MPOrderRelationTree {

    private NodeList list;

    public MPOrderRelationTree(){
        list = new NodeList();
        list.add(new Node(new DetailPlan()));
    }

    public MPOrderRelationTree(DetailPlan[] list) throws Exception {
        Node[] initData = new Node[list.length + 1]; //root + recieve data
        initData[0] = new Node(new DetailPlan());
        //init nodes
        for(int i = 1; i < initData.length; i++)
            initData[i] = new Node(list[i - 1]);

        //make relation
        for(int i = 1; i < initData.length; i++){
            int constructorKey = list[i - 1].getConstructorKey();

            if(list[i - 1].getConstructorType() == 0) initData[constructorKey].addChild(initData[i]);
            else initData[constructorKey].addSuccessor(initData[i]);
        }

        this.list = new NodeList(initData);

    }

    public Node getRoot() {
        return list.get(0);
    }

    public Node select(int key) {
        return list.get(key);
    }

    public Node insert(int key, Node node) throws Exception {
        Node constructor = list.get(key);
        constructor.addChild(node);
        list.add(node);
        return node;
    }

    public Node successor(int key, Node node) throws Exception {
        Node constructor = list.get(key);
        constructor.addSuccessor(node);
        list.add(node);
        return node;
    }


    public Node delete(int key) throws Exception {
        Node node = list.get(key);
        this.list.remove(node);

        if(node.getConstructorType() == 0)
            node.getConstructor().removeChild(node);
        else
            node.getConstructor().removeSuccessor(node);


        List<Node> removeList = NodeSearcher.dfs(node, element -> true, (stack, element) -> {
            for(Node child : element.getChildren()){
                stack.push(child);
            }
            for (Node next : element.getSuccessors()){
                stack.push(next);
            }
        });

        list.removeAll(removeList);
        return node;
    }

    public Node[] getNodes() {
        return this.list.getAll();
    }

    public Node[] getPNodes() {return this.list.getAllPNode();}

}
