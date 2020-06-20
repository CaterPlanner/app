package com.downfall.caterplanner.detailplantree.processor;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.util.Pair;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class BottomViewDataMaker implements WritableMapMaker<Node> {

    @Override
    public WritableMap make(Node parent) {

        WritableMap result = Arguments.createMap();
        List<Pair<Integer, Integer>> keyIndexList = new ArrayList<>();

        Stack<Node> stack = new Stack<>();
        stack.push(parent);

        WritableArray brotherGroups = Arguments.createArray();

        int currentIndex = 0;
        while(!stack.isEmpty()){
            Node element = stack.pop();

            WritableArray brotherGroup = Arguments.createArray();

            for(Node child : element.getChildren()){
                WritableMap brother = Arguments.createMap();

                brother.putString("key", String.valueOf(child.getKey()));
                brother.putString("successorHead", String.valueOf(child.getSuccessors().length != 0 ? child.getSuccessors()[0].getKey() : null));

                keyIndexList.add(new Pair<>(child.getKey(), currentIndex));
                brotherGroup.pushMap(brother);
                stack.push(child);
            }
            brotherGroups.pushArray(brotherGroup);
            currentIndex++;
        }

        result.putArray("brotherGroups", brotherGroups);

        WritableMap pathMap = Arguments.createMap();

        for(Pair<Integer, Integer> pair : keyIndexList){
            pathMap.putString(String.valueOf(pair.getKey()), String.valueOf(pair.getValue()));
        }

        result.putMap("path", pathMap);

        return result;
    }


}
