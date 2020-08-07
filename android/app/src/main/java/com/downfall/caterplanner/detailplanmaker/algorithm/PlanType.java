package com.downfall.caterplanner.detailplanmaker.algorithm;

@Deprecated
public enum PlanType {
	
	M("M") , P("P"), R("R"), G("G");

	private String value;
	
	PlanType(String value){
		this.value = value;
	}

	public static PlanType findByValue(String value){
		for(PlanType planType : values()){
			if(planType.getValue().equals(value))
				return planType;
		}
		return null;
	}

	public String getValue() {
		return value;
	}

}
