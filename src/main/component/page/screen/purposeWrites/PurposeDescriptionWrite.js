import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native';
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
                        당신의 목적은...{"\n"}
                        {purposeWriteStore.purpose.name}
                </Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        목적을 이루고 싶은 이유를 적어주세요.{"\n"}
                        목적을 이루고 싶은 이유는 당신에게 좋은 동기부여가 됩니다.
                    </Text>
                </View>                
            </View>
            <KeyboardAvoidingView style={[purposeStyles.bottomContainer, {marginTop : 30}]} disabled>
                <CaterPlannerTextInput
                    labelStyle={{color : '#25B046'}}
                    label={'자세히 입력하기'}
                    multiline={true}
                    maxLength={100}
                    maxLine={5}
                    placeHolder={'내용을 입력해 주세요'}
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
            </KeyboardAvoidingView>
        </View>
    );
}