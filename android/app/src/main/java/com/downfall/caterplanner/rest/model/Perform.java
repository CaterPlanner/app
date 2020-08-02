package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.PlanType;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;
import org.joda.time.Period;
import org.joda.time.PeriodType;


import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Builder
public class Perform extends StatisticsModel implements RelationTreeEntity{

    private long headerId;
    private int goalId;
    private int id;
    private String name;
    private String cycle;

    private LocalDate startDate;
    private LocalDate endDate;

    private List<Briefing> briefings;
    private char cycleType;
    private int[] cycleParams;


    @Setter //Debug
    private LocalDate today;


    public Perform(long headerId, int goalId, int id, String name, String cycle){
        this.headerId = headerId;
        this.goalId = goalId;
        this.id = id;
        this.name = name;
        this.cycle = cycle;
        this.briefings = new ArrayList<>();
    }

    public void setDate(LocalDate startDate, LocalDate endDate){
        this.startDate = startDate;
        this.endDate = endDate;

        today = LocalDate.now();

        //cycle 분석
        char[] cyclePiece = cycle.toCharArray();
        List<Integer> t_cycleParams = new ArrayList<>();
        for(int i = 0; i < cyclePiece.length; i++){
            if(i == 0){
                cycleType = cyclePiece[0];
                continue;
            }else if(cyclePiece[i] != 32){
                t_cycleParams.add(Character.getNumericValue(cyclePiece[i]));
            }
        }

        this.cycleParams = new int[t_cycleParams.size()];
        for(int i = 0; i < cycleParams.length; i++){
            this.cycleParams[i] = t_cycleParams.get(i);
        }

        this.maxTime = getBetweenMaxBriefing(startDate, endDate, cycleType, cycleParams);
        this.currentPerfectTime = getBetweenMaxBriefing(startDate, today, cycleType, cycleParams);
    }

    public boolean isActive(){
        return today.isAfter(startDate) && today.isBefore(endDate);
    }

    @Override
    public void statistics() {
        if(this.briefings == null || startDate == null || endDate == null)
            throw new RuntimeException();

        this.currentBriefingCount = this.briefings.size();
        this.isStatizable = true;
    }


    public int getNextLeftDayCount(){
        return new Period(today, getNextLeftDay(), PeriodType.days()).getDays();
    }

    public LocalDate getNextLeftDay(){

        LocalDate nextDay = null;

        if(isNowBriefing()){
            nextDay = today;
        }else{
            switch (this.cycleType){
                case 'A':
                    nextDay = today.plusDays(1);
                    break;
                case 'W':
                    nextDay = today.plusDays(DateUtil.waitingDayOfWeekCountDay(today, cycleParams[0]));
                    for(int i = 1; i < cycleParams.length; i++){
                        if(cycleParams[i] > today.getDayOfWeek()){
                            nextDay = today.plusDays(DateUtil.waitingDayOfWeekCountDay(today, cycleParams[i]));
                            break;
                        }
                    }
                    break;
                case 'M':
                    nextDay = today.plusDays(DateUtil.waitingDayCountDay(today, cycleParams[0]));
                    for(int i = 1; i < cycleParams.length; i++){
                        if(cycleParams[i] > today.getDayOfMonth()){
                            nextDay = today.plusDays(DateUtil.waitingDayCountDay(today, cycleParams[i]));
                            break;
                        }
                    }
                    break;
            }
        }
        return nextDay;
    }

    public boolean isNowBriefing(){

        if(!getLastBriefingDay().equals(today)) {
            switch (this.cycleType) {
                case 'A':
                    return !this.getLastBriefingDay().equals(today) ? true : false;
                case 'W':
                    for (int wParam : this.cycleParams) {
                        if (wParam == today.getDayOfWeek()) {
                            return true;
                        }
                    }
                    return false;
                case 'M':
                    for (int mParam : this.cycleParams) {
                        if (mParam == today.getDayOfMonth()) {
                            return true;
                        }
                    }
                    return false;
            }
        }
        return false;
    }

    private static int getDayBriefingCountInTerm(LocalDate startDate, LocalDate endDate, int[] piece){


        int count = 0;

        if(startDate.getDayOfWeek() < endDate.getDayOfWeek()){
            for(int i = 0; i < piece.length; i++){
                if(piece[i] >= startDate.getDayOfWeek() && piece[i] <= endDate.getDayOfWeek())
                    count++;
            }
        }else{ // st 3   end 1
            for(int i = 0; i < piece.length; i++){
                if(piece[i] >= startDate.getDayOfWeek() || piece[i] <= endDate.getDayOfWeek())
                    count++;
            }
        }

        return count;
    }

    private static int getBetweenMaxBriefing(LocalDate startDate, LocalDate endDate, char cycleType, int[] pieces){

        LocalDate nextDay;

        final Period diff = new Period(startDate, endDate, PeriodType.days());

        int maxTime = 0;

        switch (cycleType){
            case 'A':
                maxTime = diff.getDays() + 1;
                break;
            case 'W':
                maxTime = diff.getDays() < 7 ? getDayBriefingCountInTerm(startDate, endDate, pieces) :
                        ((int) Math.floor(diff.getDays() / 7) * pieces.length) + getDayBriefingCountInTerm(endDate.minusDays(diff.getDays() % 7), endDate, pieces);
                break;
            case 'M':
                final int diffMonth = diff.getMonths();
                if(diffMonth == 0){
                    for(int i = 0; i < pieces.length; i++){
                        if(pieces[i] >= startDate.getDayOfMonth() && pieces[i] <= endDate.getDayOfMonth())
                            maxTime++;
                    }
                }else{
                    if(diffMonth > 2)
                        maxTime = pieces.length * (diffMonth - 2);
                    for(int i = 0; i < pieces.length; i++){
                        if(pieces[i] >= startDate.getDayOfMonth()){
                            maxTime += (pieces.length - 1) - i;
                            break;
                        }
                    }
                    for(int i = pieces.length - 1; i >=0 ; i--){
                        if(pieces[i] <= endDate.getDayOfMonth()){
                            maxTime += i + 1;
                            break;
                        }
                    }
                }
                break;
        }
        return  maxTime;
    }

    public LocalDate getLastBriefingDay(){
        return this.briefings.get(this.briefings.size()- 1).getCreateAt().toLocalDate();
    }

    public static Perform valueOf(ReadableMap data) throws ParseException {
        return Perform.builder()
                .goalId(data.getInt("goalId"))
                .id(data.getInt("id"))
                .name(data.getString("name"))
                .startDate(DateUtil.parseToDate(data.getString("startDate")))
                .endDate(DateUtil.parseToDate(data.getString("endDate")))
                .cycle(data.getString("cycle"))
                .build();
    }

    public static WritableMap parseWritableMap(Perform perform){
        WritableMap performMap = Arguments.createMap();
        performMap.putInt("goalId",  perform.getGoalId());
        performMap.putInt("id", perform.getId());
        performMap.putString("name", perform.getName());
        performMap.putString("startDate", DateUtil.formatFromDate(perform.getStartDate()));
        performMap.putString("endDate", DateUtil.formatFromDate(perform.getEndDate()));
        performMap.putString("cycle", perform.getCycle());
        return performMap;
    }

    public void modify(Perform copy) {
        this.name = copy.getName();
        this.startDate = copy.getStartDate();
        this.endDate = copy.getEndDate();
        this.cycle = copy.getCycle();
    }

    @Override
    public PlanType getType() {
        return PlanType.P;
    }
}
