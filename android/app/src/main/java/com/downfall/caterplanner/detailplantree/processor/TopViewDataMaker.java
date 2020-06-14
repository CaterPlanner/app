package com.downfall.caterplanner.detailplantree.processor;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.common.DetailPlan;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;


public class TopViewDataMaker implements WritableArrayMaker {



    @Override
    public WritableArray make(Node parent){

        class Position{
            String key;
            int pos;

            public Position(String key, int pos){
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
        stack.push(parent);

        while(!stack.isEmpty()){
            Node element = stack.pop();
            int level = -1;
            Node[] successors = null;

            if(element != parent) {
                level = (element.getKey().length() + 1) / 2;
                if (level - 1 >= levelArray.size())
                    levelArray.add(new SucessorLevel(level, 0));

                levelArray.get(level - 1).elements.add(new Position(element.getKey(), levelArray.get(level - 1).floor));
                int updateFloor = ++levelArray.get(level - 1).floor;

                for (int i = level - 1; i >= 0; i--)
                    levelArray.get(i).floor = updateFloor;

            }
            successors = element.getSuccessors();

            if(successors == null && level != -1){
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
            WritableMap levelMap = Arguments.createMap();
            levelMap.putInt("level", level.level);
            WritableArray elementArray = Arguments.createArray();
            for(Position pos : level.elements){
                WritableMap posMap = Arguments.createMap();
                posMap.putString("key", pos.key);
                posMap.putInt("pos", pos.pos);
                elementArray.pushMap(posMap);
            }
            levelMap.putArray("element", elementArray);
        }

        return result;
    }

}
