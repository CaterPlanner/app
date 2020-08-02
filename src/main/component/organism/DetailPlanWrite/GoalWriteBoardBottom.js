import React from 'react'
import { ScrollView } from 'react-native';
import GoalIcon from '../../atom/button/GoalIcon';


export default function DetailPlanCreate({ detailPlanMakerStore, navigation }) {

    const goals = detailPlanMakerStore.currentGoalBottmData;

    return (
        <ScrollView>
            {
                goals.map((goal) => {
                    return <GoalIcon
                      name={goal.name} color={goal.color} width={300} height={100}
                      onPress={() => {
                        console.log(goal.id);
                      }}  
                    />
                })
            }
        </ScrollView>
    )
}


