import React from 'react'
import { View, Image, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/homes/Home'
import BriefingPurposeList from '../screen/homes/BriefingPurposeList'

import ImageButton from '../../atom/button/ImageButton'
import PublicNavigation, { hey } from './PublicNavigation'

import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import BriefingGoalList from '../screen/homes/BriefingGoalList';


const Stack = createStackNavigator();


const HomeNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={({ navigation }) => (
                {
                    ...defaultHeaderStyle(),
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ marginLeft: 14, width: 180, height: 28, justifyContent:'center' }}>
                            {/* <Image
                                resizeMode="stretch"
                                style={{ flex: 1, width: "100%", height: undefined }}
                                source={require('../../../../../asset/logo/CaterPlanner.png')} /> */}
                            <Text style={{color : '#00B412', fontSize: 23, fontWeight: 'bold'}}>
                                CaterPlanner
                            </Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems:'center' }}>
                            <View style={{ marginRight: 25 }}>
                                <ImageButton

                                    imageStyle={{ width: 26.5, height: 26.5, tintColor:'black' }}
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
                                    imageStyle={{ width: 27, height: 27, tintColor:'black'  }}
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
            {/* <Stack.Screen options={{ headerShown: false }} name="PublicNavigation" component={PublicNavigation} /> */}
            <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle(navigation),
                headerTitle: '수행 리스트',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="BriefingPurposeList" component={BriefingPurposeList} />
            <Stack.Screen options={({ navigation, route }) => ({
                ...defaultHeaderStyle(navigation),
                headerTitle: route.params.purpose.name,
                headerTitleAlign: 'center',
                animationEnabled: false,
                headerShown : route.params.showHeader == undefined || route.params.showHeader == true ? true : false, 
                headerRight: () => {
                    return(
                        <View style={{marginRight: 5}}>
                            <ImageButton
                                disabled={!route.params.isCanSubmit}
                                source={require('../../../../../asset/button/check_button.png')}
                                backgroundStyle={{ width: 40, height: 40}}
                                imageStyle={{ width: 35, height: 32,
                                    tintColor : route.params.isCanSubmit ? '#25B046' : '#888888'
                                }}
                                onPress={() => {
                                    if(route.params && route.params.isCanSubmit){
                                        route.params.save();
                                    }
                                }}
                            />
                        </View>
                    )
                }
            })} name='BriefingGoalList' component={BriefingGoalList} />
            {PublicNavigation.get()}
        </Stack.Navigator>
    )
}

export default HomeNavigation;