import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView  } from 'react-native';
import useStores from '../../../../mobX/helper/useStores'
import purposeStyles from './style/PurposeStyle';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput';




export default function PurposeNameWrite({index}) {

    const { purposeWriteStore } = useStores();

    const [purposeName, setPurposeName] = useState(purposeWriteStore.purpose.name);
    const [purposeDisclosureScope, setDisclosureScope] = useState(purposeWriteStore.purpose.disclosureScope); //0 전체공개 1 비공개

    const [isScopeSelecting, setIsScopeSelecting] = useState(false);

    const scopeNames = ['전체공개', '비공개']



    return (
        <View style={purposeStyles.container}>
            <Modal
                transparent={true}
                visible={isScopeSelecting}
            >
                <TouchableOpacity style={{
                    backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end'
                }}
                onPress={() => {
                    setIsScopeSelecting(false);
                }}
                >
                    <View style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopRightRadius: 10,
                    borderTopLeftRadius: 10 }}>
                        {
                            scopeNames.map((scopeName, index) => {
                                return (
                                    <TouchableOpacity style={{ paddingVertical: 10 }}
                                        onPress={() => {
                                            setDisclosureScope(index);
                                            setIsScopeSelecting(false);
                                            purposeWriteStore.purpose.disclosureScope = index;
                                        }}
                                    >
                                        <Text>{scopeName}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
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
            <KeyboardAvoidingView style={purposeStyles.bottomContainer}disabled>
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

                        if (text === "") {
                            purposeWriteStore.changePermit(false, index);
                        } else {
                            purposeWriteStore.changePermit(true, index);
                        }
                    }}
                    value={purposeName}
                />
            </KeyboardAvoidingView>
            <View style={{ position: 'absolute', bottom: 44, width: '100%', alignItmes: 'center', left: 22 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', height: 26, width: 90, justifyContent: 'center', borderRadius: 8, elevation: 2 }}
                    onPress={() => {
                        setIsScopeSelecting(true);
                    }}
                >
                    <Text style={{ textAlign: 'center' }}>
                        {scopeNames[purposeDisclosureScope]}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}
