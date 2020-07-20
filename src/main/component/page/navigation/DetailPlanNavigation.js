import React from 'react'
import {Button} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {DetailPlanWriteBoard} from '../screen/DetailPlanWrite/DetailPlanWriteBoard'
import PlanInsert from '../screen/DetailPlanWrite/PlanInsert'


const Stack = createStackNavigator();


const DetailPlanNavigation = () => {
    return(
        <Stack.Navigator >
            <Stack.Screen name="DetailPlanWriteBoard" component={DetailPlanWriteBoard} />
            <Stack.Screen options={{
                headerRight : (navigation, route) => (
                    <Button
                        title="delete"
                    />
                )
            }} 
            name="PlanInsert" 
            component={PlanInsert} />
        </Stack.Navigator>
    )
}

export default DetailPlanNavigation;