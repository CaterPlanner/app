import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Story from '../screen/mains/Story';

import PublicNavigation from './PublicNavigation'
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';

import TestView from '../../../../test/TestView';


const Stack = createStackNavigator();


const StoryNavigation = ({navigation, route}) => {

    if(route.state && route.state.index > 0){
        navigation.setOptions({tabBarVisible: false})
    }else{
        navigation.setOptions({tabBarVisible: true})
    }

    return(
          <Stack.Navigator screenOptions={{
            animationEnabled : false
        }}>
            {/* <Stack.Screen name="TestView" component={TestView}/> */}
            <Stack.Screen options={({navigation}) => ({
                ...defaultHeaderStyle(),
                headerTitle: '피드',
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="Story" component={Story}  />
            {/* <Stack.Screen options={{headerShown : false}}name="PublicNavigation" component={PublicNavigation} /> */}
            {PublicNavigation.get()}
        </Stack.Navigator>
    )
    
}

export default StoryNavigation;