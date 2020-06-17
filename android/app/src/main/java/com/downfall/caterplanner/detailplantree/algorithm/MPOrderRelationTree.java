package com.downfall.caterplanner.detailplantree.algorithm;

import com.downfall.caterplanner.common.Type;
import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.util.NodeSearcher;
import com.downfall.caterplanner.detailplantree.util.NodeUtil;

import java.util.Arrays;
import java.util.Comparator;


public class MPOrderRelationTree {

	private Node root;

	public MPOrderRelationTree() {
		this.root = new Node(new DetailPlan());
	}

	public MPOrderRelationTree(DetailPlan[] initData) throws Exception{
		this.root = new Node(new DetailPlan());

		Arrays.sort(initData, new Comparator<DetailPlan>() {
			@Override
			public int compare(DetailPlan o1, DetailPlan o2) {
				return o1.getKey().length() == o2.getKey().length() ?
						o1.getKey().charAt(o1.getKey().length() - 1) - o2.getKey().charAt(o2.getKey().length() - 1) :
						o1.getKey().length() - o2.getKey().length();
			}
		});

		for(DetailPlan plan : initData){
			System.out.println(plan.getKey());
		}
		
		System.out.println(initData.length);

		for(DetailPlan plan : initData){
			String key = plan.getKey();
			System.out.println(key + "::");
			Node node = new Node(plan);
			insert(NodeUtil.getConsturctorKey(key), node);
		}
	}

	public Node getRoot() {
		return root;
	}

	public Node[] getNodes(){
		return NodeSearcher.dfs(this.root, node -> node.getType() != Type.R,
				((stack, element) -> {
					for (Node child : element.getChildren()){
						stack.push(child);
					}
					for (Node successor : element.getSuccessors()){
						stack.push(successor);
					}
		}));
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

				System.out.println("nodes: " + nodes.length);

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

		System.out.println("KEY : " + key + " new Node key : " + node);
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
