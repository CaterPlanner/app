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

        for (int i = 0; i < schedules.length; i++) {
            Node current = data[i];

            Node hasPrevConstructor = current;
            while (hasPrevConstructor.getConstructorRelationType() == 0 && hasPrevConstructor.getConstructor().getType() != Type.R) {
                hasPrevConstructor = hasPrevConstructor.getConstructor();
            }

            final Node targetConstructor = hasPrevConstructor.getConstructor();

            schedules[i] = new Schedule(current.getData(),
                    targetConstructor.getKey() == 0 ? null
                            : NodeSearcher.dfs(targetConstructor,
                            element -> element.getType() == Type.P && element != current,
                            (stack, element) -> {
                                for (Node child : element.getChildren()) {
                                    if (!child.getData().isEnd())
                                        stack.add(child);
                                }
                                if (element != targetConstructor) {
                                    for (Node successor : element.getSuccessors()) {
                                        stack.add(successor);
                                    }
                                }
                            }));
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
        map.putInt("key", data.getKey());
        map.putString("type", data.getType().name());
        map.putBoolean("isEnd", data.isEnd());
    }
}
