import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import WriteName from '../screen/GoalWrite/WriteName'
import WriteContent from '../screen/GoalWrite/WriteContent'


const Stack = createStackNavigator();


const GoalWrite = () => {
    return(
          <Stack.Navigator>
            <Stack.Screen name="WriteName" component={WriteName} />
            <Stack.Screen name="WriteContent" component={WriteContent} />
        </Stack.Navigator>
    )
}
//잉 얘도 네비게이션이 됬자너 얘도 
//navigation에 옮기고 얘 안에 두마리 
//Write Name, Content 분류 해놓음
//TakePhoto 지움
//원래 이런걸 커밋할때 적는건가



export default GoalWrite;