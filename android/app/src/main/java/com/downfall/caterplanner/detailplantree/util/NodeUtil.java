package com.downfall.caterplanner.detailplantree.util;

public class NodeUtil {
    public static String getConsturctorKey(String key){
        if(key.length() == 1){
            return null;
        }else if(key.charAt(key.length() - 2) != ':'){
            return key.substring(0, key.length() - 1);
        }else{
            return key.substring(0, key.length() - 2);
        }
    }
}
