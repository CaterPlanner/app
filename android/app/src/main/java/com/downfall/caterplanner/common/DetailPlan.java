package com.downfall.caterplanner.common;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DetailPlan {

	private String key;
	private String name;
	private Type type; //'M' , 'P'
	private LocalDate startDate;
	private LocalDate endDate;
	private String color;
	private String cycle;
	private int stat; //0 : 진행중, 1 : 성공 , 2: 실패 , 3: 루트

	public DetailPlan(){
		this.stat = 3;
	}

	public DetailPlan(String key, String name, Type type, LocalDate startDate, LocalDate endDate, String color, String cycle, int stat) {
		this.key = key;
		this.name = name;
		this.type = type;
		this.startDate = startDate;
		this.endDate = endDate;
		this.color = color;
		this.cycle = cycle;
		this.stat = stat;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getCycle() {
		return cycle;
	}

	public void setCycle(String cycle) {
		this.cycle = cycle;
	}

	public int getStat() {
		return stat;
	}

	public void setStat(int stat) {
		this.stat = stat;
	}

	public boolean isEnd() {
		return stat > 0;
	}

	public void modify(DetailPlan copy){
		this.name = copy.getName();
		this.color = copy.getColor();
		this.startDate = copy.getStartDate();
		this.endDate = copy.getEndDate();
		this.cycle = copy.getCycle();
		this.stat = copy.getStat();
	}

	public static DetailPlan valueOf(ReadableMap data) throws Exception{
		String type = data.getString("type");
		int stat = data.getInt("stat");


		if(!(type.equals("M") || type.equals("P")))
			throw new Exception("DetailPlan:type is not valid");
		if(stat < 0 || stat > 2)
			throw new Exception("DetailPlan:stat is not valid");

		return new DetailPlan(
				data.getString("key"),
				data.getString("name"),
				Type.valueOf(type),
				LocalDate.parse(data.getString("startDate"), DateTimeFormatter.ISO_DATE),
				LocalDate.parse(data.getString("endDate"), DateTimeFormatter.ISO_DATE),
				data.getString("color"),
				data.getString("cycle"),
				data.getInt("stat"));
	}

	public static WritableMap parseReadableMap(DetailPlan plan) throws Exception{
		WritableMap detailPlanMap = Arguments.createMap();
		detailPlanMap.putString("key", plan.getKey());
		detailPlanMap.putString("name", plan.getName());
		detailPlanMap.putString("type", plan.getType().name());
		detailPlanMap.putString("startDate", plan.getStartDate().toString());
		detailPlanMap.putString("endDate", plan.getEndDate().toString());
		detailPlanMap.putString("color", plan.getColor());
		detailPlanMap.putString("cycle", plan.getCycle());
		detailPlanMap.putInt("stat", plan.getStat());
		return detailPlanMap;
	}

}
