package com.downfall.caterplanner.detailplantree.dto;

public class PlanData {

	private String key;
	private String type;
	private boolean isEnd;

	public PlanData(){
		this.isEnd = false;
	}

	public PlanData(String key, String type, boolean isEnd){
		this.key = key;
		this.type = type;
		this.isEnd = isEnd;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setEnd(boolean isEnd){
		this.isEnd = isEnd;
	}

	public boolean isEnd() {
		return isEnd;
	}

	public String getKey() {
		return key;
	}

	public String getType() {
		return type;
	}

}
