import React, { Component } from 'react';
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
import { inject } from 'mobx-react';


@inject(['authStore'])
export default class StoryBlock extends Component{
    constructor(props){
        super(props);

        this.state = {
           data : props.data
        }

        this.navigation = this.props.navigation;
        this.authStore = this.props.authStore;
    }

    _toggleLikes = async () => {
        try {

            this.state.data.canLikes = !this.state.data.canLikes;
            this.state.data.likesCount = !this.state.data.canLikes ? this.state.data.likesCount + 1 : this.state.data.likesCount - 1;
            this.setState({
                data : this.state.data
            })

            const response = await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${this.state.data.id}/likes/${this.state.data.canLikes ? 'negative' : 'positive'}`)
                .auth(await this.authStore.getToken())
                .submit();


        } catch (e) {
            console.log(e);
            this.state.data.canLikes = !this.state.data.canLikes;
            this.state.data.likesCount = !this.state.data.canLikes ? this.state.data.likesCount + 1 : this.state.data.likesCount - 1;
            this.setState({
                data : this.state.data
            })

        }
    }

    render(){
        return (
            <View style={{ height: 300, width: '100%', borderRadius: 10, backgroundColor: 'white' }}>
                <View style={{ flex: 1, paddingHorizontal: 15, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
                        <ProfileWidget user={this.state.data.author} disabled={true} />
                        <TimeAgo time={this.state.data.createDate} />
                    </View>
                    <TouchableOpacity
                        style={{ width: '100%', height: '100%'}}
                        activeOpacity={1}
                        onPress={this.props.onPress}>
                        <View>
                            <View style={{ alignItems: 'center' ,paddingBottom: 12 }}>
                                <Text style={styles.titleFont}>
                                    {this.state.data.title}
                                </Text>
                            </View>
                            <Text numberOfLines={5} style={styles.contentFont}>
                                {this.state.data.content}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ positoin: 'absolute', bottom: 18, left: 15, flexDirection: 'row', alignItems: 'center', elevation: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <ImageButton
                            imageStyle={{ width: 26, height: 27, tintColor: !this.state.data.canLikes ? 'red' : '#888888' }}
                            source={!this.state.data.canLikes? require('../../../../asset/button/heart_button.png') : require('../../../../asset/button/unheart_button.png')}
                            onPress={this._toggleLikes}
                        />
                        <Text style={styles.scoreText}>
                        {this.state.data.likesCount}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justfiyContent: 'center', marginLeft:15}}>
                        <ImageButton
                            imageStyle={{ tintColor: 'black', width: 24, height: 25, marginTop: 3, tintColor : '#888888'}}
                            source={require('../../../../asset/button/comment_button.png')}
                            onPress={() => {
                                this.props.navigation.navigate('CommnetView', {
                                    entity: Model.STORY,
                                    id: this.state.data.id
                                })
                            }}
                        />
                        <Text style={styles.scoreText}>
                            {this.state.data.commentCount}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    {/* <TouchableOpacity onPress={onPress}>
                        <Text style={{color: '#777777'}}>더 보기</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
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
        color: 'black',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 15,
        paddingHorizontal: 5
    },
    scoreText: {
        fontSize: 12,
        alignSelf:'flex-end',
        marginLeft: 9,
        marginBottom: 3
    }
})