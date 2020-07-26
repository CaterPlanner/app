package com.downfall.caterplanner.common.model;

import java.time.LocalDate;
import java.util.Date;

public class Briefing {

    private long headerId;
    private long detailPlanKey;
    private LocalDate createAt;
    private int score;

    public Briefing(long headerId, long detailPlanKey, LocalDate createAt, int score) {
        this.headerId = headerId;
        this.detailPlanKey = detailPlanKey;
        this.createAt = createAt;
        this.score = score;
    }

    public long getHeaderId() {
        return headerId;
    }

    public long getDetailPlanKey() {
        return detailPlanKey;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public int getScore() {
        return score;
    }
}
