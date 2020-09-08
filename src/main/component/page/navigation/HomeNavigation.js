import React from 'react'
import { View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/homes/Home'
import BriefingPurposeList from '../screen/homes/BriefingPurposeList'

import ImageButton from '../../atom/button/ImageButton'
import PublicNavigation from './PublicNavigation'

import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import BriefingGoalList from '../screen/homes/BriefingGoalList';


const Stack = createStackNavigator();


const HomeNavigation = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen
                options={({navigation}) => ({
                    ...defaultHeaderStyle,
                    title: ''
                })}
                name={"DetailStory"}
                component={DetailStory}
            /> */}
            {/* <Stack.Screen options={({navigation}) => ({
                ...defaultHeaderStyle,
                title: ''
            })} name={"DetailStory"} component={DetailStory}/> */}
            {/* <Stack.Screen
                options={({ navigation }) => ({
                    ...defaultHeaderStyle,
                    title: ''
                })}
                name={'CommnetView'}
                component={CommnetView}
            /> */}
            {/* <Stack.Screen options={({navigation}) => (
                {
                    ...defaultHeaderStyle,
                    titie: ''
                }
            )} name={"WriteStory"} component={WriteStory}/> */}
            {/* <Stack.Screen options={({navigation}) => (
                {
                    ...defaultHeaderStyle,
                title: '',
                headerLeft: () => (
                    <ImageButton
                        backgroundStyle={{
                            marginVertical: 5,
                            marginLeft: 12
                        }}
                        imageStyle={{
                            width: 24,
                            height: 20
                        }}
                        source={require('../../../../../asset/button/arrow_button.png')}
                        onPress={() => { navigation.goBack(); }}
                    />
                )
                }
            )} name="DetailGoal" component={DetailGoal}/> */}
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
                        <View style={{ flexDirection: 'row', alignItems:'center' }}>
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
                                    imageStyle={{ width: 25, height: 25 }}
                                    source={require('../../../../../asset/button/setting_button.png')}
                                    onPress={
                                        () => {
                                            navigation.navigate('Setting');
                                        }
                                    }
                                />
                            </View>
                        </View>
                    )
                }
            )} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false }} name="PublicNavigation" component={PublicNavigation} />
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle,
                headerTitle: '브리핑 리스트',
                headerTitleAlign: 'center',
            })} name="BriefingPurposeList" component={BriefingPurposeList} />
            <Stack.Screen options={({ navigation, route }) => ({
                ...defaultHeaderStyle,
                headerTitle: route.params.purpose.name,
                headerTitleAlign: 'center',
                animationEnabled: false,
                headerRight: () => {
                    return(
                        <View style={{marginRight: 5}}>
                            <ImageButton
                                source={require('../../../../../asset/button/check_button.png')}
                                backgroundStyle={{ width: 40, height: 40}}
                                imageStyle={{ width: 35, height: 32 }}
                                onPress={route.params ? route.params.save : null}
                            />
                        </View>
                    )
                }
            })} name='BriefingGoalList' component={BriefingGoalList} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;