import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import PlanCardView from '../screen/Home/PlanCardView'
<<<<<<< HEAD
import PlanView from '../screen/Home/PlanView.js'
=======
import PlanView from '../screen/Home/PlanView'
import HomeContr from '../screen/Home/HomeContr'
>>>>>>> a500801867648c1164b6fffd91e5463ff2d12090


const Stack = createStackNavigator();


const HomeNavigation = () => {
    return(
          <Stack.Navigator initalRouteName="PlanCardView"
          screenOptions={{ headerShown: false }}>
<<<<<<< HEAD
            <Stack.Screen name="PlanCardView" component = {PlanCardView}/>
=======
            <Stack.Screen name="HomeContr" component = {HomeContr}/>
>>>>>>> a500801867648c1164b6fffd91e5463ff2d12090
            <Stack.Screen name="PlanView" component={PlanView} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;