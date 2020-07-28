package com.downfall.caterplanner.common.model;

import com.downfall.caterplanner.util.DateUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Task {

    private long headerId;
    private int detailPlanKey;
    private int previousDetailPlanKey;

    private Perform perform;

    public Task(long headerId, int detailPlanKey, int previousDetailPlanKey) {
        this.headerId = headerId;
        this.detailPlanKey = detailPlanKey;
        this.previousDetailPlanKey = previousDetailPlanKey;
    }

    public static Task valueOf(ReadableMap data) throws Exception{
        return Task.builder()
                .headerId(data.getInt("headerId"))
                .detailPlanKey(data.getInt("detailPlanKey"))
                .previousDetailPlanKey(data.hasKey("previousDetailPlanKey") ? data.getInt("previousDetailPlanKey") : null)
                .build();
    }

    public static WritableMap parseWritableMap(Task purpose){
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("headerId", (int)purpose.getHeaderId());
        writableMap.putInt("detailPlanKey", purpose.getDetailPlanKey());
        writableMap.putInt("previousDetailPlanKey", purpose.getPreviousDetailPlanKey());
        return writableMap;
    }


}
