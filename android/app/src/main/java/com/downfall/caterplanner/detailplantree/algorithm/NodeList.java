package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.common.Type;

import java.util.ArrayList;
import java.util.List;

public class NodeList {

    private Node[] data;
    private int size;
    private int capacity;

    public NodeList() {
        this(10);
    }

    public NodeList(int initCapacity) {
        this.capacity = initCapacity;
        this.size = 0;
        data = new Node[capacity];
    }

    public NodeList(Node[] initData){
        this.data = initData;
        this.capacity = data.length;
        this.size = data.length;
    }

    private void validIndex(int index) {
        if (index >= size || index < 0)
            throw new IndexOutOfBoundsException("Can't find that node.");
        if (size == 0) {
            throw new IndexOutOfBoundsException("Array is empty.");
        }
    }

    private void defragmentation() {
        int pointer = -1;

        for (int i = 0; i < data.length; i++) {
            if (data[i] == null && pointer == -1) {
                pointer = i;
            }
            if (data[i] != null && pointer != -1) {
                data[pointer] = data[i];
                data[i] = null;
                data[pointer].setKey(pointer);
                pointer++;
            }
        }

    }

    public Node get(int index) {
        validIndex(index);
        return data[index];
    }

    public void add(Node node) {
        if (size >= capacity) {
            capacity = (int) (capacity * 1.5f);
            Node[] newArray = new Node[capacity];
            for (int i = 0; i < size; i++)
                newArray[i] = data[i];
            data = newArray;
        }
        data[++size - 1] = node;
    }

    public void remove(Node node) {
        int index = node.getKey();
        validIndex(index);
        data[index] = null;
        size--;

        defragmentation();
    }

    public void removeAll(List<Node> nodes) {
        for (int i = 0; i < nodes.size(); i++)
            remove(data[nodes.get(i).getKey()]);

        defragmentation();

    }

    public Node[] getAll() {
        Node[] result = new Node[size];
        for(int i = 0; i < size; i++)
            result[i] = data[i];
        return result;
    }

    public Node[] getAllPNode(){
        List<Node> result = new ArrayList<>();
        for(Node node : data){
            if(node.getType() == Type.P)
                result.add(node);
        }
        return result.toArray(new Node[result.size()]);
    }

    public int size(){
        return size;
    }

    public boolean isEmpty(){
        return size == 0;
    }
}
