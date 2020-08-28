import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import ImageButton from '../../../atom/button/ImageButton';
import EasyDate from '../../../../util/EasyDate';
import { useNavigation } from '@react-navigation/native';
import RoundButton from '../../../atom/button/RoundButton';

export default function PurposeDetailPlansWrite() {

    const { purposeWriteStore } = useStores();

    const [purposeStat, setPurposeStat] = useState(purposeWriteStore.purpose.stat);
    const [purposeDeatilPlans, setPurposeDetailPlans] = useState(purposeWriteStore.purpose.detailPlans);

    const navigation = useNavigation();

    useEffect(() => {
        console.log('purposDetailPlans Change!')
    }, [purposeDeatilPlans])

    return (
        <View style={purposeStyles.container}>

            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        목적에 대한                      
                        {"\n"}
                        세부적인 목표계획을 세워봐요.
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>
                        목표 계획 실천
                    </Text>
                    <View style={{ width: 160, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <RoundButton
                            text={'지금부터'}
                            textStyle={{
                                textAlign: 'center'
                            }}
                            elevation={5}
                            color={purposeStat == 0 ? '#F2F2F2' : 'white'}
                            width={75}
                            height={30}
                            onPress={() => {
                                setPurposeStat(0);
                            }}
                        />
                        <RoundButton
                            text={'나중에'}
                            textStyle={{
                                textAlign: 'center'
                            }}
                            elevation={5}
                            color={purposeStat == 1 ? '#F2F2F2' : 'white'}
                            width={75}
                            height={30}
                            onPress={() => {
                                setPurposeStat(1);
                            }}
                        />
                    </View>
                </View>
                <ImageButton
                    backgroundStyle={{ flex:1}}
                    imageStyle={{ width: 100, height: 110 }}
                    source={require('../../../../../../asset/button/plan_insert_button.png')}
                    onPress={() => {
                        navigation.navigate('DetailPlanWriteNavigation', {
                            screen: 'DetailPlanWriteBoard'
                        });
                    }}
                />
            </View>
        </View>
    );
}
