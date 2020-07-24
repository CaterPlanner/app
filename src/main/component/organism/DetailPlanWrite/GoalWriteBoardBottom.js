import React from 'react'
import { Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GoalBar from '../../molecule/GoalBar';
import CommonType from '../../../util/CommonType';


/**
 * 
 * @param {*} param0
 * 
 * 변경되면, 새롭게 데이터가 생성되기 때문에 state가 없다. 
 */
export default function DetailPlanCreate({ detailPlanTreeStore, navigation }) {

    const data = detailPlanTreeStore.currentbottomViewData;
    const activeConstructor = detailPlanTreeStore.currentActiveConstructorState;

    const goalModify = (goal) => {
        navigation.navigate('GoalInsert', {
            startType: CommonType.MODIFY,
            goal: goal,
            limitStartDate : activeConstructor.endDate,
            limitEndDate :  detailPlanTreeStore.limitEndDate,
            finish: () => {
                detailPlanTreeStore.modifyDetailPlan(goal.key, goal);
            }
        });
    }

    const goalCreate = (constructorKey, construtorRelationType) => {
        goal = new Goal();
        navigation.navigate('GoalInsert', {
            startType: CommonType.CREATE,
            goal: goal,
            limitStartDate: activeConstructor.endDate,
            limitEndDate: detailPlanTreeStore.limitEndDate,
            finish: () => {
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
                        successorClick={() => {
                            if(element.successorHead){
                                detailPlanTreeStore.changeActiveConstructorShowKey(element.successorHead)
                            }else{
                                goalCreate(goal, 1);
                            }
                        }}
                        remove={() => { detailPlanTreeStore.deleteDetailPlan(goalKey) }}
                        modify={() => {goalModify(goal);}
                    }
                    />
                })
            }
            <Button
                title="+"
                style={{ width: 300, height: 100 }}
                onPress={() => { goalCreate(activeConstructor.key, activeConstructor.relationType) }}
            />
        </ScrollView>
    )
}


