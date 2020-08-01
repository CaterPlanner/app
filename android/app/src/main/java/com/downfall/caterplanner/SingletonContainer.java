package com.downfall.caterplanner;

import android.content.Context;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
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

            SQLiteHelper helper = new SQLiteHelper(context, 1);
            BriefingRepository briefingRepository = new BriefingRepository(helper);
            DetailPlanHeaderRepository detailPlanHeaderRepository = new DetailPlanHeaderRepository(helper);
            GoalRepository goalRepository = new GoalRepository(helper);
            PerformRepository performRepository = new PerformRepository(helper);
            PurposeRepository purposeRepository = new PurposeRepository(helper);

            DetailPlansService detailPlansService = new DetailPlansService(
                    helper,
                    goalRepository,
                    performRepository,
                    briefingRepository,
                    detailPlanHeaderRepository
            );

            PurposeService purposeService = new PurposeService(
                    helper,
                    purposeRepository,
                    detailPlansService,
                    briefingRepository,
                    goalRepository
            );

            register(SQLiteHelper.class, helper);
            register(BriefingRepository.class, briefingRepository);
            register(DetailPlanHeaderRepository.class, detailPlanHeaderRepository);
            register(GoalRepository.class, goalRepository);
            register(PerformRepository.class, performRepository);
            register(PurposeRepository.class, purposeRepository);
            register(DetailPlansService.class, detailPlansService);
            register(PurposeService.class, purposeService);

        }
    }

}
