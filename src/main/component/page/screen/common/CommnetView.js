import React, {Component} from 'react';
import {View, FlatList, TextInput} from 'react-native';
import Comment from '../../../molecule/Comment'
import EasyDate from '../../../../util/EasyDate';
import ImageButton from '../../../atom/button/ImageButton';
import { inject } from 'mobx-react';
import { Model } from '../../../../AppEnum';
import GlobalConfig from '../../../../GlobalConfig';
import Loader from '../../../page/Loader';
import Request from '../../../../util/Request'

//https://stackoverflow.com/questions/31475187/making-a-multiline-expanding-textinput-with-react-native
@inject(['authStore'])
export default class CommentView extends Component{

    constructor(props){
        super(props);

        this.state = {
            data : [],
            isLoading : false,
            isLordMore : true,
            page: 0,
            commentText : null
        }

        this.authStore = this.props.authStore;
        this.isFinish = false;

        console.log(this.props.route.params)
        switch(this.props.route.params.entity){
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
        try{
            console.log(this.state.page);

            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityName}/${this.id}/comments?page=${this.state.page}`, null, null, 8000)
            .auth(this.authStore.userToken.token)
            .submit();


            this.isFinish = response.data.final;
            console.log(this.state.isLoadMore);
            console.log(this.state.data.slice(0, this.state.page * 15));

            this.setState({
                data : this.state.isLoadMore ? this.state.data.slice(0, this.state.page * 15).concat(response.data.elements) : response.data.elements,
                isLoading : false,
                isLoadMore : false
            })

    

        }catch(e){
            console.log(e);

            this.setState({
                isLoading : false,
                isLoadMore : false
            })
        }
    }
    
    _loadMore = () => {

        if(this.isFinish || this.state.isLoading)
            return;

        console.log('ISLOADMORE')

        this.setState({
            page : this.state.page + 1,
            isLoading : true,
            isLoadMore : true
        }, this._loadData);

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
            //page 이용
            this.flatList.scrollToOffset({ animated: true, offset: 0 });

            const commentText = this.state.commentText;

            const resource = {
                content : commentText
            }

            switch(this.props.route.params.entity){
                case Model.PURPOSE:
                    resource.purposeId = this.id;
                    break;
                case Model.STORY:
                    resource.storyId = this.id;
                    break;
            }


            await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${this.entityCommentName}`, JSON.stringify(resource))
            .auth(this.authStore.userToken.token)
            .submit();

            this.setState({
                commentText : null,
                isLoading : true,
                isLordMore : false,
                page : 0,
                isFinish : false
            }, this._loadData)


        }catch(e){
            console.log(e);

            this.setState({
                isLordMore : false,
                isLoading : false
            })
        }

    }

    componentDidMount(){
        this.setState({
            isLoading : true
        }, this._loadData)
    }

    render(){
        console.log("Dsfsdft :" + this.state.isLoadMore)
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <FlatList
                    ref={(ref) => {this.flatList = ref;}}
                    style={{flex: 1}}
                    inverted={true}
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
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={this._renderFooter}
                />
                <View style={{width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', padding: 10, elevation: 15}}> 
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
                            onChangeText={text => this.setState({commentText : text})}
                            value={this.state.commentText}
                    />
                    <ImageButton
                        disabled={this.state.commentText == ''}
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
                        onPress={this._postComment}
                    />
                </View>
            </View>
        )
    }
}
