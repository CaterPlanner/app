package com.downfall.caterplanner.common.model;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;


import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class Briefing {

    private long headerId;
    private long detailPlanKey;
    private LocalDateTime createAt;
    private int score;


}
