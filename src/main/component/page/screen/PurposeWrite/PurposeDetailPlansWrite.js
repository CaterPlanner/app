import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native';
import CommonType from '../../../../util/CommonType'
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import ImageButton from '../../../atom/button/ImageButton';


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
            <View style={purposeStyles.bottomContainer}>
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
                                    purpose : purposeWriteStore.purpose, 
                                    result: (detailPlans) => {
                                        setPurposeDetailPlans(detailPlans);
                                        purposeWriteStore.purpose.detailPlans = detailPlans;
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
