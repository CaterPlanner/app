import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import PurposeCard from '../screen/Home/PurposeCard'
import PurposeDetailView from '../screen/Home/PurposeDetailView'



const Stack = createStackNavigator();


const HomeNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PurposeCard" component={PurposeCard} />
            <Stack.Screen name="PurposeDetailView" component={PurposeDetailView} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;