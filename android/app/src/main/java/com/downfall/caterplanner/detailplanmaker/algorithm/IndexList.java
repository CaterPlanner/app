package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.RelationTreeEntity;

import java.util.Arrays;
import java.util.List;

public class IndexList<T extends RelationTreeEntity> {

    private RelationTreeEntity[] data;
    private int size;
    private int capacity;

    public IndexList() {
        this(10);
    }

    public IndexList(List<T> nodes) {
        this(nodes.size());

        for(T node : nodes) {
            insert(node.getId(), node);
        }
    }

    public IndexList(int initCapacity) {
        this.capacity = initCapacity;
        this.size = 0;
        data = new RelationTreeEntity[capacity];
    }

    @Deprecated
    public void insert(int index, T node) {
        if(index < 0) {
            throw new IndexOutOfBoundsException("index < 0 <- not allowed as indexes");
        }else if(index >= capacity) {
            capacity = index;
            expansion();
        }
        data[index] = node;
        size++;
    }

    @Deprecated
    public boolean isComplete(){
        for(int i = 0; i < data.length; i++){
            if(data[i] == null)
                return false;
        }
        return true;
    }


    private void expansion() {
        capacity = (int) Math.ceil(capacity * 1.5f);
        RelationTreeEntity[] newArray = new RelationTreeEntity[capacity];
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
                data[pointer].setId(pointer);
                pointer++;
            }
        }

    }

    public boolean contain(int index){
        return !(index >= size || index < 0);
    }

    public T get(int index) {
        if (size == 0) {
            throw new IndexOutOfBoundsException("Array is empty.");
        }
        if (index >= size || index < 0) {
            throw new IndexOutOfBoundsException("Can't find that node.");
        }

        return (T) data[index];
    }

    public void add(T node) {
        if (size >= capacity) {
            expansion();
        }
        data[++size - 1] = node;
        node.setId(size - 1);
    }

    public RelationTreeEntity remove(int index) {
        if (index >= size || index < 0) {
            throw new IndexOutOfBoundsException("Can't find that node.");
        }
        if (size == 0) {
            throw new IndexOutOfBoundsException("Array is empty.");
        }

        RelationTreeEntity element = data[index];
        data[index] = null;
        size--;

        defragmentation();
        return element;
    }


    public List<T> getAll() {
        return (List<T>) Arrays.asList(data);
    }



    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

}
