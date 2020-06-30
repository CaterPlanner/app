package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.common.Type;
import com.downfall.caterplanner.detailplantree.util.NodeSearcher;

import java.util.List;

public class MPRelationTree {

    private NodeList list;

    public MPRelationTree(){
        list = new NodeList();
        list.add(Node.createRoot());
    }

    public MPRelationTree(DetailPlan[] list) throws Exception {

        Node[] nodes = new Node[list.length + 1];
        nodes[0] = Node.createRoot();

        for(int i = 1; i < nodes.length; i++)
            nodes[i] = new Node(list[i - 1]);

        this.list = new NodeList(nodes);

        for(int i = 0; i < list.length; i++){
            Node node = this.list.get(list[i].getKey());

            if(node.getData().getConstructorRelationType() == 0)
                this.list.get(node.getData().getConstructorKey()).addChild(node);
            else
                this.list.get(node.getData().getConstructorKey()).addSuccessor(node);

        }

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
        node.setKey(list.size() - 1);
        return node;
    }

    public Node successor(int key, Node node) throws Exception {
        Node constructor = list.get(key);
        constructor.addSuccessor(node);
        list.add(node);
        node.setKey(list.size() - 1);
        return node;
    }


    public Node delete(int key) throws Exception {
        Node node = list.get(key);
        this.list.remove(key);

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

        list.removeAll(removeList);
        return node;
    }

    public Node[] getNodes() {
        return this.list.getAll(node -> node.getType() != Type.R);
    }

    public Node[] getPNodes() {return this.list.getAll(node -> node.getType() == Type.P);}

}
