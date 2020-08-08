import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/home/Home'
import PurposeDetailView from '../screen/home/PurposeDetailView'

import SNSNavigation from './SNSNavigation'

const Stack = createStackNavigator();


const HomeNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PurposeDetailView" component={PurposeDetailView} />
            <Stack.Screen name="SNSNavigation" component={SNSNavigation} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;