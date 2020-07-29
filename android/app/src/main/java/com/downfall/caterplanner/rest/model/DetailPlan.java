package com.downfall.caterplanner.rest.model;

import com.downfall.caterplanner.detailplanmaker.algorithm.Type;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
@Deprecated
public class DetailPlan {

	private int key;
	private Long purposeId;
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

		return DetailPlan.builder()
				.key(data.getInt("key"))
				.purposeId((long) data.getInt("purposeId"))
				.constructorKey(data.getInt("constructorKey"))
				.constructorRelationType(data.getInt("constructorRelationType"))
				.name(data.getString("name"))
				.type(Type.findByValue(type))
				.startDate(DateUtil.parseToDate(data.getString("startDate")))
				.endDate(DateUtil.parseToDate(data.getString("endDate")))
				.hopeAchievement(data.hasKey("hopeAchievement") ? data.getInt("hopeAchievement") : null)
				.color(data.getString("color"))
				.cycle(data.getString("cycle"))
				.stat(stat)
				.build();
	}

	public static WritableMap parseWritableMap(DetailPlan plan) throws Exception{

		WritableMap detailPlanMap = Arguments.createMap();
		detailPlanMap.putInt("key", (int) plan.getKey());
		detailPlanMap.putInt("purposeId", plan.getPurposeId().intValue());
		detailPlanMap.putInt("constructorKey", plan.getConstructorKey());
		detailPlanMap.putInt("constructorRelationType", plan.getConstructorRelationType());
		detailPlanMap.putString("name", plan.getName());
		detailPlanMap.putString("type", plan.getType().name());
		detailPlanMap.putString("startDate", DateUtil.formatFromDate(plan.getStartDate()));
		detailPlanMap.putString("endDate", DateUtil.formatFromDate(plan.getEndDate()));
		detailPlanMap.putInt("hopeAchievement", plan.getHopeAchievement());
		detailPlanMap.putString("color", plan.getColor());
		detailPlanMap.putString("cycle", plan.getCycle());
		detailPlanMap.putInt("stat", plan.getStat());
		return detailPlanMap;
	}

}
