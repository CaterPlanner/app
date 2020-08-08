import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UserProfile from '../screen/common/profile/UserProfile'

const Stack = createStackNavigator();


const ProfileNavigation = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation;