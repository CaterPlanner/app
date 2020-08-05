package com.downfall.caterplanner.rest.model;


public abstract class StatisticsModel implements BriefingStatizable{

    @Override
    public int progress() {
        return Math.round(((float) getCurrentPerfectTime() / getMaxTime()) * 100);
    }

    @Override
    public int achieve() {
        return Math.round(((float) getCurrentBriefingCount() / getMaxTime()) * 100);
    }


}
