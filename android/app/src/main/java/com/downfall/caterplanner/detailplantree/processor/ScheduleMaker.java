package com.downfall.caterplanner.detailplantree.processor;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;


import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.downfall.caterplanner.detailplantree.dto.PlanData;
import com.downfall.caterplanner.detailplantree.dto.Schedule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class ScheduleMaker implements WriteableArrayMaker{

    @Override
    public WritableArray make(Node root) {
        List<Node> pnodes = new ArrayList<>();

        Queue<Node> q = new LinkedList<Node>();
        q.add(root);

        while(!q.isEmpty()) {
            Node current = q.poll();

            if(current.getType() == Type.P)
                pnodes.add(current);

            for(Node child : current.getChildren()) {
                if(!child.getData().isEnd())
                    q.add(child);
            }
            for(Node next : current.getSuccessors()) {
                q.add(next);
            }
        }

        Schedule[] schedules = new Schedule[pnodes.size()];

        for(int i = 0; i < schedules.length; i++)
            schedules[i] = new Schedule(pnodes.get(i).getData());


        for(int i = 0; i < pnodes.size(); i++) {
            for(int j = 0; j < pnodes.size(); j++) {
                if(pnodes.get(i) == pnodes.get(j))
                    continue;
                if(pnodes.get(i).isSuccessor(pnodes.get(j))) {
                    schedules[j].addPrevious(pnodes.get(i).getData());
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
        for(PlanData data : schedule.getPrevious()){
            WritableMap previousMap = Arguments.createMap();
            putPlanData(previousMap, data);
            predecessorList.pushMap(previousMap);
        }
        map.putArray("predecessors", predecessorList);

        return map;
    }

    private void putPlanData(WritableMap map , PlanData data){
        map.putString("key", data.getKey());
        map.putString("type", data.getType());
        map.putBoolean("isEnd", data.isEnd());
    }
}
