package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.common.Type;

import java.util.ArrayList;
import java.util.List;

public class Node{

    private List<Node> children;
    private List<Node> successors;

    private DetailPlan data;

    private Node constructor;
    private int constructorType; //0 : parent 1 : predecessor

    public Node(DetailPlan detailPlan) {
        this.data = detailPlan;
        this.children = new ArrayList<>();
        this.successors = new ArrayList<>();
    }

    public int getKey() {
        return this.data.getKey();
    }

    public void setKey(int key) {
        this.data.setKey(key);
    }

    public DetailPlan getData() {
        return data;
    }

    public Type getType(){
        return data.getType();
    }

    public Node getConstructor() {
        return constructor;
    }

    public int getConstructorType() {
        return data.getConstructorType();
    }

    public void setConstructorType(int constructorType) {
        this.constructorType = constructorType;
    }

    public void setConstructor(Node constructor) {
        this.constructor = constructor;
    }

    public Node[] getChildren() {
        return children.toArray(new Node[children.size()]);
    }

    public Node[] getSuccessors() {
        return successors.toArray(new Node[successors.size()]);
    }

    public void addChild(Node node) throws Exception{
        if(node.getConstructor() != null)
            throw new Exception("Cannot have multiple constructors.");

        this.children.add(node);
        node.setConstructor(this);
        node.setConstructorType(0);
    }

    public boolean removeChild(Node node){
        return this.children.remove(node);
    }

    public void addSuccessor(Node node) throws Exception{
        if(node.getConstructor() != null)
            throw new Exception("Cannot have multiple constructors.");

        this.successors.add(node);
        node.setConstructor(this);
        node.setConstructorType(1);
    }

    public boolean removeSuccessor(Node node){
        return this.successors.remove(node);
    }
}
