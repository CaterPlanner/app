package com.downfall.caterplanner.common;

import com.downfall.caterplanner.common.model.DetailPlan;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class Schedule {

    @Getter
    private Tasks data;
    private int previousKey;
    @Getter
    private Tasks[] perform;

    public Schedule(DetailPlan detailPlan, int previousKey, DetailPlan[] perform){
        this(new Tasks(detailPlan.getKey(), detailPlan.getCycle()), previousKey,
                Arrays.stream(perform)
                        .map(p -> new Tasks(p.getKey(), p.getCycle()))
                        .toArray(size -> new Tasks[size]));
    }

    public long getDataKey(){
        return data.getKey();
    }

    public long getPreviousKey() {
        return previousKey;
    }

    public static Schedule valueOf(ReadableMap map){
        Tasks data = Tasks.valueOf(map.getMap("data"));
        int previousKey = map.getInt("previousKey");
        ReadableArray readablePerfom = map.getArray("perform");
        Tasks[] perform = new Tasks[readablePerfom.size()];
        for(int i = 0;  i < perform.length; i++){
            perform[i] = Tasks.valueOf(readablePerfom.getMap(i));
        }
        return new Schedule(data, previousKey, perform);
    }

    public static WritableMap parseWritableMap(Schedule schedule){
        WritableMap result = Arguments.createMap();

        result.putMap("data", Tasks.parseWritableMap(schedule.getData()));
        result.putInt("previousKey", (int) schedule.getPreviousKey());

        WritableArray writablePerfom = Arguments.createArray();
        for(Tasks t : schedule.getPerform()){
            writablePerfom.pushMap(Tasks.parseWritableMap(t));
        }

        return result;
    }
}
