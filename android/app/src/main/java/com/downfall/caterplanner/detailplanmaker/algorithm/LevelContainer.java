package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;

import java.util.List;

//goal level 유지에만 집중
public class LevelContainer {

    private IndexList<Node> nodeList;
    private IndexList<Level> levelList;

    public static Builder builder() {return new Builder();}

    public LevelContainer(){
        this(new IndexList(), new IndexList());
    }

    private LevelContainer(IndexList<Node> nodeList, IndexList<Level> levelList){
        this.nodeList = nodeList;
        this.levelList = levelList;
    }

    public Node select(int key) {return (Node) nodeList.get(key);}

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
           levelList.remove(level.getKey());
        }

    }

    public Level[] getAllLevel(){
        return this.levelList.getAll();
    }

    public Node[] getAllNodes() {return this.nodeList.getAll();}

    public static class Builder{

        public LevelContainer build(DetailPlans detailPlans){
            List<Goal> entryData =  detailPlans.getEntryData();
            Node[] nodes = new Node[entryData.size()];

            IndexList<Level> levelList = new IndexList();
            //level 어떻게 처리?

            for(int i = 0; i < nodes.length; i++){
                Goal goal = entryData.get(i);
                nodes[i] = new Node(goal);
                if(!levelList.contain(goal.getLevel())){
                    Level level = new Level(goal.getLevel());
                    level.addNode(nodes[i]);
                    levelList.insert(level.getKey(), level);
                }else{
                    levelList.get(goal.getLevel()).addNode(nodes[i]);
                }

                Node[] children = new Node[goal.getPerforms().size()];
                for(int j = 0; j < children.length; j++){
                    children[j] = new Node(goal.getPerforms().get(j));
                }

                nodes[i] = new Node(entryData.get(i), new IndexList<Node>(children));
            }

            if(!levelList.isComplete())
                throw new RuntimeException();

            return new LevelContainer(new IndexList<>(nodes), levelList);
        }
    }

}
