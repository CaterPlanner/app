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

    public static Builder builder() {return new Builder();}

    public DetailPlanRelationContainer(){
        this(new IndexList(), new IndexList());
    }

    private DetailPlanRelationContainer(IndexList<Node> goals, IndexList<Node> performs){
        this.goals = goals;
        this.performs = performs;
    }

    public Node select(int id, PlanType type){
        switch (type){
            case G:
                return goals.size() > id ? goals.get(id) : null;
            case P:
                return performs.size() > id ? performs.get(id) : null;
        }
        return null;
    }

    public void insert(int constructorKey, Node node, PlanType type){
        Node constructorNode = select(constructorKey, PlanType.G);
        switch (type){
            case G:
                if(constructorNode != null) {
                    constructorNode.addNext(node);
                }
                goals.add(node);
                break;
            case P:
                if(constructorNode != null) {
                    constructorNode.addChild(node);
                }
                performs.add(node);
                break;
        }
    }

    public void delete(int id, PlanType type){
        Node node = select(id, type);
        Node constructorNode = node.getConstructor() != null ? select(node.getConstructor().getKey(), PlanType.G) : null;

        switch (type){
            case G:
                if(constructorNode != null)
                    constructorNode.removeNext(node);

                goals.remove(node.getKey());

                for(Node child : node.getChildren()){
                    performs.remove(child.getKey());
                }

                break;
            case P:

                if(constructorNode != null){
                    constructorNode.removeChild(node);
                }

                performs.remove(node.getKey());
                break;
        }
    }

    public Node[] getAllGNodes() {return this.goals.getAll();}

    public static class Builder{

        public DetailPlanRelationContainer build(DetailPlans detailPlans){
            List<Goal> entryData =  detailPlans.getEntryData();
            Node[] nodes = new Node[entryData.size()];

            ArrayList<Node> performs = new ArrayList<>();

            //level 어떻게 처리?

            for(int i = 0; i < nodes.length; i++){
                Goal goal = entryData.get(i);
                nodes[i] = new Node(goal);

                for(int j = 0; j < goal.getPerforms().size(); j++){
                    Node performNode = new Node(goal.getPerforms().get(j));
                    nodes[i].addChild(performNode);
                    performs.add(performNode);
                }

                nodes[i] = new Node(entryData.get(i));
            }

            return new DetailPlanRelationContainer(new IndexList<>(nodes), new IndexList<>(performs.toArray(new Node[performs.size()])));
        }
    }

}
