import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import InfoBox from '../../../../molecule/InfoBox';
import PurposePaper from '../../../../atom/button/PurposePaper';
import { useNavigation } from '@react-navigation/native';


const userImage = 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png'
const userName = '사용자'

const purposePercentage = '65'
const succeedPercentag = '13'
const helpCount = '195'




export default function UserProfile({ data }) {

    const navigation = useNavigation();
    let succeesCount = 0;

    data.purposeList.forEach((purpose) => {
        if(purpose.stat == 2)
            succeesCount++;
    })

    console.log(data);

    const succeesPer = succeesCount == 0 ? 0 :  Math.round((succeesCount / data.purposeList.length) * 100);

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
                        <Text style={{ fontSize: 16 }}>{succeesPer}%</Text>
                        <Text style={{ marginTop: 5, fontSize: 13, color: '#676767' }}>목적 성공률</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{succeesCount}</Text>
                        <Text style={{ marginTop: 5, fontSize: 13, color: '#676767' }}>성공한 목적</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{'준비중'}</Text>
                        <Text style={{ marginTop: 5, fontSize: 13, color: '#676767' }}>도움 횟수</Text>
                    </View>

                </View>
            </View>

            {/* 사용자 목적, 모든 목적 보기 */}
            <InfoBox
                title={'My 목적'}
                detailButtonHint={'모든 목적보기'}
                detailButtonPress={() => {
                    navigation.navigate('UserPurposeList', {
                        id : data.id
                    });
                }}
                child={
                    (
                        <View style={{paddingRight: 10, paddingLeft: 2, paddingVertical: 10}}>
                            {data.purposeList.map((purpose) => (
                                <View style={{ paddingVertical: 5}}>
                                    <PurposePaper
                                        imageUri={purpose.photoUrl}
                                        name={purpose.name}
                                        checkedBriefing={false}
                                        onPress={() => {
                                            navigation.navigate('LoadUserPurpose', {
                                                id : purpose.id
                                            });
                                        }}
                                    />
                                </View>
                            ))}
                           
                        </View>
                    )
                }
            />
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