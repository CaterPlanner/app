import React from 'react'
import {Button} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {GoalWriteBoard} from '../screen/DetailPlanWrite/GoalWriteBoard'
import GoalInsert from '../screen/DetailPlanWrite/GoalInsert'
import CommonType from '../../../util/CommonType';


const Stack = createStackNavigator();


const DetailPlanNavigation = () => {
    return(
        <Stack.Navigator >
            <Stack.Screen name="GoalWriteBoard" component={GoalWriteBoard} />
            <Stack.Screen options={{
                headerRight : (navigation, route) => (
                    <Button
                        title="save"
                        onPress={() => {
                            route.params.finish();
                            navigation.goback();
                        }}
                    />
                )
            }} 
            name="GoalInsert" 
            component={GoalInsert} />
        </Stack.Navigator>
    )
}

export default DetailPlanNavigation;