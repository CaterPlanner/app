package com.downfall.caterplanner.detailplantree.processor;

import com.downfall.caterplanner.common.DetailPlan;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class EntryDataMaker{

    public WritableArray make(Node[] nodes) throws Exception{
        WritableArray result = Arguments.createArray();
        for(Node node : nodes) {
            result.pushMap(DetailPlan.parseReadableMap(node.getData()));
        }
        return result;
    }
}
