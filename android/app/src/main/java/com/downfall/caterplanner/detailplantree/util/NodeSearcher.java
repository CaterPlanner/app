package com.downfall.caterplanner.detailplantree.util;


import com.downfall.caterplanner.detailplantree.algorithm.Node;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class NodeSearcher {

    public static Node[] dfs(Node root, IsElementMatch<Node> match, InsertElementForStack<Node> addDo){
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

        return result.toArray(new Node[result.size()]);
    }

    @FunctionalInterface
    public interface InsertElementForStack<T> {
        void play(Stack<T> stack, Node element);
    }

    @FunctionalInterface
    public interface IsElementMatch<T> {
        boolean isMatch(T element);
    }

}

