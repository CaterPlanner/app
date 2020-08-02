import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import purposeStyles from './style/PurposeStyle';

export default function PurposeDescriptionWrite({ purpose }) {

    const [purposeDescription, setPurposeDescription] = useState("");

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text
                        style={purposeStyles.title}>
                        당신의 목적은...
                    {"\n"}
                        {purpose.name}
                </Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        당신의 멋진 목적을 캐터플래너가 기억할 거에요. {"\n"}
                        소망하는 이유나 상상한 미래 등을 한 줄로 써 주세요.
                    </Text>
                </View>                
            </View>
            <View style={purposeStyles.bottomContainer}>
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