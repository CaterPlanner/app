package com.downfall.caterplanner.detailplantree.manufacture;

import com.downfall.caterplanner.common.Goal;
import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;

public class EntryDataMaker implements WritableArrayMaker<Node[]>{

    @Override
    public WritableArray make(Node[] nodes) throws Exception{
        WritableArray result = Arguments.createArray();
        for(Node node : nodes) {
            result.pushMap(Goal.parseWritableMap(node.getData()));
        }
        return result;
    }
}
