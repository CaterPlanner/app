import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native';
import CommonType from '../../../../util/CommonType'
import purposeStyles from './style/PurposeStyle';


export default function PurposeDetailPlansWrite({ purpose, navigation }) {

    const [purposeDetailPlans, setPurposeDetailPlans] = useState();

    return (
        <View style={purposeStyles.container}>

            <View style={[purposeStyles.headContainer, { flex: 2 }]}>
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
            <View style={[purposeStyles.bottomContainer, { flex: 6.5 }]}>
                <View style={{ flex: 1 }}>
                    <Button
                        title="+"
                    />
                </View>
                <View style={{ flex: 3 }}>
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
                                    startType: CommonType.CREATE,
                                    purpose : purpose, 
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
