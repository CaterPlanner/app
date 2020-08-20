import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Story from '../screen/main/Story';

import PublicNavigation from './PublicNavigation'


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Story" component={Story}  />
            <Stack.Screen name="PublicNavigation" component={PublicNavigation} />
        </Stack.Navigator>
    )
    
}

export default CreateNavigation;