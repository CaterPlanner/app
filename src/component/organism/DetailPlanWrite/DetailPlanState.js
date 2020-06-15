import React from 'react'
import {View,  ScrollView} from 'react-native'
import PlanIcon from '../../atom/button/DetailPlanIcon'
import {observer} from 'mobx-react';
import useStores from '../../../mobX/helper/useStores'


const WIDTH_INTERVAL = 200;
const HEIGHT_INTERVAL = 200;

const DetailPlanState = observer(() => {
    const {detailPlanStore} = useStores();
    const data = detailPlanStore.currentTopViewData;
    return(
        <ScrollView horizontal={true} style={{flex:1}}>
            {
                data.map((level, index) => {
                    return(
                        <View style={{position :'relative', left: index * WIDTH_INTERVAL}}>
                            {
                                level.map((element) => {
                                    let detailPlan = detailPlanStore.getDetailPlan(element.key);
                                    return (
                                        <View style={{position :'relative', top: element.pos * WIDTH_INTERVAL}}>
                                            <PlanIcon text={detailPlan.name} color={detailPlan.color} 
                                            onClick={() => detailPlanStore.changeActiveShowKey(detailPlan.key)}/>    
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </ScrollView>
    )
});

export default DetailPlanState;