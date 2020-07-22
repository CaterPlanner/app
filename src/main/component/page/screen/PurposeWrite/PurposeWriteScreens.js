import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import CommonType from '../../../../util/CommonType'
import useStores from '../../../../mobX/helper/useStores';


export function PurposeNameWrite({ purpose }) {

    const [purposeName, setPurposeName] = useState("");


    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, { flex: 1 }]}>
                <Text style={purposeStyles.title}>당신의 목표는 무엇인가요?</Text>
            </View>
            <View style={[purposeStyles.bottomContainer, { flex: 8 }]}>
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


export function PurposeDescriptionWrite({ purpose }) {

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

export function PurposeDecimalDayWrite({ purpose }) {

    const [purposeDecimalDay, setPurposeDecimalDay] = useState(new Date())

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.titleContainer}>
                <Text style={purposeStyles.title}>
                    목표를 끝날 날짜를
                    {"\n"}
                    입력해 주세요
                </Text>
            </View>
            <View style={purposeStyles.bottomContainer}>
                <View>
                    <Text> Data Picker date</Text>
                </View>
            </View>
        </View>
    );
}


export default function PurposeTumbnailWrite({ purpose }) {

    const [purposeTumbnail, setPurposeTumbnail] = useState("");
    const ImageBtn = './../../../../../asset/sample_Image/Sam.png';



    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, { flex: 1 }]}>
                <Text style={purposeStyles.title}>
                    자신의 목표에 맞는{"\n"}
                    대표 이미지를 설정해주세요
                </Text>
            </View>

            <View style={[purposeStyles.bottomContainer, { flex: 8, justifyContent: 'center' }]}>
                <TouchableOpacity style={{
                    width: '80%',
                    height: '77%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    marginTop: '10%',
                    borderStyle: 'dashed',
                    borderRadius: 1
                }}>
                    <Image source={{ uri: 'https://www.kindpng.com/picc/m/33-330145_gallery-image-icon-album-circle-hd-png-download.png' }} style={{

                        height: '30%',
                        width: '30%',
                        alignSelf: 'center',
                        borderRadius: 70


                    }}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export function PurposeDetailPlanWrite({ purpose, navigation }) {

    const [purposeDetailPlans, setPurposeDetailPlans] = useState();

    return (
        <View style={purposeStyles.container}>

            <View style={[purposeStyles.titleContainer, { flex: 2 }]}>
                <View>
                    <Text style={purposeStyles.title}>
                        목표를 세부적으로
                    {"\n"}
                    설정하는 시간입니다.
                </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={purposeStyles.subtitle}>
                        자신이 직접 세부 목표 계획을 세우거나 다른 사람의 목표 계획을 가져와 사용할 수 있습니다.
                </Text>
                </View>
            </View>
            <View style={[purposeStyles.bottomContainer, { flex: 6.5 }]}>
                <View style={{ flex: 1 }}>
                    <Button
                        title="+"
                    />
                </View>
                <View style={{ flex: 3 }}>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            alignSelf: 'center',
                            borderWidth: 1
                        }}
                        onPress={() => {
                            navigation.navigate('DetailPlanNavigation', {
                                screen: 'DetailPlanWriteBoard',
                                params: {
                                    startType: CommonType.CREATE,
                                    result: (detailPlans) => {
                                        setPurposeDetailPlans(detailPlans);
                                        purpose.detailPlans = detailPlans;
                                    }
                                }
                            })
                        }}>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}



export function PurposeOtherWrite({ purpose }) {

    const [purposeScope, setPurposeScope] = useState();
    const [purposeGroup, setPurposeGroup] = useState();

    const goalImage = './../../../../../../asset/sample_Image/Sam.png'

    const goalTotal = '23'

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.titleContainer}>
                <Text style={purposeStyles.title}>
                    좋은 목표 계획이군요!
                    {"\n"}
                    나머지 세부 설정만 남았습니다
                </Text>
            </View>
            <View >
                <View style={{ textAlign: 'center', justifyContent: 'center', }}>
                    <Text style={{ marginTop: '10%', marginLeft: 20, fontSize: 18 }}>공개 범위</Text>
                </View>

                <View style={{ borderWidth: 1, width: 130, height: 35, alignItems: 'center', justifyContent: 'center', marginLeft: '5%', marginTop: '2%' }}>
                    <Text style={{ fontSize: 17, }}>공개</Text></View>

                <View style={{ textAlign: 'center', justifyContent: 'center', }}>
                    <Text style={{ marginTop: '3%', marginLeft: 20, fontSize: 18 }}>그룹  <Text style={{ color: '#BEBEBE', fontSize: 25, fontWeight: 'bold', }}>?</Text></Text>
                </View>

                <View style={{ backgroundColor: 'blue', width: '90%', height: '33%', alignSelf: 'center', marginTop: 10 }}>
                    <Image source={require(goalImage)}
                        style={{
                            width: '100%', height: '100%'
                        }}>
                    </Image>
                </View>

                <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 8 }}>하루 OO 시간 수행하기</Text>

                <View style={{ textAlign: 'center', justifyContent: 'center', }}>
                    <Text style={{ marginTop: '3%', marginLeft: 20, fontSize: 16, marginRight: 100 }}> 100개의 목표 저장
        <Text style={{ color: '#838383', fontSize: 16, }}> 총 {goalTotal}개 완료</Text></Text>
                </View>


            </View>

        </View>
    );
}

export function PurposeWriteDone({ purpose, navigation }) {

    const purposeService = ({ service } = useStores()).purposeService;

    return (
        <View style={styles.container}>

            <Image source={require('../../../../../../asset/DDC.gif')} style={{

                height: 180,
                width: 180,
                alignSelf: 'center',
                marginTop: '32%'

            }}></Image>

            <Text style={styles.title}>목표 생성이 완료되었습니다</Text>
            <Text style={styles.subtitle}>목표를 지킬 수 있도록 노력해 주세요!</Text>

            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => {
                    try {
                        purposeService.create(purpose);

                        navigation.navigate('MainNavigation', {
                            screen: 'Home',
                            params: {
                                screen: 'PlanView',
                                params: {
                                    purpose: purpose
                                }
                            }
                        })
                    } catch (e) {
                        console.log(e);
                    }
                }}
            //버튼
            >
                <View style={{
                    width: 240,
                    height: '32%',
                    backgroundColor: '#55d517',
                    borderRadius: 40,
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>확        인</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}





const purposeStyles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },

    titleContainer: {
        marginHorizontal: 20,
        marginVertical: 5,
        marginTop: 20
    },

    title: {
        fontSize: 25
    },

    subtitle: {
        fontSize: 15,
        color: 'gray'
    },

    bottomContainer: {
        width: "91%",
        marginHorizontal: 20,
        marginVertical: 5
    }

});