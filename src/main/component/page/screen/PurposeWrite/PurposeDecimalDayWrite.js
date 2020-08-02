import React, { useState } from 'react'
import { View, Text } from 'react-native';
import purposeStyles from './style/PurposeStyle';


export default function PurposeDecimalDayWrite({ purpose }) {

    const [purposeDecimalDay, setPurposeDecimalDay] = useState(new Date())

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <Text style={purposeStyles.title}>
                    목표를 끝날 날짜를
                    {"\n"}
                    입력해 주세요
                </Text>
            </View>
            <View style={purposeStyles.bottomContainer}>
                <View>
                    <Text> Data Picker date</Text>
                </View>
            </View>
        </View>
    );
}