package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class DetailPlan {

	@NonNull private long key;
	@NonNull private long headerId;
	@NonNull private int constructorKey;
	@NonNull private int constructorRelationType; //0 : parent , 1: presuccssor
	@NonNull private String name;
	@NonNull private Type type; //'M' , 'P'
	@NonNull private LocalDate startDate;
	@NonNull private LocalDate endDate;
	@NonNull private Integer hopeAchievement;
	@NonNull private String color;
	private String cycle;
	@NonNull private int stat; //0 : 진행중, 1 : 성공 , 2: 실패 , 3: 루트

	public static DetailPlanBuilder builder() {
		return new DetailPlanBuilder();
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

	public static class DetailPlanBuilder {
		private long key;
		private long headerId;
		private int constructorKey;
		private int constructorRelationType;
		private String name;
		private Type type;
		private LocalDate startDate;
		private LocalDate endDate;
		private Integer hopeAchievement;
		private String color;
		private String cycle;
		private int stat;

		DetailPlanBuilder() {
		}

		public DetailPlanBuilder key(long key) {
			this.key = key;
			return this;
		}

		public DetailPlanBuilder headerId(long headerId) {
			this.headerId = headerId;
			return this;
		}

		public DetailPlanBuilder constructorKey(int constructorKey) {
			this.constructorKey = constructorKey;
			return this;
		}

		public DetailPlanBuilder constructorRelationType(int constructorRelationType) {
			this.constructorRelationType = constructorRelationType;
			return this;
		}

		public DetailPlanBuilder name(String name) {
			this.name = name;
			return this;
		}

		public DetailPlanBuilder type(Type type) {
			this.type = type;
			return this;
		}

		public DetailPlanBuilder startDate(LocalDate startDate) {
			this.startDate = startDate;
			return this;
		}

		public DetailPlanBuilder endDate(LocalDate endDate) {
			this.endDate = endDate;
			return this;
		}

		public DetailPlanBuilder hopeAchievement(Integer hopeAchievement) {
			this.hopeAchievement = hopeAchievement;
			return this;
		}

		public DetailPlanBuilder color(String color) {
			this.color = color;
			return this;
		}

		public DetailPlanBuilder cycle(String cycle) {
			this.cycle = cycle;
			return this;
		}

		public DetailPlanBuilder stat(int stat) {
			this.stat = stat;
			return this;
		}

		public DetailPlan build() {
			return new DetailPlan(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, cycle, stat);
		}

		public String toString() {
			return "DetailPlan.DetailPlanBuilder(key=" + this.key + ", headerId=" + this.headerId + ", constructorKey=" + this.constructorKey + ", constructorRelationType=" + this.constructorRelationType + ", name=" + this.name + ", type=" + this.type + ", startDate=" + this.startDate + ", endDate=" + this.endDate + ", hopeAchievement=" + this.hopeAchievement + ", color=" + this.color + ", cycle=" + this.cycle + ", stat=" + this.stat + ")";
		}
	}
}
