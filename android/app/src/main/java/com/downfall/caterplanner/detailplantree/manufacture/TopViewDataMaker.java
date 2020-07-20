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
            boolean hasNext;

            public Space(int key, int pos){
                this.key = key;
                this.pos = pos;
            }

            public void setHasNext(boolean hasNext) {
                this.hasNext = hasNext;
            }
        }

        class SucessorLevel{
            int level;
            int floor;
            List<Space> elements;

            public SucessorLevel(int level, int floor) {
                this.level = level;
                this.floor = floor; //항상 다음에 추가될 층(위치)를 가지고 있음
                this.elements = new ArrayList<>();
            }
        } //단계에 따른 정보를 갖고 있음

        List<SucessorLevel> levelArray = new ArrayList<>();

        Stack<Node> stack = new Stack<>();

        Node[] firstChildren = root.getChildren();

        for(int i = firstChildren.length - 1;  i >= 0; i--){
            stack.push(firstChildren[i]);
        }
        //후에는 next로만 할 것이기 때문에 미리 root의 자식들을 init

        while(!stack.isEmpty()){
            Node element = stack.pop();
            Node[] successors = null;

            int level = getLevel(element, root);
            
            if (level - 1 >= levelArray.size())
                levelArray.add(new SucessorLevel(level, 0));
            //새로운 단계가 발견되었을때 공간 추가

            Space space = new Space(element.getKey(), levelArray.get(level - 1).floor);

            levelArray.get(level - 1).elements.add(space);
            //선택된 레벨 층에 새로운 요소 추가

            int updateFloor = ++levelArray.get(level - 1).floor;
            //floor update 값

            for (int i = level - 1; i >= 0; i--)
                levelArray.get(i).floor = updateFloor;
            //뒷 레벨도 앞 레벨 floor 영향을 받으므로 update

            successors = element.getSuccessors();

            if(successors.length == 0){
                if(level >= levelArray.size())
                    levelArray.add(new SucessorLevel(level + 1, 0));
                levelArray.get(level).floor++;
                //자신의 위치에  다음레벨에 요소가 없다하더라도 다음 형제의 다음레벨 요소는 자신의 위치에 다음레벨 요소에 아래이므로 floor를 업데이트 해준다.
            }else{
                space.setHasNext(true);
                for(int i = successors.length - 1; i>=0; i--)
                    stack.push(successors[i]);
                //위 -> 아래 방향으로 추가되야 하므로 거꾸로 stack에 삽입
            }
        }

        WritableArray result = Arguments.createArray();



        for(SucessorLevel level : levelArray){

            if(level.elements.size() == 0) continue;

            WritableMap levelMap = Arguments.createMap();
            levelMap.putInt("level", level.level);
            WritableArray elementArray = Arguments.createArray();
            for(Space space : level.elements){
                WritableMap posMap = Arguments.createMap();
                posMap.putInt("key", space.key);
                posMap.putInt("pos", space.pos);
                posMap.putBoolean("hasNext", space.hasNext);
                elementArray.pushMap(posMap);
            }
            levelMap.putArray("elements", elementArray);
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
