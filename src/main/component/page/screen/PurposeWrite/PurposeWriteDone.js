import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import RoundButton from '../../../atom/button/RoundButton';

export default function PurposeWriteDone({ navigation }) {

    const { purposeWriteStore } = useStores();


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                resizeMode="stretch"
                style={{ width: 200, height: 200 }}
                source={require('../../../../../../asset/image/normal_caterpillar.gif')}
            />
            <View style={{marginTop: 80}}>
                <Text style={purposeStyles.title}>
                    목적 생성이 완료되었습니다!
                </Text>
            </View>
            <View style={{marginVertical: 20}}>
                <Text style={[purposeStyles.subtitle, {textAlign: 'center'}]}>
                    앞으로 매일 목적을 위해 노력해서 {'\n'}
                    원하는 모든 것들을 이룰 수 있길 바랍니다.
                </Text>
            </View>
            <View>
                <RoundButton
                    textStyle={{
                        paddingVertical: 5,
                        textAlign: 'center',
                        color: 'white'
                    }}
                    text={'완 료'}
                    color={'#25B046'}
                    width={280}
                />
            </View>
        </View>
    );
}