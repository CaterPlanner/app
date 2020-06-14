package com.downfall.caterplanner.detailplantree.algorithm;

import java.util.ArrayList;
import java.util.List;

import com.downfall.caterplanner.common.Type;
import com.downfall.caterplanner.common.DetailPlan;


public class Node {

	private transient String key;

	private Node constructor;
	private List<Node> children;
	private List<Node> successors;
	private DetailPlan data;


	public Node(DetailPlan data){
		this.children = new ArrayList<Node>();
		this.successors = new ArrayList<Node>();
		this.data = data;

		if(data.getKey() != null){
			this.key = data.getKey().length() == 1 ? data.getKey() : data.getKey().substring(data.getKey().length() -
					(data.getKey().charAt(data.getKey().length() - 2) == ':' ? 2 : 1));
		}

		this.data.setKey(getKey());
	}

	public String getKey() {
		return getConstructor() == null ? "" : getConstructor().getKey() + key;
	}

	public String getNaturalKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
		this.data.setKey(getKey());
	}

	public Type getType() {
		return data.getType();
	}

	public DetailPlan getData(){
		return data;
	}

	public Node[] getChildren() {
		return children.toArray(new Node[children.size()]);
	}

	public Node[] getSuccessors() {
		return successors.toArray(new Node[successors.size()]);
	}

	public boolean isChild(Node node) {
		return children.contains(node);
	}

	public Node getConstructor() {
		return constructor;
	}

	public void setConstructor(Node constructor) {
		this.constructor = constructor;
	}

	public void removeChild(Node child) {
		if(this.children.remove(child));
		rearrangeChildIndexKeys(children);
	}

	public void removeNext(Node next) {
		if(this.successors.remove(next));
		rearrangeChildIndexKeys(children);

	}
	public void addChild(Node node) {
		if(node.getNaturalKey() == null && getType() != Type.P) {
			node.setKey(String.valueOf((char) (this.children.size() + 65)));

		}
		node.setConstructor(this);
		this.children.add(node);
	}

	public void addNext(Node node) {
		if(node.getNaturalKey() == null) {
			node.setKey(":" + String.valueOf((char) (this.successors.size() + 65)));

		}
		node.setConstructor(this);

		this.successors.add(node);
	}

	public boolean isSuccessor(Node node) {

		List<Integer> nextPos = new ArrayList<Integer>();
		String node_consturctorKey = node.getKey().charAt(node.getKey().length() - 2) !=  ':' ?
				node.getConstructor().getKey() : node.getKey();
		String my_consturctorKey = getConstructor().getKey();

		for(int i = 0; i < node_consturctorKey.length(); i++) {
			if(node_consturctorKey.charAt(i) == ':')
				nextPos.add(i);
		}

		if(nextPos.size() == 0)
			return false;

		boolean result = false;

		for(int i = 0; i < nextPos.size(); i++) {
			String prefix = node_consturctorKey.substring(0, nextPos.get(i));
			if(my_consturctorKey.equals(prefix)) {
				continue;
			}else if(my_consturctorKey.startsWith(prefix)) {
				break;
			}else {
				return false;
			}
		}
		return !my_consturctorKey.startsWith(node_consturctorKey.substring(0, nextPos.get(nextPos.size() - 1) + 2));
	}


	private void rearrangeChildIndexKeys(List<Node> list) {
		if(getType() == Type.P) return;

		for(int i = 0; i < list.size(); i++)
			list.get(i).setKey(list.get(i).getNaturalKey().substring(0, list.get(i).getNaturalKey().length() - 1) +
					(char)(i + 65));

	}


}