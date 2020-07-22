package com.downfall.caterplanner.common;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Arrays;

public class Schedule {
    private Task data;
    private int previousKey;
    private Task[] perform;

    public Schedule(Task data, int previousKey, Task[] perform) {
        this.data = data;
        this.previousKey = previousKey;
        this.perform = perform;
    }

    public Schedule(DetailPlan detailPlan, int previousKey, DetailPlan[] perform){
        this(new Task(detailPlan.getKey(), detailPlan.getCycle()), previousKey,
                Arrays.stream(perform)
                        .map(p -> new Task(p.getKey(), p.getCycle()))
                        .toArray(size -> new Task[size]));
    }

    public Task getData() {
        return data;
    }

    public int getDataKey(){
        return data.getKey();
    }

    public int getPreviousKey() {
        return previousKey;
    }

    public Task[] getPerform() {
        return perform;
    }

    public static Schedule valueOf(ReadableMap map){
        Task data = Task.valueOf(map.getMap("data"));
        int previousKey = map.getInt("previousKey");
        ReadableArray readablePerfom = map.getArray("perform");
        Task[] perform = new Task[readablePerfom.size()];
        for(int i = 0;  i < perform.length; i++){
            perform[i] = Task.valueOf(readablePerfom.getMap(i));
        }
        return new Schedule(data, previousKey, perform);
    }

    public static WritableMap parseWritableMap(Schedule schedule){
        WritableMap result = Arguments.createMap();

        result.putMap("data", Task.parseWritableMap(schedule.getData()));
        result.putInt("previousKey", schedule.getPreviousKey());

        WritableArray writablePerfom = Arguments.createArray();
        for(Task t : schedule.getPerform()){
            writablePerfom.pushMap(Task.parseWritableMap(t));
        }

        return result;
    }
}
