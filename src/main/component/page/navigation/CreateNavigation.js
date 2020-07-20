import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanNavigation from './DetailPlanNavigation'
import ChoiceImage from '../screen/ObjectionWrite/ChoiceImage'
import ChoiceGroup from '../screen/ObjectionWrite/ChoiceGroup'
import GoalWriteBoard from '../screen/ObjectionWrite/ObjectionWriteBoard'


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