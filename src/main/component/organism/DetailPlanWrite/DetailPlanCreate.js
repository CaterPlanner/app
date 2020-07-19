import React from '../../page/screen/ObjectionWrite/node_modules/react'
import {Button} from '../../page/screen/ObjectionWrite/node_modules/react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DetailPlanBar from '../../molecule/DetailPlanBar';
import {createEmptyDetailPlan} from '../../../rest/model/DetailPlan'

export default function DetailPlanCreate({detailPlanStore,  navigation}){
    
    const data = detailPlanStore.currentbottomViewData;
    const constructor = detailPlanStore.currentConstructorState;

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
            <Button 
                title="+"
                onPress={() => {constructor.relationType == 0 ? 
                    detailPlanStore.insertDetailPlan(constructor.key, createEmptyDetailPlan(constructor.key, constructor.relationType)) :
                    detailPlanStore.successorDetailPlan(constructor.key, createEmptyDetailPlan(constructor.key, constructor.relationType))
                }}
            />
        </ScrollView>
    )
}


