package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.PlanType;

public interface RelationTreeEntity{
    PlanType getType();
    void setConstructorKey(int constructorKey);
    void setId(int id);

}
