import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Story from '../screen/main/Story';

import SNSNavigation from './SNSNavigation'


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Story" component={Story}  />
            <Stack.Screen name="SNSNavigation" component={SNSNavigation} />
        </Stack.Navigator>
    )
    
}

export default CreateNavigation;