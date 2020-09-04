import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Story from '../screen/main/Story';

import PublicNavigation from './PublicNavigation'
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';


const Stack = createStackNavigator();


const StoryNavigation = () => {
    return(
          <Stack.Navigator>
            <Stack.Screen options={(navigation) => ({
                ...defaultHeaderStyle,
                headerTitle: '스토리보드',
                headerTitleAlign: 'center',
            })} name="Story" component={Story}  />
            <Stack.Screen options={{headerShown : false}}name="PublicNavigation" component={PublicNavigation} />
        </Stack.Navigator>
    )
    
}

export default StoryNavigation;