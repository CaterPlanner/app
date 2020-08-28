import React from 'react';
import { ScrollView, View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import RoundButton from '../../../../atom/button/RoundButton';
import MyProgressBar from '../../../../atom/progressBar/MyProgressBar'
import InfoLebel from '../../../../atom/text/InfoLabel';
import ImageButton from '../../../../atom/button/ImageButton';

import ParallaxScrollView from 'react-native-parallax-scroll-view';



export default function UserProfile({ navigation, data }) {

    const succeesCount = 0;

    data.purposeList.forEach((purpose) => {
        if(purpose.stat == 2)
            succeesCount++;
    })

    const succeesPer = Math.round((succeesCount / data.purposeList.length) * 100);

    

    return (
        <ParallaxScrollView
            parallaxHeaderHeight={Dimensions.get('window').height * 0.23}
            renderBackground={() => {
                return(
                <View style={userProfileStyles.backgroundImageContainer}>
                    <Image
                        resizeMode="stretch"
                        style={{ flex: 1, width: "100%", height: undefined }}
                        source={{ uri: data.backImageUrl }} />
                </View>)
            }}
        >
            <View style={{backgroundColor:'#F8F8F8'}}>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                        alignItems: 'center'
                    }}>
                    <View style={{ position: 'absolute', top: -50, alignSelf: 'center' }}>
                        <Image source={{ uri: data.profileUrl }} style={userProfileStyles.profileImage} />
                    </View>
                    <View style={userProfileStyles.infoContainer}>
                        <Text style={userProfileStyles.userNameFont}>
                            {data.name}
                        </Text>
                        <View style={userProfileStyles.statLabelContainer}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <InfoLebel title={'목적 성공률'} value={succeesPer} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <InfoLebel title={'성공한 목적'} value={succeesCount} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <InfoLebel title={'도움 횟수'} value={'준비중'} />
                            </View>
                        </View>
                        <View style={userProfileStyles.editProfileButtonContainer}>
                            <RoundButton
                                text={'프로필 수정'}
                                color={'#25B046'}
                                width={120}
                                height={30}
                                textStyle={
                                    { color: 'white', textAlign: 'center' }
                                }
                            />
                        </View>
                    </View>
                </View>
                <View style={userProfileStyles.userBoxContainer}>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 9, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17 }}>
                            캐티포인트 보유
                    </Text>
                        <Text>
                            도움말
                    </Text>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: 'white' }}>
                        <View style={{ marginBottom: 7, flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
                            <Text style={userProfileStyles.caterpointBox_rankFont}>
                                상위 {data.catePointPercentile}%
                                </Text>
                            <Text style={userProfileStyles.caterpointBox_pointFont}>
                                {data.catePoint} pts
                                </Text>
                        </View>
                        <MyProgressBar
                            value={30} height={7} width={Dimensions.get('window').width - 18} animated={true} barColor={'yellow'} backgroundColor={'#F2F2F2'}
                        />
                    </View>
                </View>
                <View style={userProfileStyles.userBoxContainer}>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 15, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17 }}>
                            목적 {data.purposeList.length}개 보기
                    </Text>
                        <ImageButton
                            imageStyle={{
                                width: 13,
                                height: 20
                            }}
                            source={require('../../../../../../../asset/button/next_button.png')}
                        />
                    </View>
                </View>
            </View>
        </ParallaxScrollView>
    )
}



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