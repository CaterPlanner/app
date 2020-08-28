import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Begin from '../screen/begin/Begin';

const Stack = createStackNavigator();

const BeginNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Begin" component={Begin}/>
        </Stack.Navigator>
    )
}

export default BeginNavigation;