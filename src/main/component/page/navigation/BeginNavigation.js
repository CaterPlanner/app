import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BeginTest from '../screen/begin/BeginTest';

const Stack = createStackNavigator();

const BeginNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="BeginTest" component={BeginTest} />
        </Stack.Navigator>
    )
}

export default BeginNavigation;