package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import java.util.Date;

public interface BriefingStatizable {

    int progress();
    int achieve();

    void statistion();

    int getMaxTime();
    int getCurrentPerfectTime();
    int getCurrentBriefingCount();

}
