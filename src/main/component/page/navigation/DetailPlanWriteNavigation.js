import React from 'react'
import {Button} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanWriteBoard from '../screen/detailPlanWrite/DetailPlanWriteBoard';
import ImageButton from '../../atom/button/ImageButton';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';
import GoalWrite from '../screen/detailPlanWrite/GoalWrite';


const Stack = createStackNavigator();

//setParams 이용
const DetailPlanWriteNavigation = () => {
    return(
        <Stack.Navigator >
            <Stack.Screen options={({route, navigation}) => ({
                ...defaultHeaderStyle,
                title: '',
                headerLeft : () => (
                    <ImageButton
                        backgroundStyle = {{
                            marginVertical : 5,
                            marginLeft: 10
                        }}
                        imageStyle={{
                            width : 24,
                            height : 24
                        }}
                        source={
                            route.params == undefined || !route.params.isGraph ?
                            require('../../../../../asset/button/show_goalGraph_button.png') : require('../../../../../asset/button/show_goalList_button.png')}
                        onPress={route.params ? route.params.changeShow : null}
                    />
                )
            })}
            name="DetailPlanWriteBoard" component={DetailPlanWriteBoard} />
            <Stack.Screen options={{headerShown: false}}  name={"GoalWrite"} component={GoalWrite}/>
        </Stack.Navigator>
    )
}

export default DetailPlanWriteNavigation;