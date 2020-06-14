package com.downfall.caterplanner.detailplantree.service;


import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public interface CaterPlannerDetailPlanTreeService {

   void create();

   WritableMap get(String key) throws Exception;

   void insert(String parentKey, ReadableMap data) throws Exception;

   WritableMap mapBottomViewData(String activeParentKey) throws Exception;

   WritableArray mapTopViewData(String activeParentKey) throws Exception;

   void build(ReadableArray param) throws Exception;

   void delete(String key) throws Exception;

   WritableArray schedules() throws Exception;

   void successor(String previousKey, ReadableMap data) throws Exception;

   void modify(String key, ReadableMap param) throws Exception;

   WritableArray entry() throws Exception;
}
