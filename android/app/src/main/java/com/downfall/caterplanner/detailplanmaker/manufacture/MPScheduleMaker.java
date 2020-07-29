package com.downfall.caterplanner.detailplanmaker.manufacture;


import com.downfall.caterplanner.detailplanmaker.algorithm.Type;
import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.downfall.caterplanner.detailplanmaker.util.NodeSearcher;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;

@Deprecated
class MPSchedule {
    private DetailPlan data;
    private List<Node> previous;

    public MPSchedule(DetailPlan data, List<Node> previous) {
        this.data = data;
        this.previous = previous;
    }

    public DetailPlan getData() {
        return data;
    }

    public List<Node> getPrevious() {
        return previous;
    }
}

@Deprecated
public class MPScheduleMaker extends BaseScheduleMaker<Node[]>{

    @Override
    public WritableArray make(Node[] data) {

        MPSchedule[] MPSchedules = new MPSchedule[data.length];

        for (int i = 0; i < MPSchedules.length; i++) {
            Node current = data[i];

            Node hasPrevConstructor = current;
            while (hasPrevConstructor.getConstructorRelationType() == 0 && hasPrevConstructor.getConstructor().getType() != Type.R) {
                hasPrevConstructor = hasPrevConstructor.getConstructor();
            }

            final Node targetConstructor = hasPrevConstructor.getConstructor();

            MPSchedules[i] = new MPSchedule(current.getData(),
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
        for (MPSchedule MPSchedule : MPSchedules) {
            result.pushMap(scheduleToWriteMap(MPSchedule));
        }
        return result;
    }

    private WritableMap scheduleToWriteMap(MPSchedule MPSchedule){
        WritableMap map = Arguments.createMap();
        putPlanData(map, MPSchedule.getData());
        WritableArray predecessorList = Arguments.createArray();
        for(Node previous : MPSchedule.getPrevious()){
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
