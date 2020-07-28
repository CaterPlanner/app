package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.rest.model.DetailPlan;
import com.downfall.caterplanner.rest.model.Goal;
import com.downfall.caterplanner.rest.model.Perform;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanRepository;
import com.facebook.react.bridge.ReadableArray;


import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

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


    /**
     * headerId와 일치하는 모든 detailPlan 들을 가져옴
     *
     * @param purposeId
     * @return
     * @throws ParseException
     */
    public DetailPlan[] read(long purposeId) throws ParseException {
        DetailPlan[] detailPlans = this.detailPlanRepository.selectByPurposeId(purposeId);
        for(DetailPlan detailPlan : detailPlans){
            switch (detailPlan.getType()){
                case G:
                    List<Perform> performs = new ArrayList<>();
                    for(DetailPlan dp2 : detailPlans){
                        if(dp2.getConstructorKey() == detailPlan.getKey() && dp2.getConstructorRelationType() == 0){
                            performs.add((Perform) dp2);
                        }
                    }
                    ((Goal)detailPlan).setPerforms(performs.toArray(new Perform[performs.size()]));
                    break;
                case P:
                    ((Perform) detailPlan).setBriefings(
                            this.briefingRepository.selectBypurposeIdAndDetailPlanKey(purposeId, detailPlan.getKey())
                    );
                    break;
            }
        }
        return detailPlans;
    }

    /**
     * detailPlan 들을 수정
     * 기존 detailPlan 데이터를 모두 삭제후 새로운 데이터를 집어넣음
     * (서로 데이터들은 복잡한 관계를 맺고 잇으므로 update로 하나하나 바꿔주기엔 무리가 있음 안전성을 위해)
     *
     * @param purposeId
     * @param r_detailPlans
     * @throws Exception
     */
    public void updateByReact(Integer purposeId, ReadableArray r_detailPlans) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            DetailPlan[] detailPlans = new DetailPlan[r_detailPlans.size()];
            for(int i = 0; i < r_detailPlans.size(); i++){
                detailPlans[i] = DetailPlan.valueOf(r_detailPlans.getMap(i));
            }

            detailPlanRepository.deleteByPurposeId(purposeId);

            for(DetailPlan detailPlan : detailPlans){
                detailPlan.setPurposeId(purposeId.longValue());
                this.detailPlanRepository.insert(detailPlan);
            }
        });
    }

    /**
     * detailPlan을 통으로 삭제
     *
     * @param detailPlanHeaderId
     */
    public void deleteByReact(Integer detailPlanHeaderId){
        this.detailPlanHeaderRepository.deleteById(detailPlanHeaderId);
    }


    //setClear

}
