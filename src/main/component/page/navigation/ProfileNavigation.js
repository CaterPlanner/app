import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PublicNavigation from './PublicNavigation'
import Search from '../screen/search/Search';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import MyProfile from '../screen/common/profile/MyProfile';

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return(
    <Stack.Navigator>
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle(),
                title: '프로필',
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="MyProfile" component={MyProfile}/>
        {/* <Stack.Screen options={{ headerShown: false }} name="PublicNavigation" component={PublicNavigation} /> */}
        {PublicNavigation.get()}
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
