import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Begin from '../screen/begin/Begin';
import BeginTest from '../screen/begin/BeginTest';

const Stack = createStackNavigator();

const BeginNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Begin" component={Begin}/>
            <Stack.Screen name="BeginTest" component={BeginTest} />
        </Stack.Navigator>
    )
}

export default BeginNavigation;