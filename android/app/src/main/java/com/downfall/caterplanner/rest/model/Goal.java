package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import org.joda.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class Goal extends StatisticsDetailPlan{

    private long purposeId;
    private int key;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private int hopeAchievement;
    private int stat;

    @Getter
    private Perform[] performs;


    public Goal(long purposeId, int key, String name, LocalDate startDate, LocalDate endDate, int hopeAchievement, int stat) {
        this.purposeId = purposeId;
        this.key = key;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hopeAchievement = hopeAchievement;
        this.stat = stat;
    }

    public Goal(long purposeId, int key, String name, LocalDate startDate, LocalDate endDate, int hopeAchievement, int stat, Perform[] performs) {
        this(purposeId, key, name, startDate, endDate, hopeAchievement, stat);
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
