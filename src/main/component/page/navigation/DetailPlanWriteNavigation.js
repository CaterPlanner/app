import React from 'react'
import { Button , View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import DetailPlanWriteBoard from '../screen/detailPlanWrites/DetailPlanWriteBoard';
import ImageButton from '../../atom/button/ImageButton';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import GoalWrite from '../screen/detailPlanWrites/GoalWrite';

const Stack = createStackNavigator();

//setParams 이용
const DetailPlanWriteNavigation = () => {
    return (
        <Stack.Navigator >
            {/* <Stack.Screen options={{headerShown: false}} name="DetailPlanDecimalDayWrite" component={DetailPlanDecimalDayWrite} /> */}
            <Stack.Screen options={({ route, navigation }) => ({
                ...defaultHeaderStyle(navigation),
                title: '',
                headerRight: () => {
                                
                    return (<View style={{flexDirection : 'row', justifyContent: 'center'}}>
                        <ImageButton
                            disabled={!route.params.isCanSave}
                            backgroundStyle={{
                                marginVertical: 5,
                                marginRight: 10
                                ,marginBottom: 5 
                            }}
                            imageStyle={{
                                width: 29, height: 27,
                                tintColor : route.params.isCanSave ? '#25B046' : '#888888'
                            }}
                            source={
                                require('../../../../../asset/button/check_button.png')}
                            onPress={() => {
                                if(route.params.isCanSave){
                                    route.params.saveDetailPlans();
                                }
                            }}
                        />
                    
                    </View>
                )}
            })}
                name="DetailPlanWriteBoard" component={DetailPlanWriteBoard} />
            <Stack.Screen options={{ headerShown: false }} name={"GoalWrite"} component={GoalWrite} />
        </Stack.Navigator>
    )
}

export default DetailPlanWriteNavigation;