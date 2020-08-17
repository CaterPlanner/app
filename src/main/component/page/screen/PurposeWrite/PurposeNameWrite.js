import React, { useState } from 'react'
import {View, Text, TextInput } from 'react-native';
import useStores from '../../../../mobX/helper/useStores'
import purposeStyles from './style/PurposeStyle';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput';

export default function PurposeNameWrite({next}) {

    const {purposeWriteStore} = useStores();
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
                    <CaterPlannerTextInput
                        label={'목적 이름 설정하기'}
                        numberOfLines={1}
                        maxLength={32}
                        placeHolder={"목표 이름을 적어주세요!"}
                        onSubmitEditing={event => {
                            if(purposeWriteStore.isPermitNextScene)
                            next();
                        }}
                        onChangeText={text => {
                            setPurposeName(text);
                            purposeWriteStore.purpose.name = text;

                            if (text === "") {
                                purposeWriteStore.changePermit(false);
                            } else{
                                purposeWriteStore.changePermit(true);
                            }
                        }}
                        value={purposeName}
                    />
                </View>
            </View>
    );
}
