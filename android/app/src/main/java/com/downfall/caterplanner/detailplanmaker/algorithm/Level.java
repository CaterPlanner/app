package com.downfall.caterplanner.detailplanmaker.algorithm;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class Level {

    private int level;
    private List<Node> nodeList;

    public Level(int level){
        this.level = level;
        this.nodeList = new ArrayList<>();
    }

    public void setLevel(int level) {
        this.level = level;
        for(Node node : nodeList){
            node.setLevel(level);
        }
    }

    public void addNode(Node node){
        nodeList.add(node);
        node.setLevel(level);
    }

    public void removeNode(Node node){
        nodeList.remove(nodeList);
    }

    public boolean isEmpty(){
        return nodeList.isEmpty();
    }

    public int size(){
        return nodeList.size();
    }


}
