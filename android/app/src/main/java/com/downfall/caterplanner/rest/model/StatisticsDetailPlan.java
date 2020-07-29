package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import org.joda.time.LocalDate;

public abstract class StatisticsDetailPlan implements BriefingStatizable{

    protected int maxTime;
    protected int currentPerfectTime;
    protected int currentBriefingCount;
    protected boolean isStatizable;


    @Override
    public int getMaxTime() {
        if(!isStatizable)
            throw new RuntimeException();
        return maxTime;
    }

    @Override
    public int getCurrentPerfectTime() {
        if(!isStatizable)
            throw new RuntimeException();
        return currentPerfectTime;
    }

    @Override
    public int getCurrentBriefingCount() {
        if(!isStatizable)
            throw new RuntimeException();
        return currentBriefingCount;
    }


    @Override
    public int progress() {
        if(!isStatizable)
            throw new RuntimeException();
        return Math.round(((float) getCurrentPerfectTime() / getMaxTime()) * 100);
    }

    @Override
    public int achieve() {
        if(!isStatizable)
            throw new RuntimeException();
        return Math.round(((float) getCurrentBriefingCount() / getMaxTime()) * 100);
    }
}
