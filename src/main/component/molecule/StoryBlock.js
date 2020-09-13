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
import SafeOverFlowText from '../atom/text/SafeOverFlowText';

export default function StoryBlock({ data, onPress }) {


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
        <View style={{ height: 280, width: '100%', borderRadius: 10, backgroundColor: 'white' }}>
            <View style={{ flex: 1, paddingHorizontal: 15, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
                    <ProfileWidget user={data.author} disabled={true} />
                    <TimeAgo time={data.createDate} />
                </View>
                <TouchableOpacity
                    style={{ width: '100%', height: '100%'}}
                    activeOpacity={1}
                    onPress={onPress}>
                    <View style={{ paddingBottom: 12 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.titleFont}>
                                {data.title}
                            </Text>
                        </View>
                        <Text numberOfLines={5} style={styles.contentFont}>
                            {data.content}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ positoin: 'absolute', bottom: 15, left: 15, flexDirection: 'row', elevation: 5 }}>
                <View style={{ flexDirection: 'row', justfiyContent: 'center' }}>
                    <ImageButton
                        imageStyle={{ width: 27, height: 28, tintColor: isLikes ? 'blue' : undefined }}
                        source={require('../../../../asset/icon/likes_icon.png')}
                        onPress={toggleLikes}
                    />
                    {/* <Text style={styles.scoreText}>
                    {data.likesCount}
                    </Text> */}
                </View>
                <View style={{ flexDirection: 'row', justfiyContent: 'center', marginLeft: 17 }}>
                    <ImageButton
                        imageStyle={{ tintColor: 'black', width: 25, height: 27, }}
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
        lineHeight: 20,
        marginTop: 15
    },
    scoreText: {
        fontSize: 15,
        marginBottom: 3,
        marginLeft: 9
    }
})