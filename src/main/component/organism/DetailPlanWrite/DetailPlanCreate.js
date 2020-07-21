import React from 'react'
import {Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GoalBar from '../../molecule/GoalBar';
import CommonType from '../../../util/CommonType';

export default function DetailPlanCreate({detailPlanTreeStore,  navigation}){
    
    const data = detailPlanTreeStore.currentbottomViewData;
    const activeConstructor = detailPlanTreeStore.currentActiveConstructorState;

    const goalModify = (goal) => {
        navigation.navigate('GoalInsert', {
            startType : CommonType.MODIFY,
            goal : goal,
            finish : () => {
                detailPlanTreeStore.modifyDetailPlan(goal.key, goal);
            }
        });
    }

    const goalCreate = (constructorKey, construtorRelationType) => {
        goal = new Goal();
        navigation.navigate('GoalInsert', {
            startType : CommonType.CREATE,
            goal : goal,
            finish : () =>{
                construtorRelationType == 0 ?
                detailPlanTreeStore.insertDetailPlan(constructorKey, goal) :
                detailPlanTreeStore.successorDetailPlan(constructorKey, goal);
            }
            
        });
    }

    return (
        <ScrollView>
            {
                data.map((element) => {
                    const goal = detailPlanTreeStore.getDetailPlan(element.key);
                   
                    return <GoalBar 
                    goal={goal} 
                    successorHead={element.successorHead} 
                    successor={() => detailPlanTreeStore.changeActiveShowKey(element.successorHead)}
                    remove={() => {detailPlanTreeStore.deleteDetailPlan(goalKey)}}
                    modify={goalModify}
                    create={goalCreate}
                    />
                })
            }
            <Button 
                title="+"
                style={{width : 300, height : 100}}
                onPress={() => {goalCreate(activeConstructor.key, activeConstructor.relationType)}}        
            />
        </ScrollView>
    )
}


