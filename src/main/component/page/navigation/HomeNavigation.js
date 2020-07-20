import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import PlanCardView from '../screen/Home/PlanCardView'
import PlanView from '../screen/Home/PlanView'



const Stack = createStackNavigator();


const HomeNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlanCardView" component={PlanCardView} />
            <Stack.Screen name="PlanView" component={PlanView} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;