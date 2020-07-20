import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import purposeStyles from './stylesheet/PurposeStyles';


export default function PurposeNameWrite({ purpose }) {

    const [purposeName, setPurposeName] = useState("");

    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, {flex:1}]}>
                <Text style={purposeStyles.title}>당신의 목표는 무엇인가요?</Text>
            </View>
            <View style={[purposeStyles.bottomContainer, {flex:8}]}>
            <TextInput
                numberOfLines={1}
                maxLength = {32}
                placeholder={"목표 이름을 적어주세요!"}
                onChangeText={text => {
                    setPurposeName(text);
                    purpose.name = text;
                }}
                value={PurposeName}
            />
            </View>
        </View>
    );
}

