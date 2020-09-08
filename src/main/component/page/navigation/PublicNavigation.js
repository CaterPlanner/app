import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyProfile from '../screen/common/profile/MyProfile';
import LoadMyPurpose from '../screen/common/purpose/LoadMyPurpose';
import DetailGoal from '../screen/common/purpose/DetailGoal';
import LoadProfile from '../screen/common/profile/LoadProfile';

import LoadUserPurpose from '../screen/common/purpose/LoadUserPurpose';
import WriteStory from '../screen/common/story/WriteStory';
import PurposeStories from '../screen/common/story/PurposeStories';
import DetailStory from '../screen/common/story/DetailStory';
import DetailPlanList from '../screen/common/purpose/DetailPlanList';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import UserPurposeList from '../screen/common/profile/UserPurposeList';

import CommnetView from '../screen/common/CommnetView';
import ImageButton from '../../atom/button/ImageButton';

const Stack = createStackNavigator();


const PublicNavigation = () => {
    return(
          <Stack.Navigator screenOptions={{
            unmountOnBlur: true
          }}>
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle,
                title: '프로필',
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="LoadProfile" component={LoadProfile}/>
            <Stack.Screen options={{ headerShown: false }} name="LoadMyPurpose" component={LoadMyPurpose} />
            <Stack.Screen  options={({ navigation }) => ({
                ...defaultHeaderStyle,
                title: ''
            })} name="DetailPlanList" component={DetailPlanList}/>
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle,
                title: ''
            })} name="DetailGoal" component={DetailGoal}/>
            <Stack.Screen options={{ headerShown: false }} name="LoadUserPurpose" component={LoadUserPurpose}/>
            <Stack.Screen options={({ route, navigation }) => ({
                ...defaultHeaderStyle,
                title: '스토리라인',
                headerTitleAlign: 'center',
               
            })} name="PurposeStories" component={PurposeStories}/>
            <Stack.Screen  options={({ route, navigation }) => ({
                ...defaultHeaderStyle,
                title: '',
                headerRight: () => {
                    return(
                        <ImageButton
                        backgroundStyle={{
                            marginVertical: 5,
                            marginRight: 15
                        }}
                        imageStyle={{
                            width: 6,
                            height: 25
                        }}
                        source={
                            require('../../../../../asset/button/more_button.png')}
                        onPress={route.params ? route.params.showStoryMenu : null}
                    />
                    )
                }
            })} name="DetailStory" component={DetailStory}/>
            <Stack.Screen options={({route, navigation}) => ({
                ...defaultHeaderStyle,
                title: '목적 리스트',
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="UserPurposeList" component={UserPurposeList}/>
            <Stack.Screen options={({route, navigation}) => ({
                ...defaultHeaderStyle,
                title: ''
            })} name="CommnetView" component={CommnetView}/>
        </Stack.Navigator>
    )
}

export default PublicNavigation;