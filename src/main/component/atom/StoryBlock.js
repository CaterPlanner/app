import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImageButton from './button/ImageButton';
import EasyDate from '../../util/EasyDate';
import GlobalConfig from '../../GlobalConfig';
import TimeAgo from './text/TimeAgo';

export default function StoryBlock({data}){

    // story = {
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

    const [isLikes , setIsLikes] = useState(!data.canLikes)

    const toggleLikes = async () => {
        try{
            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${data.id}/likes/${isLikes ? 'negative' : 'positive'}`)
            setIsLikes(!isLikes);
        }catch(e){
            console.log(e);
        }
    }


    return(
        <View style={{paddingHorizontal: 15, elevation: 5, backgroundColor: 'white', paddingVertical: 12, height: 210, width:'100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                <ImageButton
                    backgroundStyle={{marginRight: 10}}
                    imageStyle={{width : 42, height: 42, borderRadius: 42}}
                    source={{uri : data.author.profileUrl}}
                />
                <Text style={styles.userNameFont}>
                    {data.author.name}
                </Text>
                <TimeAgo style={styles.uploadTimeFont} time={data.createDate}/>
            </View>
            <Text numberOfLines={1} style={styles.titleFont}>
                {data.title}
            </Text>
            <Text  numberOfLines={2} style={styles.contentFont}>
                {data.content}
            </Text>
            <View style={{marginTop : 20, flexDirection:'row'}}>
                <View style={{flexDirection: 'row', justfiyContent:'center'}}>
                    <ImageButton
                        imageStyle={{width: 20, height: 18, tintColor : isLikes ? 'blue' : undefined}}
                        source={require('../../../../asset/button/comment_button.png')}
                        onPress={toggleLikes}
                    />
                    <Text style={styles.scoreText}>
                    {data.likesCount}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justfiyContent:'center', marginLeft: 10}}>
                    <ImageButton
                        imageStyle={{width: 20, height: 18}}
                        source={require('../../../../asset/button/comment_button.png')}
                    />
                    <Text style={styles.scoreText}>
                        {data.commentCount}
                    </Text>
                </View>
                <View style={{flex:1}}/>
                <TouchableOpacity>
                    <Text style={{color: '#777777'}}>더 보기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userNameFont:{
        fontSize : 15,
        marginHorizontal: 5
    },
    uploadTimeFont: {
        fontSize: 12,
        color: '#656565'
    },
    titleFont:{
        fontSize: 20,
        marginVertical: 10
    },
    contentFont:{
        fontSize: 13,
        height: 40
    },
    scoreText: {
        fontSize: 15,
        marginBottom : 3,
        marginLeft: 9
    }
})