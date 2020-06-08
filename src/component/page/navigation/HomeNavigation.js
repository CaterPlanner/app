import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import PlanCardView from '../screen/Home/PlanCardView'
import PlanView from '../screen/Home/PlanView'
import HomeContr from '../screen/Home/HomeContr'


const Stack = createStackNavigator();


const HomeNavigation = () => {
    return(
          <Stack.Navigator initalRouteName="PlanCardView"
          screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeContr" component = {HomeContr}/>
            <Stack.Screen name="PlanView" component={PlanView} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;