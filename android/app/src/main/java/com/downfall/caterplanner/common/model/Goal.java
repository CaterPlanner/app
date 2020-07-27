package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;


public class Goal extends StatisticsDetailPlan{

    private Perform[] performs;

    public Goal(int key, Long headerId, int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat) {
        super(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, cycle, stat);
    }

    public Goal(int key, Long headerId, int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat, Perform[] performs) {
        super(key, headerId ,constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, null, stat);

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
}
