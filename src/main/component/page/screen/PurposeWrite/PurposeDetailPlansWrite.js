import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { startType } from '../DetailPlanWrite/DetailPlanWriteBoard';
import purposeStyles from './stylesheet/PurposeStyles';

export default function PurposeDetailPlanWrite({ purpose, navigation }) {

    const [purposeDetailPlans, setPurposeDetailPlans] = useState();

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
                                    startType: startType.CREATE,
                                    result: (detailPlans) => {
                                        setPurposeDetailPlans(detailPlans);
                                        purpose.detailPlans = detailPlans;
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
