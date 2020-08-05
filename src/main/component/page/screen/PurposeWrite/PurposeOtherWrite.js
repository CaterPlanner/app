import React, { useState } from 'react'
import { View, Text, Image} from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'


export default function PurposeOtherWrite() {

    const { purposeWriteStore } = useStores();


    const [purposeScope, setPurposeScope] = useState();
    const [purposeGroup, setPurposeGroup] = useState();

    const goalImage = './../../../../../../asset/sample_Image/Sam.png'

    const goalTotal = '23'

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        마지막으로
                        {"\n"}
                        몇개만 더 설정해 주세요.
                    </Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        지금까지 설정한 모든 목적, 목표를 달성하고{"\n"}
                        꿈을 향해 한 발자국 더 다가가길 응원할게요!
                    </Text>
                </View>
            </View>
            <View style={purposeStyles.bottomContainer}>
                <View style={{ textAlign: 'center', justifyContent: 'center', }}>
                    <Text style={{ marginTop: '10%', marginLeft: 20, fontSize: 18 }}>공개 범위</Text>
                </View>

                <View style={{ borderWidth: 1, width: 130, height: 35, alignItems: 'center', justifyContent: 'center', marginLeft: '5%', marginTop: '2%' }}>
                    <Text style={{ fontSize: 17, }}>공개</Text></View>

                <View style={{ textAlign: 'center', justifyContent: 'center', }}>
                    <Text style={{ marginTop: '3%', marginLeft: 20, fontSize: 18 }}>그룹  <Text style={{ color: '#BEBEBE', fontSize: 25, fontWeight: 'bold', }}>?</Text></Text>
                </View>

                <View style={{ backgroundColor: 'blue', width: '90%', height: '33%', alignSelf: 'center', marginTop: 10 }}>
                    <Image source={require(goalImage)}
                        style={{
                            width: '100%', height: '100%'
                        }}>
                    </Image>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 8 }}>하루 OO 시간 수행하기</Text>

                <View style={{ textAlign: 'center', justifyContent: 'center', }}>
                    <Text style={{ marginTop: '3%', marginLeft: 20, fontSize: 16, marginRight: 100 }}> 100개의 목표 저장
        <Text style={{ color: '#838383', fontSize: 16, }}> 총 {goalTotal}개 완료</Text></Text>
                </View>


            </View>

        </View>
    );
}