import React, {Component} from 'react';
import {View, FlatList, TextInput} from 'react-native';
import Comment from '../../../molecule/Comment'
import EasyDate from '../../../../util/EasyDate';
import ImageButton from '../../../atom/button/ImageButton';
import { inject } from 'mobx-react';
import { Model } from '../../../../AppEnum';
import GlobalConfig from '../../../../GlobalConfig';


//https://stackoverflow.com/questions/31475187/making-a-multiline-expanding-textinput-with-react-native
@inject(['authStore'])
export default class CommentView extends Component{

    constructor(props){
        super(props);

        this.state = {
            data : [],
            isLoading : false,
            page: 0,
            commentText : null
        }

        this.authStore = this.props.authStore;
        this.isFinish = false;


        switch(this.props.route.params.entity){
            case Model.PURPOSE:
                this.entityName = 'purpose';
                this.entityCommentName = 'purposeComment'
                break;
            case Model.STORY:
                this.entryName = 'story';
                this.entityCommentName = 'storyComment';
                break;
        }

        this.id = this.props.route.params.id;
    }

    _loadData = async () => {
        try{
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityName}/${this.id}/comments?page=${this.state.page}`, null, null, 8000)
            .auth(this.authStore.userToken.token)
            .submit();

            this.isFinish = response.data.final;

            this.setState({
                data : this.state.data.concat(response.data.elements),
                isLoading : false
            })
        }catch(e){
            console.log(e);

            this.setState({
                isLoading : false
            })
        }
    }
    
    _loadMore = () => {
        if(this.isFinish || this.state.isLoading)
            return;

        this.setState({
            page : this.state.page + 1,
            isLoading : true
        }, this._loadData)
    }

    _renderFooter = () => {
        return(
            this.state.isLoading ? 
            <View style={{height: 210, width: '100%'}}>
               <Loader/>
            </View> : null
       );
    }

    _postComment = async () => {

        try{
            await  Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityCommentName}`)
            .auth(this.authStore.userToken.token)
            .submit();

            this.isFinish = false;
            this._loadMore();

        }catch(e){
            console.log(e);
        }

    }

    componentDidMount(){
        this.setState({
            isLoading : true
        }, this._loadData)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <FlatList
                    style={{flex: 1}}
                    data={this.state.data}
                    renderItem={({item : comment}) => (
                        <Comment
                            user={comment.user}
                            createDate={new EasyDate(comment.createDate)}
                            content={comment.content}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    onEndReached={this._loadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={this._renderFooter}
                />
                <View style={{flex:1}}/>
                <View style={{width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', padding: 10, elevation: 5}}> 
                    <TextInput
                            numberOfLines={1}
                            placeholder={'댓글 입력하기'}
                            multiline={true}
                            style={{
                                backgroundColor:'#E9E9E9',
                                fontSize: 15,
                                textAlign:'left',
                                padding:4,
                                paddingLeft: 10,
                                borderRadius: 18,
                                width: '85%',
                            }}
                            onChangeText={text => setState({commentText : text})}
                            value={this.state.commentText}
                    />
                    <ImageButton
                        backgroundStyle={{
                            backgroundColor:'#25B046',
                            width:48,
                            height:35,
                            borderRadius:15
                        }}
                        imageStyle={{
                            width:25,
                            height:23
                        }}
                        source={require('../../../../../../asset/button/send_button.png')}
                        onPress={() => {
                            this.state({
                                commentText : null
                            }, this._postComment);
                        }}
                    />
                </View>
            </View>
        )
    }
}
