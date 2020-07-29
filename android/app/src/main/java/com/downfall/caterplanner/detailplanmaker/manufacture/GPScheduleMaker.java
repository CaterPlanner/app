package com.downfall.caterplanner.detailplanmaker.manufacture;

import com.downfall.caterplanner.detailplanmaker.algorithm.Node;
import com.downfall.caterplanner.rest.model.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class GPScheduleMaker {

    public Task[] make(Node root) throws Exception {

        List<Task> tasks = new ArrayList<>();
        Stack<Node> dfs = new Stack<>();

        for (Node node : root.getChildren()) {
            tasks.add(makeTask(node.getKey(), 0));
            dfs.add(node);
        }

        while (!dfs.isEmpty()) {
            Node current = dfs.pop();

            for (Node successor : current.getSuccessors()) {
                tasks.add(makeTask(successor.getKey(), current.getKey()));
                dfs.add(successor);
            }
        }

        return tasks.toArray(new Task[tasks.size()]);
    }

    private Task makeTask(int detailPlankey, int previousDetailPlanKey) {
        return Task.builder()
                .detailPlanKey(detailPlankey)
                .previousDetailPlanKey(previousDetailPlanKey)
                .build();
    }
}
