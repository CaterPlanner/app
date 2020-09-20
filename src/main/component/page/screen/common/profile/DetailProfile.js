import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import InfoBox from '../../../../molecule/InfoBox';
import PurposePaper from '../../../../atom/button/PurposePaper';
import { useNavigation } from '@react-navigation/native';
import CaterPlannerResult from '../../../../organism/CaterPlannerResult';
import { ResultState } from '../../../../../AppEnum';


const userImage = 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png'
const userName = '사용자'

const purposePercentage = '65'
const succeedPercentag = '13'
const helpCount = '195'




export default function UserProfile({ data }) {

    const navigation = useNavigation();


    return (
        <ScrollView style={{ style: 1 }}>
            <View style={styles.body}>

                {/* 프로필 사진 */}
                <Image
                    style={{
                        height: 90, width: 90, borderRadius: 100, marginTop: 20,
                        justifyContent: 'center', alignSelf: 'center'
                    }}
                    source={{ uri: data.profileUrl }} />

                {/* 사용자 명 */}
                <Text style={{ fontSize: 20, textAlign: 'center', width: '100%', marginTop: 20 }}>
                    {data.name}
                </Text>

                {/* 정보들 */}
                <View style={{ width: '100%', alignItems: 'center', marginTop: 15, marginBottom: 25, flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{data.successPer}%</Text>
                        <Text style={{ marginTop: 5, fontSize: 13, color: '#676767' }}>목적 성공률</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{data.successCount}</Text>
                        <Text style={{ marginTop: 5, fontSize: 13, color: '#676767' }}>성공한 목적</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{'준비중'}</Text>
                        <Text style={{ marginTop: 5, fontSize: 13, color: '#676767' }}>도움 횟수</Text>
                    </View>

                </View>
            </View>

            {/* 사용자 목적, 모든 목적 보기 */}
            <View style={{marginTop: 5}}>
                <InfoBox
                    title={'수행중 목적'}
                    detailButtonHint={'전체 목적보기'}
                    detailButtonPress={() => {
                        navigation.push('UserPurposeList', {
                            id: data.id
                        });
                    }}
                >
                    <View >
                        {data.purposeList.length == 0 ?
                            <CaterPlannerResult
                                backgroundStyle={{ height: 350 }}
                                state={ResultState.NOTHING}
                                text={'현재 수행중인 목적이 없습니다.'}
                            /> :
                            <View style={{ paddingRight: 10, paddingLeft: 2, paddingVertical: 10 }}>
                                {data.purposeList.map((purpose) => (
                                    <View style={{ marginTop: 12 }}>
                                        <PurposePaper
                                            imageUri={purpose.photoUrl}
                                            name={purpose.name}
                                            checkedBriefing={false}
                                            onPress={() => {
                                                navigation.push('LoadUserPurpose', {
                                                    id: purpose.id
                                                });
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>
                        }</View>

                </InfoBox>
            </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({


    body: {

        backgroundColor: 'white',
        flexDirection: 'column',


    },

    leg: {

        backgroundColor: 'aqua',
        height: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#C0C0C0',
        flexDirection: 'row',

    }

})


const userProfileStyles = StyleSheet.create({
    backgroundImageContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.23,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    infoContainer: {
        marginTop: 50 + 22,
        width: '100%',
        alignItems: 'center'
    },
    userNameFont: {
        fontSize: 22
    },
    statLabelContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 38,
        marginTop: 16
    },
    editProfileButtonContainer: {
        paddingVertical: 20
    },
    userBoxContainer: {
        marginTop: 7
    },
    caterpointBox_rankFont: {
        fontSize: 13
    },
    caterpointBox_pointFont: {
        fontSize: 17
    }
})