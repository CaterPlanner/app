package com.downfall.caterplanner.scheduler;

import com.downfall.caterplanner.common.Schedule;
import com.downfall.caterplanner.common.Tasks;

import java.util.ArrayList;
import java.util.List;

public class Scheduler {

    private List<Schedule> schedules;
    private List<Tasks> activityList;
    private List<Schedule> waitList;

    public Scheduler(List<Schedule> schedules){
        this.schedules = schedules;


        this.activityList = new ArrayList<>();
        this.waitList = new ArrayList<>();

        for(Schedule s : schedules){
            if(s.getPreviousKey() == 0){
                activityList.add(s.getData());
            }else{
                waitList.add(s);
            }
        }
    }

    public void pass(int key){
        Schedule schedule = null;
        int index = -1;
        for(int i = 0; i < schedules.size(); i++){
            if(schedules.get(i).getDataKey() == key){
                schedule = schedules.get(i);
                index = i;
                break;
            }
        }
        if(schedule == null)
            throw new RuntimeException("Not found Schedule by key");
        if(!activityList.remove(schedule.getData()))
            throw new RuntimeException("This is not Activity Schedule");

        for(int i = 0; i < waitList.size(); i++){
            if(waitList.get(i).getPreviousKey() == schedule.getDataKey()){
                activityList.add(waitList.remove(i).getData());
                i--;
            }
        }

        schedules.remove(index);
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public List<Tasks> getActivityList() {
        return activityList;
    }


    public List<Schedule> getWaitList() {
        return waitList;
    }

    public boolean isFinish(){
        return waitList.isEmpty();
    }
}
