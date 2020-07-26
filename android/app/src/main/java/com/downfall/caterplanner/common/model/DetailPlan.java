package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DetailPlan {

	private long key;
	private long headerId;
	private int constructorKey;
	private int constructorRelationType; //0 : parent , 1: presuccssor
	private String name;
	private Type type; //'M' , 'P'
	private LocalDate startDate;
	private LocalDate endDate;
	private Integer hopeAchievement;
	private String color;
	private String cycle;
	private int stat; //0 : 진행중, 1 : 성공 , 2: 실패 , 3: 루트

	public DetailPlan(long key, long headerId, int constructorKey, int constructorRelationType, String name, Type type, LocalDate startDate, LocalDate endDate, Integer hopeAchievement, String color, String cycle, int stat) {
		this.key = key;
		this.headerId = headerId;
		this.constructorKey = constructorKey;
		this.constructorRelationType = constructorRelationType;
		this.name = name;
		this.type = type;
		this.startDate = startDate;
		this.endDate = endDate;
		this.hopeAchievement = hopeAchievement;
		this.color = color;
		this.cycle = cycle;
		this.stat = stat;

	}

	public long getKey() {
		return key;
	}

	public void setKey(long key) {
		this.key = key;
	}

	public long getHeaderId() {
		return headerId;
	}

	public void setHeaderId(long headerId) {
		this.headerId = headerId;
	}

	public int getConstructorRelationType() {
		return constructorRelationType;
	}

	public void setConstructorRelationType(int constructorRelationType) {
		this.constructorRelationType = constructorRelationType;
	}

	public int getConstructorKey() {
		return constructorKey;
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

	public Integer getHopeAchievement() {
		return hopeAchievement;
	}

	public void setHopeAchievement(Integer hopeAchievement) {
		this.hopeAchievement = hopeAchievement;
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
		this.hopeAchievement = copy.getHopeAchievement();
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
				data.getInt("key"),
				data.hasKey("headerId") ? data.getInt("headerId") : null,
				data.getInt("constructorKey"),
				data.getInt("constructorRelationType"),
				data.getString("name"),
				Type.findByValue(type), //TODO : 수정
				LocalDate.parse(data.getString("startDate"), DateTimeFormatter.ISO_DATE),
				LocalDate.parse(data.getString("endDate"), DateTimeFormatter.ISO_DATE),
				data.hasKey("hopeAchievement") ? data.getInt("hopeAchievement") : null,
				data.getString("color"),
				data.getString("cycle"),
				stat);
	}

	public static WritableMap parseWritableMap(DetailPlan plan) throws Exception{

		WritableMap detailPlanMap = Arguments.createMap();
		detailPlanMap.putInt("key", (int) plan.getKey());
		detailPlanMap.putInt("headerId", (int) plan.getHeaderId());
		detailPlanMap.putInt("constructorKey", plan.getConstructorKey());
		detailPlanMap.putInt("constructorRelationType", plan.getConstructorRelationType());
		detailPlanMap.putString("name", plan.getName());
		detailPlanMap.putString("type", plan.getType().name());
		detailPlanMap.putString("startDate", plan.getStartDate().format(DateTimeFormatter.ISO_DATE));
		detailPlanMap.putString("endDate", plan.getEndDate().format(DateTimeFormatter.ISO_DATE));
		detailPlanMap.putInt("hopeAchievement", plan.getHopeAchievement());
		detailPlanMap.putString("color", plan.getColor());
		detailPlanMap.putString("cycle", plan.getCycle());
		detailPlanMap.putInt("stat", plan.getStat());
		return detailPlanMap;
	}

}
