import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PublicNavigation from './PublicNavigation'
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import MyProfile from '../screen/common/profile/MyProfile';

const Stack = createStackNavigator();

const ProfileNavigation = ({navigation, route}) => {

  if(route.state && route.state.index > 0){
    navigation.setOptions({tabBarVisible: false})
}else{
    navigation.setOptions({tabBarVisible: true})
}

  return(
    <Stack.Navigator>
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle(),
                title: '프로필',
                headerTitleAlign:'left',
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
