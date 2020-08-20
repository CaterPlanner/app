import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyProfile from '../screen/common/profile/MyProfile';
import MyDetailPurpose from '../screen/common/purpose/MyDetailPurpose';

const Stack = createStackNavigator();


const PublicNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyProfile" component={MyProfile}/>
            <Stack.Screen name="MyDetailPurpose" component={MyDetailPurpose} />
        </Stack.Navigator>
    )
}

export default PublicNavigation;