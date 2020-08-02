package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.model.RelationTreeEntity;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;


public class Node implements IndexListElement {

    @Getter
    private int level;

    private int key;

    private RelationTreeEntity data;

    @Getter
    @Setter
    private IndexListElement constructor;

    @Getter
    private ArrayList<Node> children;

    public Node(RelationTreeEntity data) {
        this.data = data;

        if(data.getType() == PlanType.G)
            children = new ArrayList<Node>();
    }


    @Override
    public int getKey() {
        return this.key;
    }

    @Override
    public void setKey(int key) {
        this.key = key;
    }

    public void setLevel(int level) {
        this.level = level;
        for(Node child : children)
            child.setLevel(level);
    }

    public RelationTreeEntity getData() {
        switch (getType()){
            case G:
                Goal goal = (Goal) data;
                goal.setLevel(level);
                goal.setId(key);
                break;
            case P:
                Perform perform = (Perform) data;
                perform.setId(key);
                break;
        }

        return data;
    }

    public PlanType getType() {return data.getType();}

    public int addChild(Node node){
        if(node.getType() != PlanType.P)
            throw new RuntimeException("must P");

        node.setLevel(level);

        this.children.add(node);
        return this.children.size() - 1;
    }

    public void removeChild(Node node){
        this.children.remove(node);
    }

}
