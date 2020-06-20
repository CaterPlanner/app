package com.downfall.caterplanner.detailplantree.service;


import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public interface CaterPlannerDetailPlanTreeService {

   void create();

   WritableMap get(int key) throws Exception;

   void insert(int parentKey, ReadableMap data) throws Exception;

   WritableMap mapBottomViewData(int activeParentKey) throws Exception;

   WritableArray mapTopViewData(int activeParentKey) throws Exception;

   void build(ReadableArray param) throws Exception;

   void delete(int key) throws Exception;

   WritableArray schedules() throws Exception;

   void successor(int previousKey, ReadableMap data) throws Exception;

   void modify(int key, ReadableMap param) throws Exception;

   WritableArray entry() throws Exception;
}
