package com.downfall.caterplanner.detailplantree.manufacture;


import com.facebook.react.bridge.WritableMap;

public interface WritableMapMaker<T> {
    WritableMap make(T data);
}
