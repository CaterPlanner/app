package com.downfall.caterplanner.rest.model;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Task {

    private long headerId;
    private int goalId;
    private int performId;

    private int previousGoalId;

    private Perform perform;
}
