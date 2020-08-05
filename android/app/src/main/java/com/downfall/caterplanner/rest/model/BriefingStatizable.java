package com.downfall.caterplanner.rest.model;

public interface BriefingStatizable {

    int progress();
    int achieve();

    int getMaxTime();
    int getCurrentPerfectTime();
    int getCurrentBriefingCount();

}
