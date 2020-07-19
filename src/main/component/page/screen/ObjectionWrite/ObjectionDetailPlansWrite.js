import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { startType } from '../DetailPlanWrite/DetailPlanWriteBoard';
import purposeStyles from './stylesheet/PurposeStyles';


const TMP_DATA =
    [
        {
            key: 1,
            constructorKey: 0,
            constructorRelationType: 0,
            name: "목표1",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "red",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 2,
            constructorKey: 0,
            constructorRelationType: 0,
            name: "목표2",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "blue",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 3,
            constructorKey: 1,
            constructorRelationType: 0,
            name: "목표3",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 4,
            constructorKey: 1,
            constructorRelationType: 0,
            name: "목표4",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "blue",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 5,
            constructorKey: 4,
            constructorRelationType: 0,
            name: "목표5",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "blue",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 6,
            constructorKey: 4,
            constructorRelationType: 0,
            name: "목표6",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "yellow",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 7,
            constructorKey: 4,
            constructorRelationType: 1,
            name: "목표7",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "green",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 8,
            constructorKey: 7,
            constructorRelationType: 0,
            name: "목표8",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 9,
            constructorKey: 5,
            constructorRelationType: 0,
            name: "목표9",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "green",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 10,
            constructorKey: 9,
            constructorRelationType: 0,
            name: "목표10",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 11,
            constructorKey: 9,
            constructorRelationType: 0,
            name: "목표11",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 12,
            constructorKey: 6,
            constructorRelationType: 0,
            name: "목표12",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 13,
            constructorKey: 1,
            constructorRelationType: 1,
            name: "목표13",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "red",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 14,
            constructorKey: 13,
            constructorRelationType: 0,
            name: "목표14",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 15,
            constructorKey: 13,
            constructorRelationType: 1,
            name: "목표15",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "green",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 16,
            constructorKey: 13,
            constructorRelationType: 1,
            name: "목표16",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "yellow",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 17,
            constructorKey: 15,
            constructorRelationType: 0,
            name: "목표17",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 18,
            constructorKey: 2,
            constructorRelationType: 0,
            name: "목표18",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "blue",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 19,
            constructorKey: 2,
            constructorRelationType: 0,
            name: "목표19",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 20,
            constructorKey: 18,
            constructorRelationType: 0,
            name: "목표20",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 21,
            constructorKey: 16,
            constructorRelationType: 1,
            name: "목표21",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 22,
            constructorKey: 16,
            constructorRelationType: 1,
            name: "목표22",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 23,
            constructorKey: 13,
            constructorRelationType: 1,
            name: "목표23",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 24,
            constructorKey: 2,
            constructorRelationType: 1,
            name: "목표24",
            type: "M",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "orange",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 25,
            constructorKey: 24,
            constructorRelationType: 1,
            name: "목표25",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 26,
            constructorKey: 24,
            constructorRelationType: 1,
            name: "목표26",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        },
        {
            key: 27,
            constructorKey: 0,
            constructorRelationType: 0,
            name: "목표27",
            type: "P",
            startDate: "2020-02-03",
            endDate: "2020-02-27",
            color: "gray",
            cycle: "unknown",
            stat: 0
        }

    ]

export default function ObjectionDetailPlanWrite({ objection, navigation }) {

    const [objectionDetailPlans, setObjectionDetailPlans] = useState();

    return (
        <View style={purposeStyles.container}>

            <View style={[purposeStyles.titleContainer, { flex: 2 }]}>
                <View>
                    <Text style={purposeStyles.title}>
                        목표를 세부적으로
                    {"\n"}
                    설정하는 시간입니다.
                </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={purposeStyles.subtitle}>
                        자신이 직접 세부 목표 계획을 세우거나 다른 사람의 목표 계획을 가져와 사용할 수 있습니다.
                </Text>
                </View>
            </View>
            <View style={[purposeStyles.bottomContainer, { flex: 6.5}]}>
                <View style={{flex:1}}>
                    <Button
                        title="+"
                    />
                </View>
                <View style={{flex:3}}>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            alignSelf: 'center',
                            borderWidth: 1
                        }}
                        onPress={() => {
                            navigation.navigate('DetailPlanNavigation', {
                                screen: 'DetailPlanWriteBoard',
                                params: {
                                    startType: startType.MODIFY,
                                    initData: TMP_DATA,
                                    result: (detailPlans) => {
                                        setObjectionDetailPlans(detailPlans);
                                        objection.detailPlans = detailPlans;
                                    }
                                }
                            })
                        }}>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
