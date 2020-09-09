import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import GlobalConfig from '../../../../GlobalConfig';
import Loader from '../../Loader';
import Request from '../../../../util/Request';
import EasyDate from '../../../../util/EasyDate';
import { inject } from 'mobx-react';
import ImageButton from '../../../atom/button/ImageButton';
import PurposeBox from '../../../atom/button/PurposeBox';

@inject(['authStore'])
export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            data: [],
            isRefreshing: false,
            isResearching : false,
            isFinish: false,
            page: 0,
        }

        this.authStore = this.props.authStore;
        this.isFinish = false;

    }

    _search = () => {
        if (this.state.isLoading || this.state.isRefreshing || this.state.isResearching)
            return;

        console.log('search')

        this.setState({
            page: 0,
            isResearching : true,
            prefix : this.state.text
        }, this._loadData)
    }

    _refreshing = () => {

        if (this.state.isLoading || this.state.isRefreshing || this.state.isResearching)
            return;


        this.setState({
            page: 0,
            isRefreshing: true
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
                data: this.state.isRefreshing || this.state.isResearching ? response.data.elements : this.state.data.concat(response.data.elements),
                isLoading: false,
                isRefreshing: false,
                isFinish: response.data.final,
                isResearching : false
            })
        } catch (e) {
            console.log(e);

            this.setState({
                isLoading: false,
                isRefreshing: false,
                isResearching : false
            })
        }
    }

    _handleLoadMore = () => {
        if (this.state.isFinish || this.state.isLoading || this.state.isRefreshing || this.state.isResearching)
            return;

        this.setState({
            page: this.state.page + 1,
            isLoading: true
        }, this._loadData)
    }

    _renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={{ height: 210, width: '100%' }}>
                    <Loader />
                </View> : null
        );
    }

    componentDidMount() {
        this.setState({
            isLoading: true
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
                            fontSize: 17,
                            paddingLeft: 0,
                            marginBottom: 3,
                            color : 'black',
                        }}
                        blueOnSubmit={this._search}
                        placeHolder={'검색하시고 싶은 목적 이름을 입력해주세요'}
                        onChangeText={
                            text => this.setState({ text: text })
                        }
                        value={this.state.text}
                    />
                    <ImageButton
                        source={require('../../../../../../asset/button/search_button.png')}
                        imageStyle={{
                            width: 25,
                            height: 25
                        }}
                        onPress={this._search}
                    />
                </View>
                </View>
                <FlatList
                    style={{ flex: 1, backgroundColor:undefined}}
                    data={this.state.data}
                    renderItem={({ item }) => {
                        return (
                        <View style={{
                            marginTop: 10 
                        }}>
                            <PurposeBox
                                data={item}
                                onPress={() => {
                                    this.props.navigation.navigate('LoadUserPurpose', {
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
                    refreshing={this.state.isRefreshing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: { 
        marginVertical: 10,
        paddingBottom: 5,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#9AEC74',
        borderBottomWidth: 1,
    },
    inputBox: {

    }
})