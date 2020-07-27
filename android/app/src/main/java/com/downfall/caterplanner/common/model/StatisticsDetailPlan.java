package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import java.time.LocalDate;
import java.util.Date;

public abstract class StatisticsDetailPlan extends DetailPlan implements BriefingStatizable{

    protected int maxTime;
    protected int currentPerfectTime;
    protected int currentBriefingCount;
    protected boolean isStatizable;

    public StatisticsDetailPlan(int key, long headerId,  int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat) {
        super(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, cycle, stat);
    }

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
    public float progress() {
        if(!isStatizable)
            throw new RuntimeException();
        return Math.round(getCurrentBriefingCount() / getMaxTime()) / 100.0f;
    }

    @Override
    public float achieve() {
        if(!isStatizable)
            throw new RuntimeException();
        return Math.round(getCurrentBriefingCount() / getMaxTime()) / 100.0f;
    }
}
