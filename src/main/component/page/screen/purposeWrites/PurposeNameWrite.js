import React, { useState } from 'react'
import { View, Text, Dimensions } from 'react-native';
import useStores from '../../../../mobX/helper/useStores'
import purposeStyles from './style/PurposeStyle';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput';




export default function PurposeNameWrite({index}) {

    const { purposeWriteStore } = useStores();

    const [purposeName, setPurposeName] = useState(purposeWriteStore.purpose.name);
    // const [purposeDisclosureScope, setDisclosureScope] = useState(purposeWriteStore.purpose.disclosureScope); //0 전체공개 1 비공개




    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>이루고자 하는 목적을 적어주세요</Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        이루고 싶은 목적의 이름을 작성해주세요. {"\n"}
                            명확한 목적으로 성공 할 수 있길 바래요.
                        </Text>
                </View>
            </View>
            <View style={[{alignSelf:'center', top : Dimensions.get('window').height / 4  ,position : 'absolute', width:'100%'}]}>
                <CaterPlannerTextInput
                    labelStyle={{color : '#25B046'}}
                    label={'목적 이름 설정하기'}
                    numberOfLines={1}
                    maxLength={32}
                    placeHolder={"이름을 입력해주세요"}
                    // onSubmitEditing={event => {
                    //     if (purposeWriteStore.isPermitNextScene)
                    //         next();
                    // }}
                    onChangeText={text => {
                        setPurposeName(text);

                        purposeWriteStore.purpose.name = text;

                        if (!(/[^\s]/g).test(text)) {
                            purposeWriteStore.changePermit(false, index);
                        } else {
                            purposeWriteStore.changePermit(true, index);
                        }
                    }}
                    value={purposeName}
                />
            </View>
        </View>

    );
}
