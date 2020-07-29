package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.DetailPlan;

import java.util.ArrayList;
import java.util.List;

public class Node{

    private List<Node> children;
    private List<Node> successors;

    private DetailPlan data;

    private Node constructor;

    public Node(DetailPlan detailPlan) {
        this.data = detailPlan;
        this.children = new ArrayList<Node>();
        this.successors = new ArrayList<Node>();
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

    public int getConstructorRelationType() {
        return data.getConstructorRelationType();
    }

    public void setConstructorRelationType(int constructorRelationType) {
        this.data.setConstructorRelationType(constructorRelationType);
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
        node.setConstructorRelationType(0);
    }

    public boolean removeChild(Node node){
        return this.children.remove(node);
    }

    public void addSuccessor(Node node) throws Exception{
        if(node.getConstructor() != null)
            throw new Exception("Cannot have multiple constructors.");

        this.successors.add(node);
        node.setConstructor(this);
        node.setConstructorRelationType(1);
    }

    public boolean removeSuccessor(Node node){
        return this.successors.remove(node);
    }

    public static Node createRoot() {
        return new Node(new DetailPlan(0,  null, -1, -1, "ROOT", Type.R, null, null, null, null, null, -1));
    }
}
