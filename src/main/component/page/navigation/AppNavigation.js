import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './MainNavigation'
import CreateNavigation from './CreateNavigation'
import ServerNotification from '../screen/ServerNotification'
import Setting from '../screen/Setting'
// import WriteStory from '../screen/common/purpose/WriteStory';
// import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';


const Stack = createStackNavigator();


const AppNavigation = () => {
    return(
          <Stack.Navigator>
            {/* <Stack.Screen options={({navigation}) => (
                {
                    ...defaultHeaderStyle,
                    titie: ''
                }
            )} name={"WriteStory"} component={WriteStory}/> */}
            <Stack.Screen options={{headerShown:false}} name="MainNavigation" component={MainNavigation} />
            <Stack.Screen options={{headerShown:false}} name="CreateNavigation" component={CreateNavigation} />
            <Stack.Screen name="ServerNotification" component={ServerNotification} />
            <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
    )
}

export default AppNavigation;