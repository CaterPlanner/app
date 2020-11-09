import React, { Component } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Image, Modal, Text, Keyboard } from 'react-native';
import Comment from '../../../molecule/Comment'
import EasyDate from '../../../../util/EasyDate';
import ImageButton from '../../../atom/button/ImageButton';
import { inject } from 'mobx-react';
import { Model, LoadType } from '../../../../AppEnum';
import GlobalConfig from '../../../../GlobalConfig';
import Loader from '../../../page/Loader';
import Request from '../../../../util/Request'
import MyTextInput from '../../../atom/input/MyTextInput';

//https://stackoverflow.com/questions/31475187/making-a-multiline-expanding-textinput-with-react-native



@inject(['authStore'])
export default class CommentView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            wait: false,
            isLoading: false,
            isLordMore: true,
            page: 0,
            commentText: '',
            isCommentAction: false,
            commentHeight: 0,
            keyboardSpaceHeight: 0
        }

        this.authStore = this.props.authStore;

        switch (this.props.route.params.entity) {
            case Model.PURPOSE:
                this.entityName = 'purpose';
                this.entityCommentName = 'purposeComment'
                break;
            case Model.STORY:
                this.entityName = 'story';
                this.entityCommentName = 'storyComment';
                break;
        }

        this.id = this.props.route.params.id;
    }

    _loadData = async () => {
        try {

            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityName}/${this.id}/comments?page=${this.state.page}`, null, null, 8000)
                .auth(await this.authStore.getToken())
                .submit();

            const include = this.state.loadType == LoadType.UPLOAD ? { commentText: '' } : {};


            this.setState({
                data: this.state.loadType == LoadType.MORE ? this.state.data.slice(0, this.state.page * 15).concat(response.data.elements) : response.data.elements,
                isLoading: false,
                isFinish: response.data.isFinal,
                loadType: null,
                ...include
            })



        } catch (e) {
            console.log(e);

            this.setState({
                isLoading: false,
                loadType: null
            })
        }
    }

    _loadMore = () => {

        if (this.state.isFinish || this.state.isLoading)
            return;


        this.setState({
            page: this.state.page + 1,
            loadType: LoadType.MORE,
            isLoading: true,
        }, this._loadData);

    }

    _renderFooter = () => {
        return (
            this.state.isLoading && this.state.loadType != LoadType.UPLOAD ?
                <View style={{ height: 210, width: '100%' }}>
                    <Loader />
                </View> : null
        );
    }

    _removeComment = async () => {
        try {
            const comment = this.state.data[this.state.selectedIndex];
            this.state.data.splice(this.state.selectedIndex, 1);

            await Request.delete(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityCommentName}/${comment.id}`)
                .auth(await this.authStore.getToken())
                .submit();



            this.setState({
                data: this.state.data,
                page: Math.floor(this.state.selectedIndex / 15),
                loadType: LoadType.MORE,
                isLoading: true
            }, this._loadData)



        } catch{

        }
    }

    _postComment = async () => {
        try {
            //page 이용

            this.flatList.scrollToOffset({ animated: true, offset: 0 });

            const commentText = this.state.commentText;

            const resource = {
                content: commentText
            }

            this.setState({
                commentText: ''
            })

            switch (this.props.route.params.entity) {
                case Model.PURPOSE:
                    resource.purposeId = this.id;
                    break;
                case Model.STORY:
                    resource.storyId = this.id;
                    break;
            }


            await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityCommentName}`, JSON.stringify(resource))
                .auth(await this.authStore.getToken())
                .submit();


            this.setState({
                page: 0,
                isFinish: false,

            }, this._loadData)


        } catch (e) {
            console.log(e);

            this.setState({
                isLoading: false,
                loadType: null
            })
        }

    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        }, this._loadData)
    }

    componentWillMount(){
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', (e) => {
            this.setState({
                keyboardSpaceHeight: e.endCoordinates.height
            })
        });
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', (e) => {
            this.setState({
                keyboardSpaceHeight : 0
            })
        });
    }
    
    componentWillUnmount(){
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }


    render() {

        const commentSendDisabled = !(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g).test(this.state.commentText);
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Modal
                    transparent={true}
                    visible={this.state.isCommentAction}
                >
                    <TouchableOpacity style={{
                        backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end'
                    }}
                        onPress={() => {
                            this.setState({
                                isCommentAction: false,
                                selectedIndex: null
                            })
                        }}
                    >
                        <View style={{
                            backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopRightRadius: 10,
                            borderTopLeftRadius: 10
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isCommentAction: false,
                                    }, this._removeComment)
                                }}
                                style={{ paddingVertical: 10 }}>
                                <Text>삭제하기</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <FlatList
                    ref={(ref) => { this.flatList = ref; }}
                    style={{ flex: 1 }}
                    inverted={true}
                    data={this.state.data}
                    renderItem={({ item: comment, index }) => (
                        <View style={{ paddingHorizontal: 10 }}>
                            <Comment
                                user={comment.user}
                                createDate={new EasyDate(comment.createDate)}
                                content={comment.content}
                                onLongPress={() => {
                                    if (!comment.owner)
                                        return;

                                    this.setState({
                                        isCommentAction: true,
                                        selectedIndex: index

                                    })
                                }}

                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={this._renderFooter}
                />
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 12, elevation: 15 }}>
                        <View style={{
                            backgroundColor: '#E9E9E9',
                            width: '85%',
                            paddingLeft: 10,
                            paddingVertical: 4,
                            borderRadius: 18,
                        }}>
                            <MyTextInput
                                autoCorrect={false}
                                placeholder={'댓글 입력하기'}
                                multiline={true}
                                maxLine={12}
                                textStyles={{
                                    fontSize: 15,
                                    lineHeight: 20,
                                    textAlign: 'left'
                                }}
                                // backgroundStyles={{
                                //     flex: 1
                                // }}
                                onChangeText={text => this.setState({ commentText: text })}
                                value={this.state.commentText}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: commentSendDisabled || this.state.loadType == LoadType.UPLOAD ? '#E9E9E9' : '#25B046',
                                width: 48,
                                height: 38,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'flex-end'
                            }}
                            onPress={() => {
                                this.setState({
                                    loadType: LoadType.UPLOAD,
                                    isLoading: true
                                }, this._postComment)
                            }}
                            disabled={commentSendDisabled || this.state.loadType == LoadType.UPLOAD}
                        >
                            {this.state.loadType == LoadType.UPLOAD ?
                                <Loader style={{ flex: 1 }} /> :
                                <Image
                                    style={{
                                        width: 25,
                                        height: 23
                                    }}
                                    source={require('../../../../../../asset/button/send_button.png')}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{height: this.state.keyboardSpaceHeight}}/>
            </View>
        )
    }
}


