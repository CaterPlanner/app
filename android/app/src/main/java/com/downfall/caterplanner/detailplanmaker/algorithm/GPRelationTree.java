package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.detailplanmaker.util.NodeSearcher;

import java.util.List;

public class GPRelationTree {

    private NodeList nodeList;

    public GPRelationTree(){
        nodeList = new NodeList();
        nodeList.add(Node.createRoot());
    }

    public GPRelationTree(DetailPlan[] list) throws Exception {

        Node[] nodes = new Node[list.length + 1];
        nodes[0] = Node.createRoot();

        for(int i = 1; i < nodes.length; i++)
            nodes[i] = new Node(list[i - 1]);

        this.nodeList = new NodeList(nodes);

        for(int i = 0; i < list.length; i++){
            Node node = this.nodeList.get(list[i].getKey());

            if(node.getData().getConstructorRelationType() == 0)
                this.nodeList.get(node.getData().getConstructorKey()).addChild(node);
            else
                this.nodeList.get(node.getData().getConstructorKey()).addSuccessor(node);

        }

    }

    public Node getRoot() {
        return nodeList.get(0);
    }

    public Node select(int key) {
        return nodeList.get(key);
    }

    public Node insert(int key, Node node) throws Exception {
        if(node.getType() != Type.P)
            throw new Exception("Only P-type nodes can be inserted.");

        Node constructor = nodeList.get(key);

        if(constructor.getType() != Type.G)
            throw new Exception("The constructor node must be of type G when insert");


        constructor.addChild(node);
        nodeList.add(node);
        node.setKey(nodeList.size() - 1);
        return node;
    }

    public Node successor(int key, Node node) throws Exception {
        if(node.getType() != Type.G)
            throw new Exception("Only G-type nodes can be successored.");

        Node constructor = nodeList.get(key);

        if(constructor.getType() != Type.G)
            throw new Exception("The constructor node must be of type G when successor");

        constructor.addSuccessor(node);
        nodeList.add(node);
        node.setKey(nodeList.size() - 1);
        return node;
    }


    public Node delete(int key) throws Exception {
        Node node = nodeList.get(key);
        this.nodeList.remove(key);

        if(node.getConstructorRelationType() == 0)
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

        nodeList.removeAll(removeList);
        return node;
    }

    public Node[] getUseNodes() {
        return this.nodeList.getAll(node -> node.getType() != Type.R);
    }



}
