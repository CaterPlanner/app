package com.downfall.caterplanner.rest.service;

import android.os.Build;

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


import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
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
     * detailPlan을 등록하고자 할때 사용
     * 등록하는 경우 종류 : 사용자가 새롭게 만듬, 외부에서 가져옴
     * 사용자가 새롭게 가져오는 경우에는 baseId가 null이고 author관련 데이터는 자신이 됨
     * 외부에서 가져오는 경우 baseId가 null값이 아님 단, baseId는 detailplanheader에 fk가 아님(자기 참조) 서버쪽에 detailPlan id 값이 될것임
     *
     * @param readableDetailPlans
     * @param authorName
     * @param authorId
     * @param baseId
     * @returnd detailPlanHeader key
     * @throws Exception
     */
    public long createByReact(ReadableArray readableDetailPlans, String authorName, Integer authorId, Integer baseId) throws Exception {
        return SQLiteHelper.transaction(db, () -> {
            DetailPlan[] detailPlans = new DetailPlan[readableDetailPlans.size()];
            for(int i = 0; i < readableDetailPlans.size(); i++){
                detailPlans[i] = DetailPlan.valueOf(readableDetailPlans.getMap(i));
            }

            long detailPlanHeaderId = this.detailPlanHeaderRepository.insert(authorId, authorName, baseId);
            for(DetailPlan detailPlan : detailPlans){
                detailPlan.setHeaderId(detailPlanHeaderId);
                this.detailPlanRepository.insert(detailPlan);
            }
            return detailPlanHeaderId;
        });

    }

    /**
     * react native가 아닌 외부 service에서 detailPlans를 가져올때 사용
     *
     * @param detailPlanHeaderId
     * @return
     * @throws ParseException
     */
    public DetailPlan[] read(long detailPlanHeaderId) throws ParseException {
        DetailPlan[] detailPlans = this.detailPlanRepository.selectByHeaderId(detailPlanHeaderId);
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
                            this.briefingRepository.selectByHeaderIdAndDetailPlanKey(detailPlanHeaderId, detailPlan.getKey())
                    );
                    break;
            }
        }
        return detailPlans;
    }

    /**
     *
     * react native에서 어느 detailPlans 데이터만 가져오고자 할때 사용
     * (서비스 내에선 잘 사용이 안될것이라 예상)
     *
     * @param detailPlanHeaderId
     * @return
     * @throws Exception
     */
    @Deprecated
    public WritableArray readByReact(long detailPlanHeaderId) throws Exception {
        WritableArray result = Arguments.createArray();
        DetailPlan[] detailPlans = read(detailPlanHeaderId);

        for(DetailPlan d : detailPlans){
            result.pushMap(DetailPlan.parseWritableMap(d));
        }
        return result;
    }

    /**
     *
     * react native에서 detailplans 수정 작업이 일어난 경우 사용
     * 해당 서비스에서는 detailplans를 통으로 관리하므로 하나라도 수정되어도
     * 현재 데이터를 모두 삭제후 새로운 데이터를 집어넣음 (서로 데이터들은 복잡한 관계를 맺고 잇으므로 update로 하나하나 바꿔주기엔 무리가 있음 안전성을 위해)
     *
     * @param detailPlanHeaderId
     * @param readableDetailPlans
     * @throws Exception
     */
    public void updateByReact(Integer detailPlanHeaderId, ReadableArray readableDetailPlans) throws Exception {
        SQLiteHelper.transaction(db, () -> {
            DetailPlan[] detailPlans = new DetailPlan[readableDetailPlans.size()];
            for(int i = 0; i < readableDetailPlans.size(); i++){
                detailPlans[i] = DetailPlan.valueOf(readableDetailPlans.getMap(i));
            }

            detailPlanRepository.deleteByHeaderId(detailPlanHeaderId);

            for(DetailPlan detailPlan : detailPlans){
                detailPlan.setHeaderId(detailPlanHeaderId.longValue());
                this.detailPlanRepository.insert(detailPlan);
            }
        });
    }

    /**
     * react native에서 detailplans를 삭제하고자 할때 사용
     *
     * @param detailPlanHeaderId
     */
    public void deleteByReact(Integer detailPlanHeaderId){
        this.detailPlanHeaderRepository.deleteById(detailPlanHeaderId);
    }



    //setClear

}
