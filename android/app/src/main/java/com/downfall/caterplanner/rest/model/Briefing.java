package com.downfall.caterplanner.rest.model;

import org.joda.time.LocalDateTime;


import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class Briefing {

    private long headerId;
    private int goalKey;
    private int performId;
    private LocalDateTime createAt;
    private int score;


}
