import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './MainNavigation'
import CreateNavigation from './CreateNavigation'
import ServerNotification from '../screen/ServerNotification'
import Setting from '../screen/Setting'


const Stack = createStackNavigator();


const AppNavigation = () => {
    return(
          <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="MainNavigation" component={MainNavigation} />
            <Stack.Screen options={{headerShown:false}} name="CreateNavigation" component={CreateNavigation} />
            <Stack.Screen name="ServerNotification" component={ServerNotification} />
            <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
    )
}

export default AppNavigation;