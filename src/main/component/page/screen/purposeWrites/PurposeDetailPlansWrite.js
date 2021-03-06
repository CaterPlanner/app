import React, { useState, useEffect } from 'react'
import { View, Text, Alert, TouchableOpacity, FlatList } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import ImageButton from '../../../atom/button/ImageButton';
import { useNavigation } from '@react-navigation/native';
import { PurposeWriteType } from '../../../../AppEnum';
import DetailPlanDate from '../../../atom/button/DetailPlanDate';


export default function PurposeDetailPlansWrite({ index }) {

    const { purposeWriteStore } = useStores();

    const [purposeStat, setPurposeStat] = useState(purposeWriteStore.purpose.stat);
    const [purposeDeatilPlans, setPurposeDetailPlans] = useState(purposeWriteStore.purpose.detailPlans);


    const navigation = useNavigation();

    useEffect(() => {
        if (purposeStat == 0) {
            purposeWriteStore.changePermit(purposeDeatilPlans.length != 0, index)
        } else {
            purposeWriteStore.changePermit(true, index);
        }

    }, [purposeDeatilPlans, purposeStat])

    return (
        <View style={purposeStyles.container}>

            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        목적을 달성하기 위한
                        {"\n"}
                        수행 목표를 세워주세요.
                </Text>
                </View>
                <View style={[purposeStyles.subtitleArea, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Text style={purposeStyles.subtitle}>
                        생성시 현재 시점 부터 수행 목표 관리가 시작되며 {"\n"}
                        나중에 수행을 선택하면 입력한 데이터만 저장됩니다.
                    </Text>
                    <ImageButton
                        text="검"
                        width={45}
                        height={45}
                    />
                </View>
            </View>
            <View style={[purposeStyles.bottomContainer, { alignItmes: 'center' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* <ImageButton
                            imageStyle={{ width: 70, height: 70 }}
                            source={require('../../../../../../asset/button/plan_insert_button.png')}
                            onPress={() => {
                                if (purposeWriteStore.writeType == PurposeWriteType.MODIFY) {
                                    Alert.alert(
                                        null,
                                        '진행중인 목적에 세부 목표 수정시 지금까지의 기록은 사라지고 새롭게 시작하게 됩니다.',
                                        [
                                            {
                                                text: '취소',
                                                style: 'cancel'
                                            },
                                            {
                                                text: '확인',
                                                onPress: () => {
                                                    navigation.navigate('DetailPlanWriteNavigation', {
                                                        screen: 'DetailPlanWriteBoard',
                                                        params: {
                                                            setPurposeDetailPlans: setPurposeDetailPlans,
                                                            detailPlans: purposeDeatilPlans
                                                        }
                                                    });
                                                }
                                            }
                                        ],
                                        { cancelable: false }

                                    )
                                } else {
                                    navigation.navigate('DetailPlanWriteNavigation', {
                                        screen: 'DetailPlanWriteBoard',
                                        params: {
                                            setPurposeDetailPlans: setPurposeDetailPlans,
                                            detailPlans: purposeDeatilPlans
                                        }
                                    });
                                }
                            }}
                        /> */}
                    <View style={{ width: 200, flexDirection: 'row',alignSelf: 'flex-start', marginTop : 10, justifyContent: 'space-between', marginRight: 10 }}>
                        <TouchableOpacity onPress={() => {
                            setPurposeStat(0);
                            purposeWriteStore.purpose.stat = 0;

                            if (purposeWriteStore.writeType == PurposeWriteType.MODIFY) {
                                Alert.alert(
                                    null,
                                    '진행중인 수행 목표는 삭제만 가능하며 \n새롭게 설정된 수행 목표들에 따라 목적 진행도가 변경될 수 있습니다.',
                                    [
                                        {
                                            text: '취소',
                                            style: 'cancel'
                                        },
                                        {
                                            text: '확인',
                                            onPress: () => {
                                                navigation.navigate('DetailPlanWriteNavigation', {
                                                    screen: 'DetailPlanWriteBoard',
                                                    params: {
                                                        setPurposeDetailPlans: setPurposeDetailPlans,
                                                        detailPlans: purposeDeatilPlans
                                                    }
                                                });
                                            }
                                        }
                                    ],
                                    { cancelable: false }

                                )
                            } else {
                                navigation.navigate('DetailPlanWriteNavigation', {
                                    screen: 'DetailPlanWriteBoard',
                                    params: {
                                        setPurposeDetailPlans: setPurposeDetailPlans,
                                        detailPlans: purposeDeatilPlans
                                    }
                                });
                            }
                            

                        }} >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: purposeStat == 0 ? '#25B046' : '#B2B2B2' }}>
                                지금부터 수행
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setPurposeStat(1);
                            purposeWriteStore.purpose.stat = 1;
                        }} >
                            <Text style={{ fontSize: 16, color: purposeStat == 1 ? '#25B046' : '#B2B2B2', fontWeight: 'bold' }}>
                                나중에 수행
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={{ flex: 1, marginTop: 30 }}
                    data={purposeDeatilPlans}
                    renderItem={({ item }) => (
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <DetailPlanDate
                                goal={item}
                                disabled={true}
                            />                        
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
