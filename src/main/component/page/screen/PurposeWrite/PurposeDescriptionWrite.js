import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import purposeStyles from './style/PurposeStyle';

export default function PurposeDescriptionWrite({ purpose }) {

    const [purposeDescription, setPurposeDescription] = useState("");

    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, { flex: 1 }]}>
                <Text
                    style={purposeStyles.title}>
                    당신의 목표는...
                {"\n"}
                    {purpose.name}
                </Text>
            </View>
            <View style={[purposeStyles.bottomContainer, { flex: 8 }]}>
                <TextInput
                    multiline={true}
                    placeholder="정한 목표에 대한 설명이나 시작하게 된 동기를 적어주세요."
                    onChangeText={text => {
                        setPurposeDescription(text);
                        purpose.description = text;
                    }}
                    value={purposeDescription}
                />
            </View>
        </View>
    );
}