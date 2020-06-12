package com.downfall.caterplanner.detailplantree.processor;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.dto.PlanData;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


public class ViewDataMaker implements WriteableArrayMaker{

    @Override
    public WritableArray make(Node parent){
        WritableArray result = Arguments.createArray();
        for(Node child : parent.getChildren()){
            WritableMap childMap = Arguments.createMap();
            putPlanData(childMap, child.getData());
            childMap.putArray("successors", nextListToWriteableArray(child, child.getSuccessors()));
            result.pushMap(childMap);
        }

        return result;
    }
    private void putPlanData(WritableMap map , PlanData data){
        map.putString("key", data.getKey());
        map.putString("type", data.getType());
        map.putBoolean("isEnd", data.isEnd());


    }

    private WritableArray nextListToWriteableArray(Node current, Node[] nextes){
        WritableArray nextListMap = Arguments.createArray();
        for(Node next : nextes){
            WritableMap nextMap = Arguments.createMap();
            putPlanData(nextMap, next.getData());
            nextMap.putArray("successors", nextListToWriteableArray(next, next.getSuccessors()));
            nextListMap.pushMap(nextMap);
        }
        return nextListMap.size() == 0 ? null : nextListMap;
    }
}
