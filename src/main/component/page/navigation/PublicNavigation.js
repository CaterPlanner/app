import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyProfile from '../screen/common/profile/LoadProfile';
import LoadMyPurpose from '../screen/common/purpose/LoadMyPurpose';
import DetailGoal from '../screen/common/purpose/DetailGoal';
import LoadProfile from '../screen/common/profile/LoadProfile';

import LoadUserPurpose from '../screen/common/purpose/LoadUserPurpose';
import WriteStory from '../screen/common/purpose/WriteStory';
import PurposeStories from '../screen/common/story/PurposeStories';
import DetailStory from '../screen/common/purpose/DetailStory';
import DetailPlanList from '../screen/common/purpose/DetailPlanList';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import UserPurposeList from '../screen/common/profile/UserPurposeList';

const Stack = createStackNavigator();


const PublicNavigation = () => {
    return(
          <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="MyProfile" component={MyProfile}/>
            <Stack.Screen options={{ headerShown: false }} name="LoadMyPurpose" component={LoadMyPurpose} />
            <Stack.Screen  options={({ navigation }) => ({
                ...defaultHeaderStyle,
                title: ''
            })} name="DetailPlanList" component={DetailPlanList}/>
            <Stack.Screen options={{ headerShown: false }} name="DetailGoal" component={DetailGoal}/>
            <Stack.Screen options={{ headerShown: false }} name="LoadProfile" component={LoadProfile}/>
            <Stack.Screen options={{ headerShown: false }} name="LoadUserPurpose" component={LoadUserPurpose}/>
            <Stack.Screen options={{ headerShown: false }} name="WriteStory" component={WriteStory}/>
            <Stack.Screen options={{ headerShown: false }} name="PurposeStories" component={PurposeStories}/>
            <Stack.Screen options={{ headerShown: false }} name="DetailStory" component={DetailStory}/>
            <Stack.Screen options={{ headerShown: false }} name="UserPurposeList" component={UserPurposeList}/>

        </Stack.Navigator>
    )
}

export default PublicNavigation;