import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {PurposeController} from '../../../../native/RestService'
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'

export default function PurposeWriteDone({navigation }) {

    const { purposeWriteStore } = useStores();


    return (
        <View style={purposeStyles.container}>

            <Image source={require('../../../../../../asset/DDC.gif')} style={{

                height: 180,
                width: 180,
                alignSelf: 'center',
                marginTop: '32%'

            }}></Image>

            <Text style={purposeStyles.title}>목표 생성이 완료되었습니다</Text>
            <Text style={purposeStyles.subtitle}>목표를 지킬 수 있도록 노력해 주세요!</Text>

            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => {
                        PurposeController.createWithDetailPlans(purposeWriteStore.purpose, purposeWriteStore.purpose.detailPlans)
                        .then((id) => {
                            navigation.navigate('MainNavigation', {
                                screen: 'Home',
                                params: {
                                    screen: 'PlanView',
                                    params: {
                                        purpose: purposeWriteStore.purpose
                                    }
                                }
                            })
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                }}
            //버튼
            >
                <View style={{
                    width: 240,
                    height: '32%',
                    backgroundColor: '#55d517',
                    borderRadius: 40,
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>확        인</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}