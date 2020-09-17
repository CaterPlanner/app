import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import GlobalConfig from '../../../../GlobalConfig';
import Loader from '../../Loader';
import Request from '../../../../util/Request';
import EasyDate from '../../../../util/EasyDate';
import { inject } from 'mobx-react';
import ImageButton from '../../../atom/button/ImageButton';
import PurposeBox from '../../../atom/button/PurposeBox';
import CaterPlannerResult from '../../../organism/CaterPlannerResult';
import { ResultState, LoadType } from '../../../../AppEnum';




@inject(['authStore'])
export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            data: [],
            isFinish: false,
            isTimeout : false,
            page: 0,
        }

        this.authStore = this.props.authStore;
        this.isFinish = false;

    }

    _search = () => {
        if (this.state.isLoading)
            return;


        this.setState({
            page: 0,
            loadType : LoadType.SEARCH,
            isLoading : true,
            prefix : this.state.text
        }, this._loadData)
    }

    _refreshing = () => {

        if (this.state.isLoading)
            return;


        this.setState({
            page: 0,
            isLoading : true,
            loadType : LoadType.REFRESH
        }, this._loadData)

    }

    _loadData = async () => {

        // if(this.isFinish || this.state.isLoading)
        //     return;

        try {

            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose?page=${this.state.page + (this.state.prefix ? `&prefix=${this.state.prefix}` : '')}`, null, null, 8000)
                .auth(await this.authStore.getToken())
                .submit();

            this.isFinish = response.data.final;

            this.setState({
                data: this.state.loadType == LoadType.REFRESH || this.state.loadType == LoadType.SEARCH ? response.data.elements : this.state.data.concat(response.data.elements),
                isLoading: false,
                isFinish: response.data.final,
            })
        } catch (e) {
            console.log(e);

            this.setState({
                isLoading: false,
                isTimeOut : true
            })
        }
    }

    _handleLoadMore = () => {
        if (this.state.isFinish || this.state.isLoading)
            return;

        this.setState({
            page: this.state.page + 1,
            loadType : LoadType.MORE,
            isLoading: true
        }, this._loadData)
    }

    _renderFooter = () => {
        return (
            this.state.isLoading  && (this.state.loadType == LoadType.MORE || this.state.loadType == LoadType.SEARCH)?
                <View style={{ height: 210, width: '100%' }}>
                    <Loader />
                </View> : null
        );
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
            loadType : LoadType.MORE
        }, this._loadData)
    }


    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={{backgroundColor:'white'}}>
                <View style={styles.searchContainer}>
                    <TextInput
                        numberOfLines={1}
                        maxLength={40}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            fontSize: 15,
                            paddingLeft: 0,
                            paddingBottom : 0,
                            color : 'black',
                        }}
                        onSubmitEditing={() => {
                            this.setState({
                                data : []
                            },this._search)
                        }}
                        placeholder={'검색하시고 싶은 목적 이름을 입력해주세요'}
                        onChangeText={
                            text => this.setState({ text: text })
                        }
                        value={this.state.text}
                    />
                    <ImageButton
                        source={require('../../../../../../asset/button/search_button.png')}
                        imageStyle={{
                            width: 25,
                            height: 25,
                            tintColor : 'black'
                        }}
                        onPress={() => {this.setState({
                            data : []
                        },this._search)}}
                    />
                </View>
                </View>
                {(() => {
                    if(!this.state.isLoading && this.state.isTimeOut){
                        return <CaterPlannerResult 
                        backgroundStyle={{flex:1}}           
                        state={ResultState.TIMEOUT}
                        reRequest={()=>{
                            this.setState({
                                isLoading: true,
                                loadType : LoadType.MORE
                            }, this._loadData)
                        }}
                        />
                    }else if(!this.state.isLoading && this.state.data.length == 0){
                        return <CaterPlannerResult backgroundStyle={{flex:1}}state={ResultState.NOTFOUND}  text={'검색 결과가 없습니다.'}/>
                    }else{
                        return <FlatList
                        style={{ flex: 1, backgroundColor:undefined}}
                        data={this.state.data}
                        renderItem={({ item }) => {
                            return (
                            <View style={{
                                marginBottom: 10 
                            }}>
                                <PurposeBox
                                    data={item}
                                    onPress={() => {
                                        this.props.navigation.push('LoadUserPurpose', {
                                            id : item.id
                                        })
                                    }}
                                />
                            </View>)
                        }}
                        keyExtractor={(item, index) => index}
                        onEndReached={this._handleLoadMore}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={this._renderFooter}
                        onRefresh={this._refreshing}
                        refreshing={this.state.isLoading && this.state.loadType == LoadType.REFRESH}
                    />

                    }
                })()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: { 
        marginVertical: 10,
        paddingBottom: 2,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#888888',
        borderBottomWidth: 1,
    },
    inputBox: {

    }
})