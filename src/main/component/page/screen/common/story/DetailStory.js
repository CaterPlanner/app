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
import Request from '../../../../../util/Request';
import Comment from '../../../../molecule/Comment';
import { Model } from '../../../../../AppEnum';

@inject(['authStore'])
export default class DetailStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: null
        };


        this.authStore = this.props.authStore;
    }

    _toggleLikes = async () => {
        try {
            this.setState({
                isLikes: !this.state.isLikes,
                likesCount : !this.state.isLikes ? this.state.likesCount + 1 : this.state.likesCount - 1
            })

            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${this.state.data.id}/likes/${this.state.isLikes ? 'negative' : 'positive'}`)
                .auth(await this.authStore.getToken())
                .submit();


        } catch (e) {
            console.log(e);

            // this.setState({
            //     isLikes: !this.state.isLikes,
            //     likesCount : !this.state.isLikes ? this.state.likesCount + 1 : this.state.likesCount - 1
            // })
        }
    }

    _loadData = async () => {

        try {
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${this.props.route.params.id}`).auth(await this.props.authStore.getToken()).submit();

            this.setState({
                isLoading: false,
                data: response.data,
                isLikes: !response.data.canLikes,
                likesCount : response.data.likesCount
            });

        } catch (e) {
            console.log(e);
            this.props.navigation.goBack();
        }

    }

    _storyDelete = async () => {
        try{
            await Request.delete(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${this.state.data.id}`)
            .auth(await this.props.authStore.getToken()).submit();
    
            this.props.navigation.goBack();
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount() {

        this._loadData();
        this.props.navigation.setParams({
            showStoryMenu: this._storyControlMenuRef.show
        })
        this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading : true
            }, this._loadData)
        })
    }

    componentWillUnmount(){
        this.props.navigation.removeListener('focus');
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Menu
                        ref={ref => { this._storyControlMenuRef = ref }}>
                        {!this.state.isLoading && this.state.data.isOwner && (
                            <View>
                                <MenuItem onPress={() => {
                                    this._storyControlMenuRef.hide();

                                    this.props.navigation.navigate('WriteStory', {
                                        purpose: this.state.data.purpose,
                                        story: this.state.data
                                    });


                                }}>수정하기</MenuItem>
                                <MenuDivider />
                                <MenuItem onPress={() => {
                                    this._storyControlMenuRef.hide();
                                    this._storyDelete();
                                }}>삭제하기</MenuItem>
                                <MenuDivider /></View>)
                        }
                        <MenuItem onPress={() => {
                            this._storyControlMenuRef.hide();

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
                                        user={this.state.data.author}/>
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
                                    <TouchableOpacity style={{ marginTop: 30, marginBottom: 20, flexDirection: 'row', elevation: 5, height: 90, width: '100%', backgroundColor: 'white', marginVertical: 10 }}
                                        onPress={() => {
                                            this.props.navigation.navigate('LoadUserPurpose', {
                                                id: this.state.data.purpose.id
                                            })
                                        }}
                                    >
                                        <Image
                                            resizeMode="stretch"
                                            source={{ uri: this.state.data.purpose.photoUrl }}
                                            style={{
                                                height: '100%',
                                                width: 90,
                                            }}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.purposeNameFont}>{this.state.data.purpose.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 0.3, borderTopWidth: 0.3, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'white', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.scoreFont}>
                                    좋아요 {this.state.likesCount}
                                </Text>
                                <Text style={styles.scoreFont}>
                                    댓글 {this.state.data.commentCount}
                                </Text>
                            </View>
                            {
                                this.state.data.comments.map((comment) => (
                                    <View style={{ marginVertical: 10 }}>
                                        <Comment
                                            user={comment.user}
                                            createDate={new EasyDate(comment.createDate)}
                                            content={comment.content}
                                        />
                                    </View>
                                ))
                            }

                        </ScrollView >
                        <View style={{ backgroundColor: 'white', paddingVertical: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <ImageButton
                                backgroundStyle={{
                                    marginLeft: 20
                                }}
                                imageStyle={{ width: 27, height: 25, tintColor: this.state.isLikes ? 'blue' : '#9D9D9D' }}
                                source={require('../../../../../../../asset/icon/likes_icon.png')}
                                onPress={this._toggleLikes}
                            />

                            <ImageButton
                                backgroundStyle={{
                                    marginLeft: 20
                                }}
                                imageStyle={{ width: 27, height: 25, tintColor :'#9D9D9D' }}
                                source={require('../../../../../../../asset/button/comment_button.png')}
                                onPress={() => {
                                    this.props.navigation.navigate('CommnetView', {
                                        entity: Model.STORY,
                                        id: this.state.data.id
                                    })
                                }}
                            />
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
    },
    scoreFont: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})