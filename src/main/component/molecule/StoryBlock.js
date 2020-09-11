import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ImageButton from '../atom/button/ImageButton';
import GlobalConfig from '../../GlobalConfig';
import TimeAgo from '../atom/text/TimeAgo';
import ProfileWidget from './ProfileWidget';
import EasyDate from '../../util/EasyDate';
import Request from '../../util/Request'
import useStores from '../../mobX/helper/useStores';
import { useNavigation } from '@react-navigation/native';
import { Model } from '../../AppEnum';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function StoryBlock({ data, onPress }) {

    // data = {
    //     id: 0,
    //     title: '달리기하는데 숨차 죽을뻔 함;;',
    //     content: 
    //     '솔직히 한번에 8km 속도로 10km 달리기 하는거 \n시간은 얼마나 걸릴지 몰라도 죽을 거 같잖어 안그래?\nㅇㄴㄹㄴㅇㄹㄴㅇㄹ',
    //     type: 0,
    //     commentCount : 5,
    //     likesCount : 3,
    //     canLikes: false,
    //     createDate: EasyDate.now().minusDays(17),
    //     author : {
    //         id: 1,
    //         name: '사용자',
    //         profileUrl: 'https://itcm.co.kr/files/attach/images/813/931/364/e2717f5d0ac1131302ff3eaba78f99ed.jpg'
    //     }

    // }
    const naviagation = useNavigation();
    const { authStore } = useStores();
    const [isLikes, setIsLikes] = useState(!data.canLikes)

    const toggleLikes = async () => {
        try {

            setIsLikes(!isLikes);

            const response = await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${data.id}/likes/${isLikes ? 'negative' : 'positive'}`)
                .auth(await authStore.getToken())
                .submit();
        } catch (e) {
            console.log(e);
            setIsLikes(!isLikes);

        }
    }


    return (
        <View>
            <TouchableOpacity
                activeOpacity={1}
                style={{ height: 270, borderRadius: 10, paddingHorizontal: 15, backgroundColor: 'white', paddingVertical: 12, width: '100%' }}
                onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                    <ProfileWidget user={data.author} disabled={true} />
                    <TimeAgo time={data.createDate} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.titleFont}>
                        {data.title}
                    </Text>
                </View>
                <Text numberOfLines={5} style={styles.contentFont}>
                    {data.content}
                </Text>
            </TouchableOpacity>
            <View style={{ positoin: 'absolute', bottom: 35, left: 15,  flexDirection: 'row', elevation: 5 }}>
                <View style={{ flexDirection: 'row', justfiyContent: 'center' }}>
                    <ImageButton
                        imageStyle={{ width: 22, height: 20, tintColor: isLikes ? 'blue' : '#9D9D9D' }}
                        source={require('../../../../asset/icon/likes_icon.png')}
                        onPress={toggleLikes}
                    />
                    {/* <Text style={styles.scoreText}>
                    {data.likesCount}
                    </Text> */}
                </View>
                <View style={{ flexDirection: 'row', justfiyContent: 'center', marginLeft: 20 }}>
                    <ImageButton
                        imageStyle={{ tintColor: '#9D9D9D', width: 22, height: 20 }}
                        source={require('../../../../asset/button/comment_button.png')}
                        onPress={() => {
                            naviagation.navigate('CommnetView', {
                                entity: Model.STORY,
                                id: data.id
                            })
                        }}
                    />
                    {/* <Text style={styles.scoreText}>
                        {data.commentCount}
                    </Text> */}
                </View>
                <View style={{ flex: 1 }} />
                {/* <TouchableOpacity onPress={onPress}>
                    <Text style={{color: '#777777'}}>더 보기</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userNameFont: {
        fontSize: 15,
        marginHorizontal: 5
    },
    uploadTimeFont: {
        fontSize: 12,
        color: '#656565'
    },
    titleFont: {
        fontSize: 16,
        marginVertical: 5,
        borderBottomWidth: 1.5,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    contentFont: {
        color: '#323232',
        fontSize: 14,
        marginTop: 30,
        lineHeight: 20
    },
    scoreText: {
        fontSize: 15,
        marginBottom: 3,
        marginLeft: 9
    }
})