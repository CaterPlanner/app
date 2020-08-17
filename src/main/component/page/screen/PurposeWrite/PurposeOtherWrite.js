import React, { useState } from 'react'
import { View, Text, StyleSheet} from 'react-native';
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
                <Text>dsfsd</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    
})