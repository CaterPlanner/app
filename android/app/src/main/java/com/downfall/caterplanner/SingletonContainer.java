package com.downfall.caterplanner;

import android.content.Context;

import com.downfall.caterplanner.rest.db.SQLiteManager;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PerformRepository;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.downfall.caterplanner.rest.service.DetailPlansService;
import com.downfall.caterplanner.rest.service.PurposeService;

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

    public static class Helper{
        public static void init(Context context){
            if(container.size() != 0)
                return;

            SQLiteManager.init(context);

            BriefingRepository briefingRepository = new BriefingRepository();
            GoalRepository goalRepository = new GoalRepository();
            PerformRepository performRepository = new PerformRepository();
            PurposeRepository purposeRepository = new PurposeRepository();

            DetailPlansService detailPlansService = new DetailPlansService(
                    goalRepository,
                    performRepository,
                    briefingRepository
            );

            PurposeService purposeService = new PurposeService(
                    purposeRepository,
                    detailPlansService,
                    briefingRepository,
                    goalRepository
            );

            register(BriefingRepository.class, briefingRepository);
            register(GoalRepository.class, goalRepository);
            register(PerformRepository.class, performRepository);
            register(PurposeRepository.class, purposeRepository);
            register(DetailPlansService.class, detailPlansService);
            register(PurposeService.class, purposeService);

        }
    }

}
