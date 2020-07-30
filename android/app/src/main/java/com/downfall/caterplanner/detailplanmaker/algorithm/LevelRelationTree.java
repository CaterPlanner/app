package com.downfall.caterplanner.detailplanmaker.algorithm;

import java.util.List;

//goal level 유지에만 집중
public class LevelRelationTree {

    private NodeList nodeList;
    private List<Level> levelList;

    public static Builder builder() {return new Builder();}

    public LevelRelationTree(){
        this.nodeList = new NodeList();
    }

    public Node select(int key) {return nodeList.get(key);}

    public void insert(int level, Node node){
        if(levelList.size() < level) {
            throw new RuntimeException("가능한 인덱스 범위를 벗어났습니다.");
        }else if(levelList.size() == level){
          levelList.add(new Level(level));
        }
        levelList.get(level).addNode(node);
    }

    public void delete(int key){
        Node node = select(key);

        int nodeLevel = node.getLevel();
        Level level = levelList.get(nodeLevel);
        level.removeNode(node);

        if(level.isEmpty()){
            for(int i = nodeLevel + 1; i < levelList.size(); i++){
                levelList.get(i).setLevel(levelList.get(i).getLevel() - 1);
            }
            levelList.remove(level.getLevel());
        }

    }

    public Node[] getAllNode(){
        return this.nodeList.getAll();
    }

    public static class Builder{

    }

}
