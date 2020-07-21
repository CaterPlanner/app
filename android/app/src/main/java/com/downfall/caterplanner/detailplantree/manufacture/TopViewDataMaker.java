package com.downfall.caterplanner.detailplantree.manufacture;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;


public class TopViewDataMaker implements WritableArrayMaker<Node> {

    @Override
    public WritableArray make(Node root){

        if(root.getType() != Type.R)
            throw new RuntimeException("only root node start");

        class Space {
            int key;
            int pos;

            public Space(int key, int pos) {
                this.key = key;
                this.pos = pos;
            }

        }

        class FloorLevel {
            int currentPos;
            List<Space> elements;

            public FloorLevel() {
                this.currentPos = 0; //항상 다음에 추가될 층(위치)를 가지고 있음
                this.elements = new ArrayList<>();
            }
        } //단계에 따른 정보를 갖고 있음


        List<FloorLevel> floorLevelList = new ArrayList<>();

        Stack<Node> stack = new Stack<>();

        Node[] firstChildren = root.getChildren();

        for(int i = firstChildren.length - 1;  i >= 0; i--){
            stack.push(firstChildren[i]);
        }
        //후에는 next로만 할 것이기 때문에 미리 root의 자식들을 init

        int previousFloorArrayIndex = 0;

        while(!stack.isEmpty()){
            Node element = stack.pop();
            FloorLevel floorLevel;

            if(element.getConstructor().getChildren()[0] == element){
                floorLevel = floorLevelList.get(previousFloorArrayIndex);
            }else{
                floorLevel = new FloorLevel();
                floorLevelList.add(floorLevel);
                previousFloorArrayIndex = floorLevelList.size() - 1;
            }

            floorLevel.currentPos++;
            floorLevel.elements.add(new Space(element.getKey(), floorLevel.currentPos));

            Node[] successors = element.getSuccessors();

            for(int i = successors.length - 1;  i >= 0; i--){
                stack.push(successors[i]);
            }

        }

        WritableArray result = Arguments.createArray();

        for(FloorLevel level : floorLevelList){

            WritableMap levelMap = Arguments.createMap();
            WritableArray elementArray = Arguments.createArray();
            for(Space space : level.elements){
                WritableMap spaceMap = Arguments.createMap();
                spaceMap.putInt("key", space.key);
                spaceMap.putInt("pos", space.pos);
                elementArray.pushMap(spaceMap);
            }
            levelMap.putArray("elements", elementArray);
            result.pushMap(levelMap);
        }

        return result;
    }


}
