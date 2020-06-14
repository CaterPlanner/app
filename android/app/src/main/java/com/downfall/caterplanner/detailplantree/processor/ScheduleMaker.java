package com.downfall.caterplanner.detailplantree.processor;


import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.common.Type;
import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.common.Schedule;
import com.downfall.caterplanner.detailplantree.util.NodeSearcher;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class ScheduleMaker implements WritableArrayMaker {

    @Override
    public WritableArray make(Node root) {

        Node[] pnodes = NodeSearcher.dfs(root, node -> node.getType() == Type.P,
                (stack, element) -> {
                    for(Node child : element.getChildren()){
                        if(!child.getData().isEnd())
                            stack.push(child);
                    }
                    for (Node next : element.getSuccessors()){
                        stack.push(next);
                    }
                });

        Schedule[] schedules = new Schedule[pnodes.length];

        for(int i = 0; i < schedules.length; i++)
            schedules[i] = new Schedule(pnodes[i].getData());


        for(int i = 0; i < pnodes.length; i++) {
            for(int j = 0; j < pnodes.length; j++) {
                if(pnodes[i] == pnodes[j])
                    continue;
                if(pnodes[i].isSuccessor(pnodes[j])) {
                    schedules[j].addPrevious(pnodes[i].getData());
                }
            }
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
        for(DetailPlan data : schedule.getPrevious()){
            WritableMap previousMap = Arguments.createMap();
            putPlanData(previousMap, data);
            predecessorList.pushMap(previousMap);
        }
        map.putArray("predecessors", predecessorList);

        return map;
    }

    private void putPlanData(WritableMap map , DetailPlan data){
        map.putString("key", data.getKey());
        map.putString("type", data.getType().name());
        map.putBoolean("isEnd", data.isEnd());
    }
}
