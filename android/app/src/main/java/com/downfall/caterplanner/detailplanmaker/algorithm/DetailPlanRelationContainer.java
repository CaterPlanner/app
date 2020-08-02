package com.downfall.caterplanner.detailplanmaker.algorithm;

import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.swmansion.rnscreens.ScreenStackHeaderSubview;

import java.util.ArrayList;
import java.util.List;

//goal level 유지에만 집중
public class DetailPlanRelationContainer {

    private IndexList<Node> goals;
    private IndexList<Node> performs;

    private IndexList<Level> levelList;

    public static Builder builder() {return new Builder();}

    public DetailPlanRelationContainer(){
        this(new IndexList(), new IndexList(), new IndexList());
    }

    private DetailPlanRelationContainer(IndexList<Node> goals, IndexList<Level> levelList, IndexList<Node> performs){
        this.goals = goals;
        this.levelList = levelList;
    }

    public Node select(int id, PlanType type){
        switch (type){
            case G:
                return goals.get(id);
            case P:
                return performs.get(id);
        }
        return null;
    }

    public void insert(int constructorKey, Node node, PlanType type){
        switch (type){
            case G:
                if(levelList.size() < constructorKey){
                    if(levelList.size() < constructorKey) {
                        throw new RuntimeException("가능한 인덱스 범위를 벗어났습니다.");
                    }else if(levelList.size() == constructorKey){
                        levelList.add(new Level(constructorKey));
                    }
                    Level level = levelList.get(constructorKey);
                    node.setConstructor(level);
                    level.addNode(node);
                }
                break;
            case P:
                Node goalNode = select(constructorKey, PlanType.G);
                node.setConstructor(goalNode);
                goalNode.addChild(node);
                break;
        }
    }

    public void delete(int id, PlanType type){
        Node node = select(id, type);
        switch (type){
            case G:
                Level level = (Level) node.getConstructor();
                level.removeNode(node);

                if(level.isEmpty()){
                    levelList.remove(level.getKey());
                }

                goals.remove(node.getKey());

                for(Node child : node.getChildren()){
                    performs.remove(child.getKey());
                }

                break;
            case P:
                Node goalNode = (Node) node.getConstructor();
                goalNode.removeChild(node);

                performs.remove(node.getKey());
                break;
        }
    }


    public Level[] getAllLevel(){
        return this.levelList.getAll();
    }

    public Node[] getAllNodes() {return this.goals.getAll();}

    public static class Builder{

        public DetailPlanRelationContainer build(DetailPlans detailPlans){
            List<Goal> entryData =  detailPlans.getEntryData();
            Node[] nodes = new Node[entryData.size()];

            IndexList<Level> levelList = new IndexList<>();
            ArrayList<Node> performs = new ArrayList<>();

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


                for(int j = 0; j < goal.getPerforms().size(); j++){
                    Node performNode = new Node(goal.getPerforms().get(j));
                    nodes[i].addChild(performNode);
                    performs.add(performNode);
                }

                nodes[i] = new Node(entryData.get(i));
            }

            if(!levelList.isComplete())
                throw new RuntimeException();

            return new DetailPlanRelationContainer(new IndexList<>(nodes), levelList, new IndexList<>(performs.toArray(new Node[performs.size()])));
        }
    }

}
