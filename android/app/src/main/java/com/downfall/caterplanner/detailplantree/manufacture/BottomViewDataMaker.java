package com.downfall.caterplanner.detailplantree.manufacture;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.util.Pair;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

@Deprecated
public class BottomViewDataMaker implements WritableMapMaker<Node> {

    //TODO: 코드중복되는 부분이 있으므로 나중에 청소할것
    @Override
    public WritableMap make(Node parent) {

        WritableMap result = Arguments.createMap();
        List<Pair<Integer, Integer>> keyIndexList = new ArrayList<>();

        Stack<Node> stack = new Stack<>();

        WritableArray brotherGroups = Arguments.createArray();

        int currentIndex = 0;

        WritableArray firstbrotherGroup = Arguments.createArray();

        for(Node child : parent.getChildren()) {
            WritableMap brother = Arguments.createMap();

            brother.putInt("key", child.getKey());

            if(child.getSuccessors().length != 0){
                brother.putInt("successorHead", child.getSuccessors()[0].getKey());
            }

            keyIndexList.add(new Pair<>(child.getKey(), currentIndex));
            firstbrotherGroup.pushMap(brother);

            stack.push(child);
        }

        brotherGroups.pushArray(firstbrotherGroup);

        currentIndex++;

        while(!stack.isEmpty()){
            Node element = stack.pop();

            WritableArray brotherGroup = Arguments.createArray();

            for(Node successor : element.getSuccessors()){
                WritableMap brother = Arguments.createMap();

                brother.putInt("key", successor.getKey());
                if(successor.getSuccessors().length != 0){
                    brother.putInt("successorHead", successor.getSuccessors()[0].getKey());
                }

                keyIndexList.add(new Pair<>(successor.getKey(), currentIndex));
                brotherGroup.pushMap(brother);
                stack.push(successor);
            }

            if(brotherGroup.size() != 0) {
                brotherGroups.pushArray(brotherGroup);
                currentIndex++;
            }
        }

        result.putArray("brotherGroups", brotherGroups);

        WritableMap pathMap = Arguments.createMap();

        for(Pair<Integer, Integer> pair : keyIndexList){
            pathMap.putInt(String.valueOf(pair.getKey()), pair.getValue());
        }

        result.putMap("path", pathMap);

        return result;
    }


}
