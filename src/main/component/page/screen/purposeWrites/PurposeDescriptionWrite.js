import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native';
import useStores from '../../../../mobX/helper/useStores'
import purposeStyles from './style/PurposeStyle';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput'

export default function PurposeDescriptionWrite({index}) {

    const {purposeWriteStore} = useStores();
    const [purposeDescription, setPurposeDescription] = useState(purposeWriteStore.purpose.description);

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text
                        style={purposeStyles.title}>
                        {purposeWriteStore.purpose.name}
                        {"\n"}
                        대해 자세히 적어주세요
                </Text>
                </View>
                {/* <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>

                         {"\n"}
                        소망하는 이유나 상상한 미래 등을 한 줄로 써 주세요.
                    </Text>
                </View>                 */}
            </View>
            <View style={purposeStyles.bottomContainer}>
                <CaterPlannerTextInput
                    labelStyle={{color : '#25B046'}}
                    label={'자세히 입력하기'}
                    multiline={true}
                    maxLength={100}
                    placeHolder={'정한 목표에 대한 설명이나 시작하게 된 동기를 적어주세요.'}
                    blueOnSumbit={true}
                    onChangeText={text => {
                        setPurposeDescription(text);
                        purposeWriteStore.purpose.description = text;

                        if(text === ""){
                            purposeWriteStore.changePermit(false, index);
                        }else{
                            purposeWriteStore.changePermit(true, index);
                        }
                    }}
                    value={purposeDescription}

                />
            </View>
        </View>
    );
}