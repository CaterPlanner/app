package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.common.model.DetailPlan;
import com.downfall.caterplanner.common.model.Goal;
import com.downfall.caterplanner.common.model.Perform;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanRepository;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;


import java.util.Arrays;

public class DetailPlansService extends BaseService {

    private DetailPlanRepository detailPlanRepository;
    private DetailPlanHeaderRepository detailPlanHeaderRepository;
    private BriefingRepository briefingRepository;

    public DetailPlansService(SQLiteHelper helper, DetailPlanRepository detailPlanRepository, DetailPlanHeaderRepository detailPlanHeaderRepository, BriefingRepository briefingRepository) {
        super(helper);

        this.detailPlanRepository = detailPlanRepository;
        this.detailPlanHeaderRepository = detailPlanHeaderRepository;
        this.briefingRepository = briefingRepository;
    }

    public long createByReact(ReadableArray readableDetailPlans, String authorName, Integer authorId, Integer baseId) throws Exception {
        db.beginTransaction();
        try{
            DetailPlan[] detailPlans = new DetailPlan[readableDetailPlans.size()];
            for(int i = 0; i < readableDetailPlans.size(); i++){
                detailPlans[i] = DetailPlan.valueOf(readableDetailPlans.getMap(i));
            }

            long detailPlanHeaderId = this.detailPlanHeaderRepository.insert(authorId, authorName, baseId);
            for(DetailPlan detailPlan : detailPlans){
                detailPlan.setHeaderId(detailPlanHeaderId);
                this.detailPlanRepository.insert(detailPlan);
            }
            db.setTransactionSuccessful();
            return detailPlanHeaderId;
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            db.endTransaction();
        }
    }

    public DetailPlan[] read(long detailPlanHeaderId){
        DetailPlan[] detailPlans = this.detailPlanRepository.selectByHeaderId(detailPlanHeaderId);
        for(DetailPlan detailPlan : detailPlans){
            switch (detailPlan.getType()){
                case G:
                    ((Goal)detailPlan).setPerforms(
                            Arrays.stream(detailPlans).map(
                                    element -> element.getConstructorRelationType() == 0 && element.getConstructorKey() == detailPlan.getKey()
                            ).toArray(size -> new Perform[size]));
                    break;
                case P:
                    ((Perform) detailPlan).setBriefings(
                            this.briefingRepository.selectByHeaderIdAndDetailPlanKey(detailPlanHeaderId, detailPlan.getKey())
                    );
                    break;
            }
        }
        return detailPlans;
    }

    public WritableArray readByReact(long detailPlanHeaderId) throws Exception {
        WritableArray result = Arguments.createArray();
        DetailPlan[] detailPlans = read(detailPlanHeaderId);

        for(DetailPlan d : detailPlans){
            result.pushMap(DetailPlan.parseWritableMap(d));
        }
        return result;
    }

    public void updateByReact(Integer detailPlanHeaderId, ReadableArray readableDetailPlans) throws Exception {
        db.beginTransaction();
        try{
            DetailPlan[] detailPlans = new DetailPlan[readableDetailPlans.size()];
            for(int i = 0; i < readableDetailPlans.size(); i++){
                detailPlans[i] = DetailPlan.valueOf(readableDetailPlans.getMap(i));
            }

            detailPlanRepository.deleteByHeaderId(detailPlanHeaderId);

            for(DetailPlan detailPlan : detailPlans){
                detailPlan.setHeaderId(detailPlanHeaderId.longValue());
                this.detailPlanRepository.insert(detailPlan);
            }

        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }finally {
            db.endTransaction();
        }
    }

    public void deleteByReact(Integer detailPlanHeaderId){
        this.detailPlanHeaderRepository.deleteById(detailPlanHeaderId);
    }


}
