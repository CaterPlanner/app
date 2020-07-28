package com.downfall.caterplanner.common;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import lombok.Getter;
//task 클리어 처리는 scheduler에서 하지 않음
//scehduler는 그냥 task  리스트만 보고 알림을 줘야하는 지 안줘야하는지만 구별하여 알림
public class Tasks {

    @Getter
    private long key;
    private String cycle;

    private Type type;
    private int[] param;

    public Tasks(long key, String cycle) {
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

    public static Tasks valueOf(ReadableMap map){
        return new Tasks(map.getInt("key"), map.getString("cycle"));
    }

    public static WritableMap parseWritableMap(Tasks tasks){
        WritableMap result = Arguments.createMap();
        result.putInt("key", (int) tasks.getKey());
        result.putString("cycle", tasks.getCycleText());
        return result;
    }


}
