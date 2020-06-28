import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanWriteBoard from '../screen/DetailPlanWrite/DetailPlanWriteBoard'
import PlanInsert from '../screen/DetailPlanWrite/PlanInsert'


const Stack = createStackNavigator();


const DetailPlanNavigation = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="DetailPlanWriteBoard" component={DetailPlanWriteBoard} />
            <Stack.Screen name="PlanInsert" component={PlanInsert} />
        </Stack.Navigator>
    )
}

export default DetailPlanNavigation;