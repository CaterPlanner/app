package com.downfall.caterplanner.detailplantree.manufacture;

import com.facebook.react.bridge.WritableArray;

public interface WritableArrayMaker<T> {
    WritableArray make(T data) throws Exception;
}
