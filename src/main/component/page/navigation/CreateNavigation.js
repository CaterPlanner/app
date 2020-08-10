import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanNavigation from './DetailPlanNavigation'
import ChoiceImage from '../screen/purposeWrite/ChoiceGroup'
import ChoiceGroup from '../screen/purposeWrite/ChoiceGroup'
import PurposeWriteBoard from '../screen/purposeWrite/PurposeWriteBoard'


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen options={{headerShown: false}} name="PurposeWriteBoard" component={PurposeWriteBoard}  />
            <Stack.Screen name="DetailPlanNavigation" component={DetailPlanNavigation} />
            <Stack.Screen name="ChoiceImage" component={ChoiceImage} />
            <Stack.Screen name="ChoiceGroup" component={ChoiceGroup} />
        </Stack.Navigator>
    )
    
}

export default CreateNavigation;