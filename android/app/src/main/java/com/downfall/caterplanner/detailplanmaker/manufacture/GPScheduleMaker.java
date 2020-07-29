package com.downfall.caterplanner.detailplanmaker.manufacture;

import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class GPScheduleMaker {

    public Task[] make(Node root) throws Exception {

        List<Task> tasks = new ArrayList<>();
        Stack<Node> dfs = new Stack<>();

        dfs.add(root);

        while (!dfs.isEmpty()) {
            Node current = dfs.pop();

            for (Node successor : current.getSuccessors()) {
                if(((Goal) successor.getData()).isClear())
                    continue;

                tasks.add(makeTask(successor.getKey(), current.getKey()));
                dfs.add(successor);
            }
        }

        return tasks.toArray(new Task[tasks.size()]);
    }

    private Task makeTask(int detailPlankey, int previousDetailPlanKey) {
        return Task.builder()
                .goalId(detailPlankey)
                .performId(previousDetailPlanKey)
                .build();
    }
}
