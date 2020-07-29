package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.R;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.RelationTreeEntity;

import java.util.ArrayList;
import java.util.List;

public class Node{

    private List<Node> successors;
    private RelationTreeEntity data;
    private Node constructor;

    private NodeList children;

    public Node(RelationTreeEntity goal) {
        this(goal, new NodeList());
    }

    public Node(RelationTreeEntity goal, NodeList children){
        this.data = goal;
        this.successors = new ArrayList<Node>();
        this.children = children;
    }

    public int getKey() {
        return this.data.getKey();
    }

    public void setKey(int key) {
        this.data.setKey(key);
    }

    public RelationTreeEntity getData() {
        return data;
    }

    public Node getConstructor() {
        return constructor;
    }

    public Type getType() {return data.getType();}

    public int getConstructorKey() {return constructor.getKey();}

    public boolean isRoot() {return this.data.getType() == Type.G && this.data.getKey() == 0;}

    public void setConstructor(Node constructor) {
        this.constructor = constructor;
        this.data.setConstructorKey(constructor.getKey());
    }

    public Node[] getSuccessors() {
        return successors.toArray(new Node[successors.size()]);
    }

    public Node[] getChildren(){
        return successors.toArray(new Node[children.size()]);
    }

    public void addSuccessor(Node node){
        if(node.getConstructor() != null)
            throw new RuntimeException("Cannot have multiple constructors.");

        if(node.getType() != Type.G)
            throw new RuntimeException("must G");

        this.successors.add(node);
        node.setConstructor(this);
    }

    public boolean removeSuccessor(Node node){
        if(node.getType() != Type.G)
            throw new RuntimeException("must G");
        if(node.getConstructor() != this)
            throw new RuntimeException("This is not My Children");

        return this.successors.remove(node);
    }

    public void addChild(Node node){
        if(node.getConstructor() != null)
            throw new RuntimeException("Cannot have multiple constructors.");

        if(node.getType() != Type.P)
            throw new RuntimeException("must P");

        this.children.add(node);
        node.setConstructor(this);
    }

    public void removeChilde(int index){
        this.children.remove(index);
    }


    public static Node createRoot() {
        return new Node(
                Goal.builder()
                .id(0)
                .headerId(-1L)
                .stat(0)
                .build()
            );
    }
}
