import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screen/auth/SignIn';
import SignUp from '../screen/auth/SignUp';


const Stack = createStackNavigator();


const AuthNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
          </Stack.Navigator>
    )
}

export default AuthNavigation;