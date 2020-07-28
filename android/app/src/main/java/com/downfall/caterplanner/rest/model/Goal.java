package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import org.joda.time.LocalDate;

import lombok.Getter;


public class Goal extends StatisticsDetailPlan{

    @Getter
    private Perform[] performs;

    public Goal(int key, Long purposeId, int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat) {
        super(key, purposeId, constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, cycle, stat);
    }

    public Goal(int key, Long purposeId, int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat, Perform[] performs) {
        super(key, purposeId ,constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, null, stat);

        this.performs = performs;

        statistion();

    }

    public void setPerforms(Perform[] performs) {
        this.performs = performs;
        statistion();
    }

    @Override
    public void statistion() {
        if(this.performs == null)
            throw new RuntimeException();

        for (Perform p : performs) {
            this.maxTime += p.getMaxTime();
            this.currentPerfectTime += p.getCurrentPerfectTime();
            this.currentBriefingCount += p.getCurrentBriefingCount();
        }

        isStatizable = true;
    }


    @Override
    public int achieve() {
        int value = super.achieve();
        return value >= this.getHopeAchievement() ? 100 : value;
    }

    @Override
    public int getCurrentBriefingCount() {
        return achieve() == 100 ? super.getMaxTime() :  super.getCurrentBriefingCount();
    }
}
