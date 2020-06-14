package com.downfall.caterplanner.common;

import com.downfall.caterplanner.common.DetailPlan;

import java.util.ArrayList;
import java.util.List;

public class Schedule {
    private DetailPlan data;
    private List<DetailPlan> previous;

    public Schedule(DetailPlan data) {
        this.data = data;
        this.previous = new ArrayList<DetailPlan>();
    }

    public void addPrevious(DetailPlan data){
        previous.add(data);
    }

    public DetailPlan getData() {
        return data;
    }

    public List<DetailPlan> getPrevious() {
        return previous;
    }


}
