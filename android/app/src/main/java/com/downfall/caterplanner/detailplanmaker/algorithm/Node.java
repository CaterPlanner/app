package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.model.RelationTreeEntity;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;


public class Node{

    @Getter
    private int level;

    @Getter
    @Setter
    private int key;

    @Getter
    private RelationTreeEntity data;

    @Getter
    private NodeList children;

    public Node(RelationTreeEntity data) {
        this.data = data;

        if(data.getType() == Type.G)
            children = new NodeList();
    }


    public int getKey() {
        return this.key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public void setLevel(int level) {
        this.level = level;
        for(Node child : children.getAll())
            child.setLevel(level);
    }

    public RelationTreeEntity getData() {
        switch (getType()){
            case G:
                Goal goal = (Goal) data;
                goal.setLevel(level);
                goal.setKey(key);
                break;
            case P:
                Perform perform = (Perform) data;
                data.setKey(key);
                break;
        }

        return data;
    }

    public Type getType() {return data.getType();}

    public void addChild(Node node){
        if(node.getType() != Type.P)
            throw new RuntimeException("must P");

        node.setLevel(level);

        this.children.add(node);
    }

    public void removeChilde(int index){
        this.children.remove(index);
    }

}
