package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Data
public class Purpose implements BriefingStatizable {

    @NonNull private long id;
    private String authorName;
    private Long authorId;
    private String groupName;
    private Long groupId;

    @NonNull private String name;
    @NonNull private String description;
    @NonNull private String imageUrl;
    @NonNull private int disclosureScope;
    private LocalDate startAt;
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

    public Purpose(long id, String authorName, Long authorId, String groupName, Long groupId, String name, String description, String imageUrl, int disclosureScope, LocalDate startAt, LocalDate decimalDay, Long detailPlanHeaderId) {
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

    public Purpose(long id, String authorName, Long authorId, String groupName, Long groupId, String name, String description, String imageUrl, int disclosureScope, LocalDate startAt, LocalDate decimalDay, Long detailPlanHeaderId, StatisticsDetailPlan[] detailPlans) {
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
        return new Purpose(
                data.getInt("id"),
                data.hasKey("authorName") ?  data.getString("authorName") : null,
                data.hasKey("authorId") ? Long.valueOf(data.getInt("authorId")) : null,
                data.hasKey("groupName") ? data.getString("groupName") : null,
                data.hasKey("groupId") ? Long.valueOf(data.getInt("groupId")) : null,
                data.getString("name"),
                data.getString("description"),
                data.getString("imageUrl"),
                data.getInt("disclosureScope"),
                data.hasKey("startAt") ? LocalDate.parse(data.getString("startAt"), DateTimeFormatter.ISO_DATE) : null,
                data.hasKey("decimalDay") ? LocalDate.parse(data.getString("decimalDay"), DateTimeFormatter.ISO_DATE) : null,
                data.hasKey("detailPlanHeaderId") ? Long.valueOf(data.getInt("detailPlanHeaderId")) : null
        );
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
        writableMap.putString("startAt", purpose.getStartAt().toString());
        writableMap.putString("decimalDay", purpose.getDecimalDay().toString());
        writableMap.putInt("detailPlanHeaderId", purpose.getDetailPlanHeaderId().intValue());
        return writableMap;
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
        private LocalDate startAt;
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

        public PurposeBuilder startAt(LocalDate startAt) {
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
