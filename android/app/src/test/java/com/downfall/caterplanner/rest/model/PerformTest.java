package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.Type;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PerformTest {

    Perform defaultPerform;
    LocalDate today;

    @BeforeEach
    void initDefaultPerform() {
        defaultPerform = new Perform(
                2,
                0L,
                1,
                0,
                "TestPerform",
                Type.P,
                new LocalDate(2020, 7, 1),
                new LocalDate(2020, 8, 4),
                80,
                "#ff0000",
                "W 1 2",
                0
        );

        defaultPerform.setToday(
                new LocalDate(2020,7,28)
        );

        List<Briefing> briefings = new ArrayList<>();
        briefings.add(
                Briefing.builder()
                        .headerId(0L)
                        .detailPlanKey(2)
                        .createAt(new LocalDateTime(2020, 7, 7, 0,0,0,0))
                        .score(0).build()
        );
        briefings.add(
                Briefing.builder()
                        .headerId(0L)
                        .detailPlanKey(2)
                        .createAt(new LocalDateTime(2020, 7, 13, 0,0,0,0))
                        .score(0).build()
        );
        briefings.add(
                Briefing.builder()
                        .headerId(0L)
                        .detailPlanKey(2)
                        .createAt(new LocalDateTime(2020, 7, 14, 0,0,0,0))
                        .score(0).build()
        );
        briefings.add(
                Briefing.builder()
                        .headerId(0L)
                        .detailPlanKey(2)
                        .createAt(new LocalDateTime(2020, 7, 20, 0,0,0,0))
                        .score(0).build()
        );

        defaultPerform.setBriefings(briefings.toArray(new Briefing[briefings.size()]));

    }

    @Test
    void achieve(){
        assertEquals(defaultPerform.achieve(), 40);
    }

    @Test
    void progress(){
        assertEquals(defaultPerform.progress(), 80);
    }

    @Test
    void cycle(){
        assertEquals(defaultPerform.getCycleType(), 'W');
        assertEquals(defaultPerform.getCycleParams().length, 2);

        //getCurrentPerfectTime
        assertEquals(defaultPerform.getCurrentPerfectTime() ,8);

        //getMaxTime
        assertEquals(defaultPerform.getMaxTime(), 10);

        //getCurrentBriefingTime
        assertEquals(defaultPerform.getCurrentBriefingCount(), 4);

    }

    @Test
    void getNextLeftDay(){
        assertEquals(defaultPerform.getNextLeftDay(), new LocalDate(2020,7, 28
        ));
    }

    @Test
    void isNowBriefing(){
        assertEquals(defaultPerform.isNowBriefing(), true);
    }

}