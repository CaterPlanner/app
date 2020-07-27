package com.downfall.caterplanner.common;

import androidx.annotation.Nullable;

import com.downfall.caterplanner.scheduler.Type;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import lombok.Getter;

public class Task {

    @Getter
    private long key;
    private String cycle;

    private Type type;
    private int[] param;

    public Task(long key, String cycle) {
        this.key = key;
        this.cycle = cycle;
    }

    public void translate(){
        String piece[] = cycle.split(" ");
        type = Type.findByValue(piece[0]);

        param = new int[piece.length - 1];
        for(int i = 1; i < piece.length; i++)
            param[i] = Integer.parseInt(piece[i - 1]);

    }

    public Type getType() {
        if(type == null)
            throw new RuntimeException("Please cycle translate first.");
        return type;
    }

    public int[] getParam() {
        if(param == null)
            throw new RuntimeException("Please cycle translate first.");
        return param;
    }


    public String getCycleText() {
        return cycle;
    }

    public static Task valueOf(ReadableMap map){
        return new Task(map.getInt("key"), map.getString("cycle"));
    }

    public static WritableMap parseWritableMap(Task task){
        WritableMap result = Arguments.createMap();
        result.putInt("key", (int) task.getKey());
        result.putString("cycle", task.getCycleText());
        return result;
    }


}
