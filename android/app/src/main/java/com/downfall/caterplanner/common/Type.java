package com.downfall.caterplanner.common;

public enum Type {
	
	M("M") , P("P"), R("R");

	private String value;
	
	Type(String value){
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
