import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import ImageButton from '../../../atom/button/ImageButton';
import EasyDate from '../../../../util/EasyDate';


export default function PurposeDetailPlansWrite({navigation }) {

    const { purposeWriteStore } = useStores();

    const [purposeDetailPlans, setPurposeDetailPlans] = useState();

    return (
        <View style={purposeStyles.container}>

            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        목적과 관련된                        
                        {"\n"}
                        목표를 설정해야 해요.
                </Text>
                </View>
                <View style={[purposeStyles.subtitleArea, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                    <Text style={purposeStyles.subtitle}>
                        목적만으로는 당신의 꿈이 이루어 질 수 없어요.{"\n"}
                        목표를 설정해서 원하는 것을 모두 이루어 봐요.
                    </Text>
                    <ImageButton
                        text="검"
                        width={45}
                        height={45}
                    />
                </View>
            </View>
            <View style={[purposeStyles.bottomContainer, {justifyContent: 'center', alignItmes:'center'}]}>
                <ImageButton
                    backgroundStyle={{ flex:1}}
                    imageStyle={{ width: 100, height: 110 }}
                    source={require('../../../../../../asset/button/plan_insert_button.png')}
                    onPress={() => {
                        navigation.navigate('DetailPlanWriteNavigation', {
                            screen : 'DetailPlanWriteBoard',
                            params : {
                                startDate : EasyDate.now(),
                                endDate : purposeWriteStore.purpose.decimalday,
                                setPurposeDetailPlans : setPurposeDetailPlans
                            }
                        })
                    }}
                />
            </View>
        </View>
    );
}
