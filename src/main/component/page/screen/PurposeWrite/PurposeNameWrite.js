import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import useStores from '../../../../mobX/helper/useStores'
import purposeStyles from './style/PurposeStyle';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput';




export default function PurposeNameWrite() {

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
                <View style={{
                    backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end'
                }}>
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
                </View>
            </Modal>
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
                    placeHolder={"목적 이름을 적어주세요!"}
                    // onSubmitEditing={event => {
                    //     if (purposeWriteStore.isPermitNextScene)
                    //         next();
                    // }}
                    onChangeText={text => {
                        setPurposeName(text);
                        purposeWriteStore.purpose.name = text;

                        if (text === "") {
                            purposeWriteStore.changePermit(false);
                        } else {
                            purposeWriteStore.changePermit(true);
                        }
                    }}
                    value={purposeName}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 44, width: '100%', alignItmes: 'center', left: 22 }}>
                <TouchableOpacity style={{ borderWidth: 0.5, backgroundColor: 'white', height: 26, width: 90, justifyContent: 'center', borderRadius: 8, elevation: 2 }}
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
