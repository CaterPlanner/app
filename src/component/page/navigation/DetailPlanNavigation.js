import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanWrite from '../screen/DetailPlanWrite/DetailPlanWrite'
import PlanInsert from '../screen/DetailPlanWrite/PlanInsert'


const Stack = createStackNavigator();


const DetailPlanNavigation = () => {
    return(
          <Stack.Navigator initalRouteName="DetailPlanWrite">
            <Stack.Screen name="DetailPlanWrite" component={DetailPlanWrite} />
            <Stack.Screen name="PlanInsert" component={PlanInsert} />
        </Stack.Navigator>
    )
}

export default DetailPlanNavigation;