package com.downfall.caterplanner.detailplantree.algorithm;

public enum Type {
	
	M("M") , P("P"), R("R"), G("G");

	private String value;
	
	Type(String value){
		this.value = value;
	}

	public static Type findByValue(String value){
		for(Type type : values()){
			if(type.getValue().equals(value))
				return type;
		}
		return null;
	}

	public String getValue() {
		return value;
	}

}