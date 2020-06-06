
import 'react-native-gesture-handler';
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './MainNavigation'
import CreateNavigation from './CreateNavigation'
import ServerNotification from '../screen/ServerNotification'
import Setting from '../screen/Setting'


const Stack = createStackNavigator();


const AppNavigation = () => {
    return(
          <Stack.Navigator initalRouteName="MainNavigation">
            <Stack.Screen name="MainNavigation" component={MainNavigation} />
            <Stack.Screen name="CreateNavigation" component={CreateNavigation} />
            <Stack.Screen name="ServerNotification" component={ServerNotification} />
            <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
    )
}

export default AppNavigation;