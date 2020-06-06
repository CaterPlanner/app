import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import GoalWrite from '../screen/CreateGoal/GoalWrite'
import DetailPlanNavigation from './DetailPlanNavigation'
import ChoiceImage from '../screen/CreateGoal/ChoiceImage'
import ChoiceGroup from '../screen/CreateGoal/ChoiceGroup'


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator initalRouteName="GoalWrite">
            <Stack.Screen name="GoalWrite" component={GoalWrite} />
            <Stack.Screen name="DetailPlanNavigation" component={DetailPlanNavigation} />
            <Stack.Screen name="ChoiceImage" component={ChoiceImage} />
            <Stack.Screen name="ChoiceGroup" component={ChoiceGroup} />
        </Stack.Navigator>
    )
}

export default CreateNavigation;