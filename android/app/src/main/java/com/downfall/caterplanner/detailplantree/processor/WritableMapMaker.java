package com.downfall.caterplanner.detailplantree.processor;


import com.downfall.caterplanner.detailplantree.algorithm.Node;
import com.facebook.react.bridge.WritableMap;

public interface WritableMapMaker<T> {
    WritableMap make(T data);
}
