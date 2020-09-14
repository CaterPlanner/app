import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native'
import StoryBlock from '../../../../molecule/StoryBlock';
import GlobalConfig from '../../../../../GlobalConfig';
import Loader from '../../../Loader';
import Request from '../../../../../util/Request';
import EasyDate from '../../../../../util/EasyDate';
import { inject } from 'mobx-react';

//https://www.youtube.com/watch?v=Jc2MX0Ew3PE&t=284s

@inject(['authStore'])
export default class PurposeStories extends Component{

    constructor(props){
        super(props);

        this.state = {
            data : [],
            isLoading : false,
            page: 0
        }

        this.authStore = this.props.authStore;
        this.isFinish = false;
    }

    _loadData = async () => {
        try{
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.props.route.params.purpose.id}/stories?page=${this.state.page}`, null, null, 8000)
            .auth(await this.authStore.getToken())
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
    
    _handleLoadMore = () => {
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

    componentDidMount(){
        this.setState({
            isLoading : true
        }, this._loadData)
    }

    render(){
        return(
            <View style={{flex: 1}}>
            <FlatList
                style={{flex: 1}}
                data={this.state.data}
                renderItem={({item}) => {
                    item.createDate = new EasyDate(item.createDate);
                    return (<View style={{marginBottom : 10, marginHorizontal: 10 }}><StoryBlock data={item} onPress={() => {
                        this.props.navigation.push('DetailStory', {
                            id : item.id
                        })
                    }}/></View>)
                }}
                keyExtractor={(item) => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={this._renderFooter}
            />
        </View>  
        )
    }
}

