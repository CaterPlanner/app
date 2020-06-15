import React from 'react'
import { observer } from 'mobx-react';
import useStores from '../../../mobX/helper/useStores'
import { ScrollView } from 'react-native-gesture-handler';
import DetailPlanBar from '../../molecule/DetailPlanBar';

const DetailPlanCreate = observer(() => {

    const {detailPlanStroe} = useStores();
    const data = detailPlanStroe.currentbottomViewData;

    return (
        <ScrollView>
            {
                data.map((detailPlan) => {
                    return <DetailPlanBar detailPlan={detailPlan} nextClick={detailPlanStroe.changeActiveShowKey} />
                })
            }
        </ScrollView>
    )
})

export default DetailPlanCreate;


