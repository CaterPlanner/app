package com.downfall.caterplanner.detailplantree.util;

@FunctionalInterface
public interface IsElementMatch<T> {
    boolean isMatch(T element);
}