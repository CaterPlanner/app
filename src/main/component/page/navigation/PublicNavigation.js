import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoadMyPurpose from '../screen/common/purpose/LoadMyPurpose';
import DetailGoal from '../screen/common/purpose/DetailGoal';
import LoadProfile from '../screen/common/profile/LoadProfile';

import LoadUserPurpose from '../screen/common/purpose/LoadUserPurpose';
import PurposeStories from '../screen/common/story/PurposeStories';
import DetailStory from '../screen/common/story/DetailStory';
import DetailPlanList from '../screen/common/purpose/DetailPlanList';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import UserPurposeList from '../screen/common/profile/UserPurposeList';

import CommnetView from '../screen/common/CommnetView';
import ImageButton from '../../atom/button/ImageButton';

const Stack = createStackNavigator();


export const PublicNavigation = {

    elements : [
        <Stack.Screen options={({ navigation }) => ({
            ...defaultHeaderStyle(navigation),
            title: '프로필',
            headerTitleAlign:'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        })} name="LoadProfile" component={LoadProfile}/>,
        <Stack.Screen options={{ headerShown: false}} name="LoadMyPurpose" component={LoadMyPurpose} />,
        <Stack.Screen  options={({ navigation }) => ({
            ...defaultHeaderStyle(navigation),
            title: ''
        })} name="DetailPlanList" component={DetailPlanList}/>,
        <Stack.Screen options={({ navigation }) => ({
            ...defaultHeaderStyle(navigation),
            title: ''
        })} name="DetailGoal" component={DetailGoal}/>,
        <Stack.Screen options={{ headerShown: false }} name="LoadUserPurpose" component={LoadUserPurpose}/>,
        <Stack.Screen options={({ route, navigation }) => ({
            ...defaultHeaderStyle(navigation),
            title: '스토리라인',
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
           
        })} name="PurposeStories" component={PurposeStories}/>,
        <Stack.Screen  options={({ route, navigation }) => ({
            ...defaultHeaderStyle(navigation),
            title: '',
            headerRight: () => {


                return(
                    <ImageButton
                    backgroundStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 30,
                        marginRight: 10
                    }}
                    imageStyle={{
                        width: 30,
                        height: 30
                    }}
                    source={
                        require('../../../../../asset/button/more_button2.png')}
                    onPress={route.params ? route.params.showStoryMenu : null}
                />
                )
            }
        })} name="DetailStory" component={DetailStory}/>,
        <Stack.Screen options={({route, navigation}) => ({
            ...defaultHeaderStyle(navigation),
            title: '목적 리스트',
            headerTitleAlign:'center',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        })} name="UserPurposeList" component={UserPurposeList}/>,
        <Stack.Screen options={({route, navigation}) => ({
            ...defaultHeaderStyle(navigation),
            title: ''
        })} name="CommnetView" component={CommnetView}/>
    ],
    get : () => {
        return PublicNavigation.elements.map((e) => {
            return e;
        })
    }
}

// const PublicNavigation = () => {
//     return(
//           <Stack.Navigator>
//             <Stack.Screen options={({ navigation }) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: '프로필',
//                 headerTitleAlign:'center',
//                 headerTitleStyle: {
//                     fontWeight: 'bold'
//                 }
//             })} name="LoadProfile" component={LoadProfile}/>
//             <Stack.Screen options={{ headerShown: false }} name="LoadMyPurpose" component={LoadMyPurpose} />
//             <Stack.Screen  options={({ navigation }) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: ''
//             })} name="DetailPlanList" component={DetailPlanList}/>
//             <Stack.Screen options={({ navigation }) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: ''
//             })} name="DetailGoal" component={DetailGoal}/>
//             <Stack.Screen options={{ headerShown: false }} name="LoadUserPurpose" component={LoadUserPurpose}/>
//             <Stack.Screen options={({ route, navigation }) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: '스토리라인',
//                 headerTitleAlign: 'center',
//                 headerTitleStyle: {
//                     fontWeight: 'bold'
//                 }
               
//             })} name="PurposeStories" component={PurposeStories}/>
//             <Stack.Screen  options={({ route, navigation }) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: '',
//                 headerRight: () => {
//                     return(
//                         <ImageButton
//                         backgroundStyle={{
//                             marginVertical: 5,
//                             marginRight: 10,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width : 20,
//                             height: 30,
//                         }}
//                         imageStyle={{
//                             width: 6,
//                             height: 25
//                         }}
//                         source={
//                             require('../../../../../asset/button/more_button.png')}
//                         onPress={route.params ? route.params.showStoryMenu : null}
//                     />
//                     )
//                 }
//             })} name="DetailStory" component={DetailStory}/>
//             <Stack.Screen options={({route, navigation}) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: '목적 리스트',
//                 headerTitleAlign:'center',
//                 headerTitleStyle: {
//                     fontWeight: 'bold'
//                 }
//             })} name="UserPurposeList" component={UserPurposeList}/>
//             <Stack.Screen options={({route, navigation}) => ({
//                 ...defaultHeaderStyle(navigation),
//                 title: ''
//             })} name="CommnetView" component={CommnetView}/>
//         </Stack.Navigator>
//     )
// }

export default PublicNavigation;