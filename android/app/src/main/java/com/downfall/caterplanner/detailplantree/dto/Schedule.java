package com.downfall.caterplanner.detailplantree.dto;

import java.util.ArrayList;
import java.util.List;

public class Schedule {
    private PlanData data;
    private List<PlanData> previous;

    public Schedule(PlanData data) {
        this.data = data;
        this.previous = new ArrayList<PlanData>();
    }

    public void addPrevious(PlanData data){
        previous.add(data);
    }

    public PlanData getData() {
        return data;
    }

    public List<PlanData> getPrevious() {
        return previous;
    }


}
