package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.Type;

public interface RelationTreeEntity {
    int getKey();
    void setKey(int key);

    int getConstructorKey();
    void setConstructorKey(int key);

    Type getType();
}
