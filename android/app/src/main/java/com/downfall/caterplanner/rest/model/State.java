package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.PlanType;

public enum State {

    PROCEED(0) , WAIT(1), SUCCESS(2), FAIL(3);

    private int value;

    State(int value){
        this.value = value;
    }

    public static State findByValue(int value){
        for(State state : values()){
            if(state.getValue() == value)
                return state;
        }
        return null;
    }

    public boolean isPass(){
        return this.value > 1;
    }

    public int getValue() {
        return value;
    }
}
