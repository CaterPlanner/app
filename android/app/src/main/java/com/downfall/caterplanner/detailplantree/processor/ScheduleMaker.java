package com.downfall.caterplanner.detailplantree.processor;


import com.downfall.caterplanner.common.Type;
import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.common.Schedule;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.util.NodeSearcher;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class ScheduleMaker implements WritableArrayMaker<Node[]>{

    @Override
    public WritableArray make(Node[] data) {

        Schedule[] schedules = new Schedule[data.length];

        for(int i = 0; i < schedules.length; i++){
            Node current = data[i];
            schedules[i] = new Schedule(
                    current.getData(),
                    NodeSearcher.dfs(current , element -> element.getType() == Type.P && element != current,
                            (stack, element) -> {
                                for(Node child : element.getChildren()) {
                                    if(!child.getData().isEnd())
                                        stack.add(child);
                                }
                                for(Node successor : element.getSuccessors()) {
                                    stack.add(successor);
                                }
                            })
            );

        }

        WritableArray result = Arguments.createArray();
        for (Schedule schedule: schedules) {
            result.pushMap(scheduleToWriteMap(schedule));
        }
        return result;
    }

    private WritableMap scheduleToWriteMap(Schedule schedule){
        WritableMap map = Arguments.createMap();
        putPlanData(map, schedule.getData());
        WritableArray predecessorList = Arguments.createArray();
        for(Node previous : schedule.getPrevious()){
            WritableMap previousMap = Arguments.createMap();
            putPlanData(previousMap, previous.getData());
            predecessorList.pushMap(previousMap);
        }
        map.putArray("predecessors", predecessorList);

        return map;
    }

    private void putPlanData(WritableMap map , DetailPlan data){
        map.putString("key", String.valueOf(data.getKey()));
        map.putString("type", data.getType().name());
        map.putBoolean("isEnd", data.isEnd());
    }
}
