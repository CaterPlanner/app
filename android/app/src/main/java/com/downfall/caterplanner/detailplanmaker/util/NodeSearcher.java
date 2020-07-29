package com.downfall.caterplanner.detailplanmaker.util;


import com.downfall.caterplanner.detailplanmaker.algorithm.Node;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class NodeSearcher {

    public static List<Node> dfs(Node root, IsElementMatch<Node> match, InsertElementForStack<Node> addDo){
        List<Node> result = new ArrayList<>();

        Stack<Node> stack = new Stack<>();
        stack.push(root);

        while(!stack.isEmpty()){
            Node element = stack.pop();

            if(match.isMatch(element)){
                result.add(element);
            }

            addDo.play(stack, element);
        }

        return result;
    }

    @FunctionalInterface
    public interface InsertElementForStack<T> {
        void play(Stack<T> stack, T element);
    }


}

