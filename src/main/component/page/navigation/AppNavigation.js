import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from './MainNavigation'
import CreateNavigation from './CreateNavigation'
import ServerNotification from '../screen/ServerNotification'
import Setting from '../screen/Setting'
// import WriteStory from '../screen/common/purpose/WriteStory';
// import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import WriteStory from '../screen/common/story/WriteStory';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import ImageButton from '../../atom/button/ImageButton';


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
            <Stack.Screen options={{headerShown:false, animationEnabled : false}} name="MainNavigation" component={MainNavigation} />
            <Stack.Screen options={{headerShown:false}} name="CreateNavigation" component={CreateNavigation} />
            <Stack.Screen options={{
                animationEnabled : false
            }}name="ServerNotification" component={ServerNotification} />
            <Stack.Screen options={({route, navigation}) => ({
                ...defaultHeaderStyle(navigation),
                title: '설정',
                animationEnabled : false,
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="Setting" component={Setting} />
        </Stack.Navigator>
    )
}

export default AppNavigation;