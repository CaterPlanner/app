package com.downfall.caterplanner.detailplantree.manufacture;

import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;

public class EntryDataMaker implements WritableArrayMaker<Node[]>{

    @Override
    public WritableArray make(Node[] nodes) throws Exception{
        WritableArray result = Arguments.createArray();
        for(Node node : nodes) {
            result.pushMap(DetailPlan.parseWritableMap(node.getData()));
        }
        return result;
    }
}
