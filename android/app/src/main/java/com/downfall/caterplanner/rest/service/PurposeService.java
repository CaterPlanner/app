package com.downfall.caterplanner.rest.service;

import com.downfall.caterplanner.common.model.Perform;
import com.downfall.caterplanner.common.model.Purpose;
import com.downfall.caterplanner.common.model.StatisticsDetailPlan;
import com.downfall.caterplanner.detailplantree.algorithm.Type;
import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.text.ParseException;

public class PurposeService extends BaseService {

    private PurposeRepository purposeRepository;
    private DetailPlansService detailPlansService;

    public PurposeService(SQLiteHelper helper, PurposeRepository purposeRepository, DetailPlansService detailPlansService) {
        super(helper);
        this.purposeRepository = purposeRepository;
        this.detailPlansService = detailPlansService;
    }

    /**
     * Purpose 데이터만 생성하고 할때 사용 (detailPlans X)
     *
     * @param purpose
     * @return
     * @throws Exception
     */
    public Long createByReact(ReadableMap purpose) throws Exception {
        return purposeRepository.insert(Purpose.valueOf(purpose));
    }

    /**
     * Purpose 등록시 자신이 만든 detailPlans도 동시에 등록하고자 할때 사용
     *
     * @param readablePurpose
     * @param readableDetailPlans
     * @return
     * @throws Exception
     */
    public Long createByReact(ReadableMap readablePurpose, ReadableArray readableDetailPlans) throws Exception{
        return createByReact(readablePurpose, readableDetailPlans, null);
    }

    /**
     *
     * Purpose 등록시 타 유저가 만든 detailPlans도 동시에 등록하고자 할때 사용
     *
     * @param readablePurpose
     * @param readableDetailPlans
     * @param baseId
     * @return
     * @throws Exception
     */
    public Long createByReact(ReadableMap readablePurpose, ReadableArray readableDetailPlans, Integer baseId) throws Exception{
        return SQLiteHelper.transaction(db, () -> {
            Purpose purpose = Purpose.valueOf(readablePurpose);
            Long detailPlanHeaderId = null;
            if(readableDetailPlans != null){
                detailPlanHeaderId = this.detailPlansService.createByReact(readableDetailPlans, purpose.getAuthorName(), purpose.getAuthorId().intValue(), baseId);
            }
            purpose.setDetailPlanHeaderId(detailPlanHeaderId);
            Long id = purposeRepository.insert(purpose);
            db.setTransactionSuccessful();
            return id;
        });
    }

    private Purpose read(long id) throws ParseException {
        Purpose purpose = purposeRepository.selectById(id);
        StatisticsDetailPlan[] detailPlans = (StatisticsDetailPlan[]) this.detailPlansService.read(purpose.getDetailPlanHeaderId());
        purpose.setDetailPlans(detailPlans);
        return purpose;
    }

    public WritableMap readByReact(Integer id) throws ParseException {
        return writableCard(read(id));
    }

    public WritableArray readAllByReact() throws ParseException {
        Purpose[] purposes = this.purposeRepository.selectByStatIsActive();
        WritableArray result = Arguments.createArray();
        for(Purpose purpose : purposes){
            result.pushMap(writableCard(purpose));
        }
        return result;
    }

    public void updateByReact(Integer id, ReadableMap purpose) throws Exception {
        this.purposeRepository.updatePurposeDate(id, Purpose.valueOf(purpose));
    }

    public void deleteByReact(Integer id) throws Exception{
        SQLiteHelper.transaction(db, () -> {
            Purpose purpose = this.purposeRepository.selectById(id);
            if(purpose == null)
                throw new Exception();

            this.purposeRepository.deleteById(id);
            this.detailPlansService.deleteByReact(purpose.getDetailPlanHeaderId().intValue());
        });
    }

    private WritableMap writableCard(Purpose purpose) throws ParseException {
        WritableMap writablePurpose = Purpose.parseWritableMap(purpose);

        StatisticsDetailPlan[] detailPlans;

        if(!purpose.isStatizable()){
            detailPlans = (StatisticsDetailPlan[]) this.detailPlansService.read(purpose.getDetailPlanHeaderId());
            purpose.setDetailPlans(detailPlans);
        }else{
            detailPlans = purpose.getDetailPlans();
        }

        writablePurpose.putDouble("progress", purpose.progress());
        writablePurpose.putDouble("achieve", purpose.achieve());
        writablePurpose.putInt("leftDay", purpose.getLeftDay());

        WritableArray writableActivePerforms = Arguments.createArray();
        for(StatisticsDetailPlan detailPlan : detailPlans){
            if(detailPlan.getType() == Type.P){
                WritableMap writablePerformInfo = Arguments.createMap();
                Perform perform = (Perform) detailPlan;
                writablePerformInfo.putString("name", perform.getName());
                writablePerformInfo.putDouble("progress", perform.progress());
                writablePerformInfo.putDouble("achieve", perform.achieve());
                writablePerformInfo.putInt("nextDay", perform.getNextLeftDayCount());
                writableActivePerforms.pushMap(writablePerformInfo);
            }
        }

        writablePurpose.putArray("activePerforms", writableActivePerforms);
        return writablePurpose;
    }

}
