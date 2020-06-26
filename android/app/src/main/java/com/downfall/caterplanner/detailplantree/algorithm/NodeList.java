package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.detailplantree.util.IsElementMatch;
import java.util.Arrays;
import java.util.List;

public class NodeList {

    private Node[] data;
    private int size;
    private int capacity;

    public NodeList() {
        this(10);
    }

    public NodeList(Node[] nodes) {
        this(nodes.length);

        for(Node node : nodes) {
            insert(node.getKey(), node);
        }
    }

    public NodeList(int initCapacity) {
        this.capacity = initCapacity;
        this.size = 0;
        data = new Node[capacity];
    }

    private void insert(int index, Node node) {
        if(index < 0) {
            throw new IndexOutOfBoundsException("index < 0 <- not allowed as indexes");
        }else if(index >= capacity) {
            capacity = index;
            expansion();
        }
        data[index] = node;
        size++;
    }


    private void expansion() {
        capacity = (int) Math.ceil(capacity * 1.5f);
        Node[] newArray = new Node[capacity];
        for (int i = 0; i < size; i++)
            newArray[i] = data[i];
        data = newArray;
    }

    public void defragmentation() {
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
        if (index >= size || index < 0) {
            throw new IndexOutOfBoundsException("Can't find that node.");
        }
        if (size == 0) {
            throw new IndexOutOfBoundsException("Array is empty.");
        }

        return data[index];
    }

    public void add(Node node) {
        if (size >= capacity) {
            expansion();
        }
        data[++size - 1] = node;
    }

    public void remove(int index) {
        if (index >= size || index < 0) {
            throw new IndexOutOfBoundsException("Can't find that node.");
        }
        if (size == 0) {
            throw new IndexOutOfBoundsException("Array is empty.");
        }

        data[index] = null;
        size--;

        defragmentation();
    }

    public void removeAll(List<Node> nodes) {
        for (int i = 0; i < nodes.size(); i++)
            remove(data[nodes.get(i).getKey()].getKey());

        defragmentation();

    }

    public Node[] getAll() {

        Node[] result = new Node[size];
        for (int i = 0; i < size; i++)
            result[i] = data[i];
        return result;
    }

    public Node[] getAll(IsElementMatch<Node> filter) {
        return Arrays.asList(this.data).stream().filter(node -> filter.isMatch(node)).toArray(size -> new Node[size]);
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

}
