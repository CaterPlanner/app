package com.downfall.caterplanner.detailplanmaker.util;

@FunctionalInterface
public interface IsElementMatch<T> {
    boolean isMatch(T element);
}