package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.detailplanmaker.util.NodeSearcher;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.facebook.react.bridge.ReadableArray;

import java.text.ParseException;
import java.util.List;

/**
 * Node 들의 병행, 단계 관계만 담당하는 트리
 * Perform 까진 담당하지 않음
 */
public class RelationTree {

    private NodeList nodeList;

    public static Builder builder() {
        return new Builder();
    }

    public RelationTree(){
        this.nodeList = new NodeList();
        nodeList.add(Node.createRoot());
    }

    private RelationTree(Node[] nodes){

        this.nodeList = new NodeList(nodes);
        nodeList.add(Node.createRoot());

        for(int i = 0; i < nodes.length; i++){
            Node node = this.nodeList.get(nodes[i].getKey());
            this.nodeList.get(node.getData().getConstructorKey()).addSuccessor(node);
        }
    }


    public Node getRoot() {
        return nodeList.get(0);
    }

    public Node select(int key) {
        return nodeList.get(key);
    }


    public Node successor(int key, Node node) {

        Node constructor = nodeList.get(key);
        constructor.addSuccessor(node);
        nodeList.add(node);

        node.setKey(nodeList.size() - 1);
        return node;
    }


    public Node delete(int key){
        Node node = nodeList.get(key);
        this.nodeList.remove(key);

        node.getConstructor().removeSuccessor(node);


        List<Node> removeList = NodeSearcher.dfs(node, element -> true, (stack, element) -> {
            for (Node next : element.getSuccessors()){
                stack.push(next);
            }
        });

        nodeList.removeAll(removeList);
        return node;
    }

    public Node[] getUseNodes() {
        return this.nodeList.getAll(node -> !node.isRoot());
    }

    public static class Builder{

        public static RelationTree build(DetailPlans detailPlans){
            List<Goal> entryData = detailPlans.getEntryData();
            Node[] nodes = new Node[entryData.size()];

            for(int i = 0; i < nodes.length; i++){
                NodeList children = new NodeList();
                for(Perform p : entryData.get(i).getPerforms()){
                    children.insert(p.getId(), new Node(p));
                }
                nodes[i] = new Node(entryData.get(i), children);
            }

            return new RelationTree(nodes);
        }
    }


}
