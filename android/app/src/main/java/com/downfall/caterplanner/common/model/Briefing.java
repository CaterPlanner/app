package com.downfall.caterplanner.common.model;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
public class Briefing {

    private long headerId;
    private long detailPlanKey;
    private LocalDate createAt;
    private int score;


}
