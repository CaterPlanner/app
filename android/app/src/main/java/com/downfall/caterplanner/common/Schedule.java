package com.downfall.caterplanner.common;

import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.algorithm.Node;

import java.util.ArrayList;
import java.util.List;

public class Schedule {
    private DetailPlan data;
    private List<Node> previous;

    public Schedule(DetailPlan data, List<Node> previous) {
        this.data = data;
        this.previous = previous;
    }

    public DetailPlan getData() {
        return data;
    }

    public List<Node> getPrevious() {
        return previous;
    }
}
