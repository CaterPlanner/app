import React from 'react'
import {Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DetailPlanBar from '../../molecule/DetailPlanBar';
import {createEmptyDetailPlan} from '../../../model/DetailPlan'

export default function DetailPlanCreate({
    data, constructor, get, changeActiveShowKey, insert, successor,  navigation}){

    return (
        <ScrollView>
            {
                data.map((element) => {
                    const detailPlan = get(element.key);
                    console.log(detailPlan)

                    return <DetailPlanBar 
                    detailPlan={detailPlan} 
                    successorHead={element.successorHead} 
                    nextClick={() => changeActiveShowKey(element.successorHead)}
                    callPlanInsert={() => {navigation.navigate('PlanInsert', {
                        detailPlan : detailPlan
                    });}}
                    />
                })
            }
            <Button 
                title="+"
                onPress={() => {constructor.relationType == 0 ? 
                    insert(constructor.key, createEmptyDetailPlan(constructor.key, constructor.relationType)) :
                    successor(constructor.key, createEmptyDetailPlan(constructor.key, constructor.relationType))
                }}
            />
        </ScrollView>
    )
}


