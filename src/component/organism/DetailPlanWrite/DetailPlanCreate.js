import React from 'react'
import { observer } from 'mobx-react';
import useStores from '../../../mobX/helper/useStores'
import { ScrollView } from 'react-native-gesture-handler';
import DetailPlanBar from '../../molecule/DetailPlanBar';

const DetailPlanCreate = observer(({navigation}) => {

    const {detailPlanStore} = useStores();
    const data = detailPlanStore.currentbottomViewData;

    return (
        <ScrollView>
            {
                data.map((element) => {
                    const detailPlan = detailPlanStore.getDetailPlan(element.key);
                    return <DetailPlanBar 
                    detailPlan={detailPlan} 
                    successorHead={element.successorHead} 
                    nextClick={() => detailPlanStore.changeActiveShowKey(element.successorHead)}
                    callPlanInsert={() => {navigation.navigate('PlanInsert', {
                        detailPlan : detailPlan
                    });}}
                    />
                })
            }
        </ScrollView>
    )
})

export default DetailPlanCreate;


