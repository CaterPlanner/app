import React from 'react'
import { Button , View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import DetailPlanWriteBoard from '../screen/detailPlanWrites/DetailPlanWriteBoard';
import ImageButton from '../../atom/button/ImageButton';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import GoalWrite from '../screen/detailPlanWrites/GoalWrite';
import DetailPlanDecimalDayWrite from '../screen/detailPlanWrites/DetailPlanDecimalDayWrite'

const Stack = createStackNavigator();

//setParams 이용
const DetailPlanWriteNavigation = () => {
    return (
        <Stack.Navigator >
            {/* <Stack.Screen options={{headerShown: false}} name="DetailPlanDecimalDayWrite" component={DetailPlanDecimalDayWrite} /> */}
            <Stack.Screen options={({ route, navigation }) => ({
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
                ),
                headerRight: () => (
                    <View style={{flexDirection : 'row', justifyContent: 'center'}}>
                         {/* <ImageButton
                            backgroundStyle={{
                                marginVertical: 5,
                                marginRight: 15
                            }}
                            imageStyle={{
                                width: 24,
                                height: 24
                            }}
                            source={
                                route.params == undefined || !route.params.isGraph ?
                                    require('../../../../../asset/button/show_goalGraph_button.png') : require('../../../../../asset/button/show_goalList_button.png')}
                            onPress={route.params ? route.params.changeShow : null}
                        /> */}
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
                            onPress={route.params ? route.params.saveDetailPlans : null}
                        />
                    
                    </View>
                )
            })}
                name="DetailPlanWriteBoard" component={DetailPlanWriteBoard} />
            <Stack.Screen options={{ headerShown: false }} name={"GoalWrite"} component={GoalWrite} />
        </Stack.Navigator>
    )
}

export default DetailPlanWriteNavigation;