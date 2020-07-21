import React from 'react'
import {Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DetailPlanBar from '../../molecule/DetailPlanBar';

export default function DetailPlanCreate({detailPlanTreeStore,  navigation}){
    
    const data = detailPlanTreeStore.currentbottomViewData;
    const constructor = detailPlanTreeStore.currentConstructorState;

    return (
        <ScrollView>
            {
                data.map((element) => {
                    const goal = detailPlanTreeStore.getDetailPlan(element.key);
                   
                    return <DetailPlanBar 
                    detailPlan={detailPlan} 
                    successorHead={element.successorHead} 
                    nextClick={() => detailPlanTreeStore.changeActiveShowKey(element.successorHead)}
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
                            detailPlanTreeStore.insertDetailPlan(constructor.key, goal) :
                            detailPlanTreeStore.successorDetailPlan(constructor.key, goal);
                        }
                    })
                }}
            />
        </ScrollView>
    )
}


