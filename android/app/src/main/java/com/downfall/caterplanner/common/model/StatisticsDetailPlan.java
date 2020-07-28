package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import java.time.LocalDateTime;
import java.util.Date;

public abstract class StatisticsDetailPlan extends DetailPlan implements BriefingStatizable{

    protected int maxTime;
    protected int currentPerfectTime;
    protected int currentBriefingCount;
    protected boolean isStatizable;

    public StatisticsDetailPlan(int key, long headerId, int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat) {
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
