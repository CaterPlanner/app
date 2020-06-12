package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.detailplantree.dto.PlanData;

import java.util.Arrays;
import java.util.Comparator;



public class MPOrderRelationTree {

	private Node root;

	public MPOrderRelationTree() {
		this.root = new Node(new PlanData());
	}

	public MPOrderRelationTree(PlanData[] initData) throws Exception{
		this.root = new Node(new PlanData());

		Arrays.sort(initData, new Comparator<PlanData>() {
			@Override
			public int compare(PlanData o1, PlanData o2) {
				return (o1.getKey().length() - o2.getKey().length());
			}
		});

		for(PlanData plan : initData){
			String key = plan.getKey();
			Node node = new Node(plan);
			if(key.length() == 1){
				insert(null, node);
			}else if(key.charAt(key.length() - 2) != ':'){
				insert(key.substring(0, key.length() - 1), node);
			}else{
				next(key.substring(0, key.length() - 2), node);
			}
		}
	}

	public Node getRoot() {
		return root;
	}

	public Node select(String key) {

		Node next = root;

		if(key != null) {
			char[] pieces = key.toCharArray();

			for(int i = 0; i < pieces.length; i++) {

				int index;
				Node[] nodes;

				if(pieces[i] == ':') {
					index = pieces[++i] - 65;
					nodes = next.getSuccessors();
				}else {
					index = pieces[i] - 65;
					nodes = next.getChildren();
				}

				if(nodes.length < index + 1) {
					next = null;
					break;
				}

				next = nodes[index];

			}
		}
		return key != null && !next.getKey().equals(key) ? null : next;

	}

	public Node insert(String key, Node node) throws Exception {
		if(node.getConstructor() != null)
			throw new Exception("Must be a new node.");

		Node parent = select(key);

		if(parent == null)
			throw new Exception("Parent node that does not exist.");
		else if(parent.getType() == Type.P)
			throw new Exception("Nodes cannot be added.");



		parent.addChild(node);


		return node;

	}

	public Node delete(String key) throws Exception {

		Node node = select(key);

		if(node == null)
			throw new Exception("Node does not exist.");

		Node constructor = node.getConstructor();

		if(node.getNaturalKey().contains(":")) {
			constructor.removeNext(node);



		}else {
			constructor.removeChild(node);
		}

		return node;
	}

	public Node next(String key, Node node) throws Exception {

		Node previous = select(key);

		if(previous == null)
			throw new Exception("Previous node that does not exist.");



		previous.addNext(node);


		return node;
	}




}
