import React from 'react'
import {Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DetailPlanBar from '../../molecule/DetailPlanBar';

export default function DetailPlanCreate({detailPlanStore,  navigation}){
    
    const data = detailPlanStore.currentbottomViewData;
    const constructor = detailPlanStore.currentConstructorState;

    return (
        <ScrollView>
            {
                data.map((element) => {
                    const goal = detailPlanStore.getDetailPlan(element.key);
                   
                    return <DetailPlanBar 
                    detailPlan={detailPlan} 
                    successorHead={element.successorHead} 
                    nextClick={() => detailPlanStore.changeActiveShowKey(element.successorHead)}
                    callPlanInsert={() => {navigation.navigate('GoalInsert', {
                        goal : goal
                    });
                }}
                    />
                })
            }
            <Button 
                title="+"
                onPress={() => {
                    navigation.navigate('GoalInsert', {
                        create : (goal) => {
                            constructor.relationType == 0 ? 
                            detailPlanStore.insertDetailPlan(constructor.key, goal) :
                            detailPlanStore.successorDetailPlan(constructor.key, goal);
                        }
                    })
                }}
            />
        </ScrollView>
    )
}


