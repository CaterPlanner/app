package com.downfall.caterplanner.rest.model;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Task {

    private long purposeId;
    private int detailPlanKey;
    private int previousDetailPlanKey;

    private Perform perform;

    public Task(long purposeId, int detailPlanKey, int previousDetailPlanKey) {
        this.purposeId = purposeId;
        this.detailPlanKey = detailPlanKey;
        this.previousDetailPlanKey = previousDetailPlanKey;
    }

    public static Task valueOf(ReadableMap data) throws Exception{
        return Task.builder()
                .purposeId(data.hasKey("headerId") ? data.getInt("headerId") : null)
                .detailPlanKey(data.getInt("goalId"))
                .previousDetailPlanKey(data.hasKey("previousDetailPlanKey") ? data.getInt("previousDetailPlanKey") : null)
                .build();
    }

    public static WritableMap parseWritableMap(Task purpose){
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("headerId", (int)purpose.getPurposeId());
        writableMap.putInt("goalId", purpose.getDetailPlanKey());
        writableMap.putInt("previousDetailPlanKey", purpose.getPreviousDetailPlanKey());
        return writableMap;
    }


}
