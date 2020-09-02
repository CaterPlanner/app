import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Loader from '../../../Loader';
import EasyDate from '../../../../../util/EasyDate';
import ProfileWidget from '../../../../molecule/ProfileWidget';
import TimeAgo from '../../../../atom/text/TimeAgo';
import GlobalConfig from '../../../../../GlobalConfig';
import ImageButton from '../../../../atom/button/ImageButton';
import { inject } from 'mobx-react';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';



@inject(['authStore'])
export default class DetailStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            data: {
                id: 0,
                title: '달리기하는데 숨차 죽을뻔 함;;',
                content:
                    '솔직히 한번에 8km 속도로 10km 달리기 하는거 \n시간은 얼마나 걸릴지 몰라도 죽을 거 같잖어 안그래?\nㅇㄴㄹㄴㅇㄹㄴㅇㄹ',
                type: 0,
                commentCount: 5,
                likesCount: 3,
                canLikes: false,
                createDate: EasyDate.now().minusDays(17),
                author: {
                    id: 1,
                    name: '사용자',
                    profileUrl: 'https://itcm.co.kr/files/attach/images/813/931/364/e2717f5d0ac1131302ff3eaba78f99ed.jpg'
                }
            },
            isLikes: false
        };


        this.authStore = this.props.authStore;
    }


    componentDidMount() {

        // Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${this.props.route.params.id}`)
        //     .then(response => {
        //         this.setState({
        //             isLoading: true,
        //             data: response.data
        //         })
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         this.props.navigation.goBack();
        //     })

        // this.navigation.setParams({
        //     showStoryMenu: this._storyControlMenuRef.show
        // })
        this._storyControlMenuRef.show();

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Menu
                        ref={ref => { this._storyControlMenuRef = ref }}>
                        <MenuItem onPress={() => {

                        }}>신고하기</MenuItem>
                    </Menu>
                </View>
                {this.state.isLoading ? <Loader /> : (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                    <ProfileWidget
                                        imageStyle={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 150
                                        }}
                                        fontStyle={{
                                            fontSize: 15
                                        }}
                                        profileUrl={this.state.data.author.profileUrl} name={this.state.data.author.name} />
                                    <TimeAgo time={EasyDate.now()} />
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={styles.titleFont}>
                                        {this.state.data.title}
                                    </Text>
                                </View>

                                <View style={{ marginHorizontal: 7 }}>
                                    <Text style={styles.contentFont}>
                                        {this.state.data.content}
                                    </Text>
                                    <TouchableOpacity style={{ marginTop: 30, marginBottom: 20, flexDirection: 'row', elevation: 5, height: 90, width: '100%', backgroundColor: 'white', marginVertical: 10 }}>
                                        <Image
                                            resizeMode="stretch"
                                            source={{ uri: 'https://i.pinimg.com/originals/cd/e8/cd/cde8cde6d49317fc58d01e783e5fbdef.png' }}
                                            style={{
                                                height: '100%',
                                                width: 90,
                                            }}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.purposeNameFont}>매일 한 시간씩 스토리 탤링하기</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* <Button
                            title={"댓글"}
                            onPress={() => {
                                this.props.navigation.navigate('CommentView', {
                                    entity: Model.STORY,
                                    id: this.state.data.id
                                })
                            }}
                        />
                        <Button
                            title={"좋아요"}
                            onPress={() => {
                                Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${this.state.data.id}/${this.state.isLikes ? 'negative' : 'positive'}`)
                                    .auth(this.authStore.userToken.token)
                                    .then(() => {
                                        this.setState({
                                            isLikes: !isLikes
                                        })
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    })
                            }}
                        /> */}
                        </ScrollView >
                        <View style={{ height: 40, backgroundColor: 'red' }}>
                            <View style={{ flexDirection: 'row', justfiyContent: 'center' }}>
                                <ImageButton
                                    imageStyle={{ width: 27, height: 25, tintColor: this.state.data.canLikes ? 'blue' : undefined }}
                                    source={require('../../../../../../../asset/icon/likes_icon.png')}
                                    onPress={() => {console.log('df')}}
                                />
                                {/* <Text style={styles.scoreText}>
                    {data.likesCount}
                    </Text> */}
                            </View>
                            <View style={{ flexDirection: 'row', justfiyContent: 'center', marginLeft: 20 }}>
                                <ImageButton
                                    imageStyle={{ width: 27, height: 25 }}
                                    source={require('../../../../../../../asset/button/comment_button.png')}
                                />
                                {/* <Text style={styles.scoreText}>
                        {data.commentCount}
                    </Text> */}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    titleFont: {
        color: '#000000',
        fontSize: 18,
        marginVertical: 5,
        borderBottomWidth: 1.5,
        paddingHorizontal: 10
    },
    contentFont: {
        color: '#323232',
        fontSize: 14,
        marginTop: 30
    },
    purposeNameFont: {
        fontSize: 17,
        marginHorizontal: 20,
        marginVertical: 15
    }
})