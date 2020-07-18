package com.downfall.caterplanner.scheduler;

import com.downfall.caterplanner.common.Task;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SchedulerManager {

    List<Integer> activityObjectionIDList;
    Map<Integer, Scheduler> schedulers;

    public SchedulerManager(){
        this.schedulers = new HashMap<>();
    }

    public void addScheduler(int objectionKey, Scheduler scheduler){
        schedulers.put(objectionKey, scheduler);
        activityObjectionIDList.add(objectionKey);
    }

    public void removeScheduler(int objectionKey){
        this.schedulers.remove(objectionKey);
        activityObjectionIDList.remove(objectionKey);
    }

    public void pass(int objectionKey, int goalKey){
        Scheduler s = schedulers.get(objectionKey);
        s.pass(goalKey);
        if(s.isFinish())
            removeScheduler(objectionKey);
    }

    public List<Integer> getActivityObjectionIDList() {
        return activityObjectionIDList;
    }

    public void getSchedulers(int objectionKey){
        schedulers.get(objectionKey);
    }


    public boolean isResting(){
        return schedulers.isEmpty();
    }

}
