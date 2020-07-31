package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.model.RelationTreeEntity;

import lombok.Getter;
import lombok.Setter;


public class Node implements IndexListElement {

    @Getter
    private int level;

    @Getter
    @Setter
    private int key;

    @Getter
    private RelationTreeEntity data;

    private IndexList<Node> children;

    public Node(RelationTreeEntity data) {
        this.data = data;

        if(data.getType() == Type.G)
            children = new IndexList<Node>();
    }

    public Node(RelationTreeEntity data, IndexList<Node> children){
        if(data.getType() != Type.G)
            throw new RuntimeException();
        this.data = data;
        this.children = children;
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
        for(Node child : children.getAll())
            child.setLevel(level);
    }

    public Node[] getChildren() {
        return children.getAll();
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
                perform.setKey(key);
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
