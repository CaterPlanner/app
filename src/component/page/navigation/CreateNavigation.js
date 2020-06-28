import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanNavigation from './DetailPlanNavigation'
import ChoiceImage from '../screen/GoalWrite/ChoiceImage'
import ChoiceGroup from '../screen/GoalWrite/ChoiceGroup'
import GoalWriteBoard from '../screen/GoalWrite/GoalWriteBoard'


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen options={{headerShown: false}} name="GoalWriteBoard" component={GoalWriteBoard}  />
            <Stack.Screen name="DetailPlanNavigation" component={DetailPlanNavigation} />
            <Stack.Screen name="ChoiceImage" component={ChoiceImage} />
            <Stack.Screen name="ChoiceGroup" component={ChoiceGroup} />
        </Stack.Navigator>
    )
    
}

export default CreateNavigation;