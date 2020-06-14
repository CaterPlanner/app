package com.downfall.caterplanner.detailplantree.processor;

import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.WritableArray;

public interface WritableArrayMaker {
    WritableArray make(Node node);
}
