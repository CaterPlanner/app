package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Period;
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

        //TODAY
//        briefings.add(
//                Briefing.builder()
//                        .headerId(0L)
//                        .detailPlanKey(2)
//                        .createAt(new DateTime(2020, 7, 28))
//                        .score(0).build()
//        );
        defaultPerform.setBriefings(briefings.toArray(new Briefing[briefings.size()]));

    }



    @Test
    void cycle(){
        assertEquals(defaultPerform.getCycleType(), 'W');
        assertEquals(defaultPerform.getCycleParams().length, 2);

        //getCurrentPerfectTime
        assertEquals(defaultPerform.getCurrentPerfectTime() ,7);

        //getMaxTime
        assertEquals(defaultPerform.getMaxTime(), 10);

        //getCurrentBriefingTime
        assertEquals(defaultPerform.getCurrentBriefingCount(), 4);

    }

    @Test
    void getNextLeftDay(){
        assertEquals(defaultPerform.getNextLeftDay(), new LocalDate(2020,7, 27
        ));
    }

    @Test
    void isNowBriefing(){
        assertEquals(defaultPerform.isNowBriefing(), true);
    }

}