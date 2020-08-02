import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import purposeStyles from './style/PurposeStyle';

export default function PurposeNameWrite({ purpose }) {

    const [purposeName, setPurposeName] = useState("");


    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>새로운 목적을 적어주세요.</Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        새로운 목적을 달성해서 당신의 꿈이 이루어질 때까지 {"\n"}
                        저희가 옆에서 도와드릴 예정이에요.
                    </Text>
                </View>
            </View>
            <View style={purposeStyles.bottomContainer}>
                <TextInput
                    numberOfLines={1}
                    maxLength={32}
                    placeholder={"목표 이름을 적어주세요!"}
                    onChangeText={text => {
                        setPurposeName(text);
                        purpose.name = text;
                    }}
                    value={purposeName}
                />
            </View>
        </View>
    );
}
