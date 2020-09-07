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
            <Stack.Screen options={{headerShown:false}} name="MainNavigation" component={MainNavigation} />
            <Stack.Screen options={{headerShown:false}} name="CreateNavigation" component={CreateNavigation} />
            <Stack.Screen name="ServerNotification" component={ServerNotification} />
            <Stack.Screen options={({route}) => ({
                ...defaultHeaderStyle,
                title: '설정',
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="Setting" component={Setting} />
            <Stack.Screen options={({ route, navigation }) => ({
                ...defaultHeaderStyle,
                title: '스토리쓰기',
                headerShown : route.params.showHeader == undefined || route.params.showHeader == true ? true : false, 
                headerTitleAlign: 'center',
                headerRight: () => {
                    return(
                        <ImageButton
                        backgroundStyle={{
                            marginVertical: 5,
                            marginRight: 10
                        }}
                        imageStyle={{
                            width: 35,
                            height: 35
                        }}
                        source={
                            require('../../../../../asset/button/check_button.png')}
                        onPress={route.params ? route.params.save : null}
                    />
                    )
                }
            })} name="WriteStory" component={WriteStory}/>
        </Stack.Navigator>
    )
}

export default AppNavigation;