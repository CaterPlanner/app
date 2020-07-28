package com.downfall.caterplanner.rest.model;

import org.joda.time.LocalDateTime;


import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class Briefing {

    private long purposeId;
    private int detailPlanKey;
    private LocalDateTime createAt;
    private int score;


}
