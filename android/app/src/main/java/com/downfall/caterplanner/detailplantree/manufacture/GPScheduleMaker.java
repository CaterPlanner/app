package com.downfall.caterplanner.detailplantree.manufacture;

import com.downfall.caterplanner.common.Schedule;
import com.downfall.caterplanner.common.Task;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class GPScheduleMaker extends BaseScheduleMaker<Node> {

    @Override
    public WritableArray make(Node root) throws Exception {

        WritableArray result = Arguments.createArray();

        List<Schedule> schedules = new ArrayList<>();

        Stack<Node> dfs = new Stack<>();
        dfs.add(root);

        while(!dfs.isEmpty()){
            Node current = dfs.pop();

            for(Node successor : current.getSuccessors()){
                Schedule schedule = new Schedule(
                        new Task(successor.getKey(), successor.getData().getCycle()),
                        current.getKey(),
                        Arrays.stream(successor.getChildren())
                                .map(n -> new Task(n.getKey(), n.getData().getCycle()))
                                .toArray(size -> new Task[size]));
                schedules.add(schedule);
                dfs.add(successor);
            }

        }

        for (Schedule s:
             schedules) {
            result.pushMap(Schedule.parseWritableMap(s));
        }

        return result;
    }
}
