package com.downfall.caterplanner;

import java.util.HashMap;
import java.util.Map;

public class SingletonContainer {

    public static Map<Class, Object> container = new HashMap<>();

    public static <T>  T get(Class<T> key){
        T t = (T) container.get(key);
        if(t == null)
            throw new RuntimeException();
        return t;
    }

    public static <T> void register(Class<T> key, T object){
        container.put(key, object);
    }

}
