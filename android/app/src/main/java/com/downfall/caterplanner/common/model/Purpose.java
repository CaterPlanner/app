package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.Period;
import org.joda.time.PeriodType;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Purpose implements BriefingStatizable {

    private long id;
    private String authorName;
    private Long authorId;
    private String groupName;
    private Long groupId;

    private String name;
    private String description;
    private String imageUrl;
    private int disclosureScope;
    private LocalDateTime startAt;
    private LocalDate decimalDay;
    private Long detailPlanHeaderId;

    @Getter(AccessLevel.NONE)
    private StatisticsDetailPlan[] detailPlans;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private boolean isStatizable;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private int entryMaxTime;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private int entryCurrentBriefingCount;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private int entryCurrentPerfectTime;

    public Purpose(long id, String authorName, Long authorId, String groupName, Long groupId, String name, String description, String imageUrl, int disclosureScope, LocalDateTime startAt, LocalDate decimalDay, Long detailPlanHeaderId) {
        this.id = id;
        this.authorName = authorName;
        this.authorId = authorId;
        this.groupName = groupName;
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.disclosureScope = disclosureScope;
        this.startAt = startAt;
        this.decimalDay = decimalDay;
        this.detailPlanHeaderId = detailPlanHeaderId;

    }

    public Purpose(long id, String authorName, Long authorId, String groupName, Long groupId, String name, String description, String imageUrl, int disclosureScope, LocalDateTime startAt, LocalDate decimalDay, Long detailPlanHeaderId, StatisticsDetailPlan[] detailPlans) {
        this(id, authorName, authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, detailPlanHeaderId);
        this.detailPlans = detailPlans;
        statistion();
    }

    public static PurposeBuilder builder() {
        return new PurposeBuilder();
    }

    public void setDetailPlans(StatisticsDetailPlan[] detailPlans) {
        this.detailPlans = detailPlans;
        statistion();
    }

    @Override
    public void statistion(){
        if(this.detailPlans == null)
            throw new RuntimeException();

        this.entryMaxTime = 0;
        this.entryCurrentBriefingCount = 0;
        this.entryCurrentPerfectTime = 0;

        for(StatisticsDetailPlan detailPlan : detailPlans){
            if(detailPlan.getType() == Type.G){
                entryCurrentPerfectTime += detailPlan.getCurrentPerfectTime();
                entryCurrentBriefingCount += detailPlan.getCurrentBriefingCount();
                entryMaxTime += detailPlan.getMaxTime();
            }
        }

        this.isStatizable = true;
    }

    @Override
    public float progress() {
        if(!isStatizable)
            throw new RuntimeException();
        return Math.round(getCurrentBriefingCount() / getMaxTime()) / 100.0f;
    }

    @Override
    public float achieve() {
        if(!isStatizable)
            throw new RuntimeException();
        return Math.round(getCurrentPerfectTime() / getMaxTime()) / 100.0f;
    }

    @Override
    public int getMaxTime() {
        if(!isStatizable)
            throw new RuntimeException();
        return entryMaxTime;
    }

    @Override
    public int getCurrentPerfectTime() {
        if(!isStatizable)
            throw new RuntimeException();
        return entryCurrentPerfectTime;
    }

    @Override
    public int getCurrentBriefingCount() {
        if(!isStatizable)
            throw new RuntimeException();
        return entryCurrentBriefingCount;
    }

    public static Purpose valueOf(ReadableMap data) throws Exception{
        return Purpose.builder()
                .id(data.getInt("id"))
                .authorName(data.hasKey("authorName") ?  data.getString("authorName") : null)
                .authorId(data.hasKey("authorId") ? Long.valueOf(data.getInt("authorId")) : null)
                .groupName(data.hasKey("groupName") ? data.getString("groupName") : null)
                .groupId( data.hasKey("groupId") ? Long.valueOf(data.getInt("groupId")) : null)
                .name(data.getString("name"))
                .description(data.getString("description"))
                .imageUrl(data.getString("imageUrl"))
                .disclosureScope( data.getInt("disclosureScope"))
                .startAt(data.hasKey("startAt") ? DateUtil.parseToDateTime(data.getString("startAt")) : null)
                .decimalDay(data.hasKey("decimalDay") ? DateUtil.parseToDate(data.getString("decimalDay")) : null)
                .detailPlanHeaderId(data.hasKey("detailPlanHeaderId") ? Long.valueOf(data.getInt("detailPlanHeaderId")) : null)
                .build();
    }

    public static WritableMap parseWritableMap(Purpose purpose){
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("id", (int)purpose.getId());
        writableMap.putString("authorName", purpose.getName());
        writableMap.putInt("authorId", purpose.getAuthorId().intValue());
        writableMap.putString("groupName", purpose.getGroupName());
        writableMap.putInt("groupId", purpose.getGroupId().intValue());
        writableMap.putString("name", purpose.getName());
        writableMap.putString("description", purpose.getDescription());
        writableMap.putString("imageUrl", purpose.getImageUrl());
        writableMap.putInt("disclosureScope", purpose.getDisclosureScope());
        writableMap.putString("startAt", DateUtil.formatFromDateTime(purpose.getStartAt()));
        writableMap.putString("decimalDay", DateUtil.formatFromDate(purpose.getDecimalDay()));
        writableMap.putInt("detailPlanHeaderId", purpose.getDetailPlanHeaderId().intValue());
        return writableMap;
    }

    public int getLeftDay() {
        if(decimalDay == null)
            throw new RuntimeException();
        return new Period(LocalDate.now(), decimalDay, PeriodType.days()).getDays();
    }

    public static class PurposeBuilder {
        private long id;
        private String authorName;
        private Long authorId;
        private String groupName;
        private Long groupId;
        private String name;
        private String description;
        private String imageUrl;
        private int disclosureScope;
        private LocalDateTime startAt;
        private LocalDate decimalDay;
        private Long detailPlanHeaderId;

        PurposeBuilder() {
        }

        public PurposeBuilder id(long id) {
            this.id = id;
            return this;
        }

        public PurposeBuilder authorName(String authorName) {
            this.authorName = authorName;
            return this;
        }

        public PurposeBuilder authorId(Long authorId) {
            this.authorId = authorId;
            return this;
        }

        public PurposeBuilder groupName(String groupName) {
            this.groupName = groupName;
            return this;
        }

        public PurposeBuilder groupId(Long groupId) {
            this.groupId = groupId;
            return this;
        }

        public PurposeBuilder name(String name) {
            this.name = name;
            return this;
        }

        public PurposeBuilder description(String description) {
            this.description = description;
            return this;
        }

        public PurposeBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public PurposeBuilder disclosureScope(int disclosureScope) {
            this.disclosureScope = disclosureScope;
            return this;
        }

        public PurposeBuilder startAt(LocalDateTime startAt) {
            this.startAt = startAt;
            return this;
        }

        public PurposeBuilder decimalDay(LocalDate decimalDay) {
            this.decimalDay = decimalDay;
            return this;
        }

        public PurposeBuilder detailPlanHeaderId(Long detailPlanHeaderId) {
            this.detailPlanHeaderId = detailPlanHeaderId;
            return this;
        }

        public Purpose build() {
            return new Purpose(id, authorName, authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, detailPlanHeaderId);
        }

        public String toString() {
            return "Purpose.PurposeBuilder(id=" + this.id + ", authorName=" + this.authorName + ", authorId=" + this.authorId + ", groupName=" + this.groupName + ", groupId=" + this.groupId + ", name=" + this.name + ", description=" + this.description + ", imageUrl=" + this.imageUrl + ", disclosureScope=" + this.disclosureScope + ", startAt=" + this.startAt + ", decimalDay=" + this.decimalDay + ", detailPlanHeaderId=" + this.detailPlanHeaderId + ")";
        }
    }
}
