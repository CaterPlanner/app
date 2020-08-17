import React from 'react'
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home/Home'
import PurposeDetailView from '../screen/home/PurposeDetailView'
import BriefingPurposeList from '../screen/home/BriefingPurposeList'

import ImageButton from '../../atom/button/ImageButton'

import SNSNavigation from './SNSNavigation'
import DetailPurpose from '../../page/screen/common/purpose/DetailPurpose';
import UserProfile from '../../page/screen/common/profile/UserProfile';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import BriefingGoalList from '../screen/home/BriefingGoalList';


const Stack = createStackNavigator();


const HomeNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={({ navigation }) => (
                {
                    ...defaultHeaderStyle,
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ marginLeft: 12, width: 180, height: 28 }}>
                            <Image
                                resizeMode="stretch"
                                style={{ flex: 1, width: "100%", height: undefined }}
                                source={require('../../../../../asset/logo/CaterPlanner.png')} />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 25 }}>
                                <ImageButton
                                    imageStyle={{ width: 22, height: 22 }}
                                    source={require('../../../../../asset/button/briefingList_button.png')}
                                    onPress={
                                        () => {
                                            navigation.navigate('BriefingPurposeList');
                                        }
                                    }
                                />
                            </View>
                            <View style={{ marginRight: 12 }}>
                                <ImageButton
                                    imageStyle={{ width: 22, height: 22 }}
                                    source={require('../../../../../asset/button/notification_button.png')}
                                    onPress={
                                        () => {
                                            navigation.navigate('ServerNotification');
                                        }
                                    }
                                />
                            </View>
                        </View>
                    )
                }
            )} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="PurposeDetailView" component={PurposeDetailView} />
            <Stack.Screen options={{ headerShown: false }} name="SNSNavigation" component={SNSNavigation} />
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle,
                headerTitle: '브리핑 리스트',
                headerTitleAlign: 'center',
            })} name="BriefingPurposeList" component={BriefingPurposeList} />
            <Stack.Screen options={({ navigation, route }) => ({
                ...defaultHeaderStyle,
                headerTitle: route.params.purposeName,
                headerTitleAlign: 'center',
                animationEnabled: false,
                headerRight: () => {
                    return(
                        <View style={{marginRight: 5}}>
                            <ImageButton
                                source={require('../../../../../asset/button/check_button.png')}
                                backgroundStyle={{ width: 40, height: 40}}
                                imageStyle={{ width: 35, height: 32 }}
                            />
                        </View>
                    )
                }
            })} name='BriefingGoalList' component={BriefingGoalList} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;