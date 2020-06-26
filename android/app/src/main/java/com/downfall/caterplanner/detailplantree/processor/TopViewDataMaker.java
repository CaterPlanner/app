package com.downfall.caterplanner.detailplantree.processor;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;


public class TopViewDataMaker implements WritableArrayMaker<Node> {

    @Override
    public WritableArray make(Node parent){

        class Position{
            int key;
            int pos;

            public Position(int key, int pos){
                this.key = key;
                this.pos = pos;
            }
        }

        class SucessorLevel{
            int level;
            int floor;
            List<Position> elements;

            public SucessorLevel(int level, int floor) {
                this.level = level;
                this.floor = floor;
                this.elements = new ArrayList<>();
            }
        }

        List<SucessorLevel> levelArray = new ArrayList<>();

        Stack<Node> stack = new Stack<>();

        Node[] firstChildren = parent.getChildren();

        for(int i = firstChildren.length - 1;  i >= 0; i--){
            stack.push(firstChildren[i]);
        }


        while(!stack.isEmpty()){
            Node element = stack.pop();
            Node[] successors = null;

            int level = getLevel(element, parent);
            
            if (level - 1 >= levelArray.size())
                levelArray.add(new SucessorLevel(level, 0));

            levelArray.get(level - 1).elements.add(new Position(element.getKey(), levelArray.get(level - 1).floor));
            int updateFloor = ++levelArray.get(level - 1).floor;

            for (int i = level - 1; i >= 0; i--)
                levelArray.get(i).floor = updateFloor;

            successors = element.getSuccessors();

            if(successors.length == 0){
                if(level >= levelArray.size())
                    levelArray.add(new SucessorLevel(level + 1, 0));
                levelArray.get(level).floor++;
            }else{
                for(int i = successors.length - 1; i>=0; i--)
                    stack.push(successors[i]);
            }
        }

        WritableArray result = Arguments.createArray();



        for(SucessorLevel level : levelArray){

            if(level.elements.size() == 0) continue;

            WritableMap levelMap = Arguments.createMap();
            levelMap.putInt("level", level.level);
            WritableArray elementArray = Arguments.createArray();
            for(Position pos : level.elements){
                WritableMap posMap = Arguments.createMap();
                posMap.putInt("key", pos.key);
                posMap.putInt("pos", pos.pos);
                elementArray.pushMap(posMap);
            }
            levelMap.putArray("element", elementArray);
            result.pushMap(levelMap);
        }

        return result;
    }

    private int getLevel(Node element, Node parent) {
        int level = 0;
        while(element != parent){
            level++;
            element = element.getConstructor();
        }
        return level;
    }

}
