import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileNavigation from './ProfileNavigation'

const Stack = createStackNavigator();


const SNSNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DetailPurpose" component={DetailPurpose} />
            <Stack.Screen name="ProfileNavigation" component={ProfileNavigation} />
        </Stack.Navigator>
    )
}

export default SNSNavigation;