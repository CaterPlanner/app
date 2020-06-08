import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanNavigation from './DetailPlanNavigation'
import ChoiceImage from '../screen/GoalWrite/ChoiceImage'
import ChoiceGroup from '../screen/GoalWrite/ChoiceGroup'
import GoalWriteController from '../screen/GoalWrite/GoalWriteController'


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator initalRouteName="GoalWriteController" screenOptions={{headerShown: false}}>
            <Stack.Screen name="GoalWriteController" component={GoalWriteController}  />
            <Stack.Screen name="DetailPlanNavigation" component={DetailPlanNavigation} />
            <Stack.Screen name="ChoiceImage" component={ChoiceImage} />
            <Stack.Screen name="ChoiceGroup" component={ChoiceGroup} />
        </Stack.Navigator>
    )
    
}

export default CreateNavigation;