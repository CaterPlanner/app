import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Request from '../../../../../util/Request';
import GlobalConfig from '../../../../../GlobalConfig';
import Loader from '../../../Loader';
import { inject } from 'mobx-react';
import PurposePaper from '../../../../atom/button/PurposePaper';
import CaterPlannerResult from '../../../../organism/CaterPlannerResult';
import { ResultState } from '../../../../../AppEnum';

@inject(['authStore'])
export default class UserPurposeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }

        this.authStore = this.props.authStore;
    }

    _loadData = async () => {
        try {
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/${this.props.route.params.id}/purposes`)
                .auth(await this.authStore.getToken())
                .submit();

            this.setState({
                isLoading: false,
                data: response.data
            })
        } catch (e) {
            console.log(e);
            this.props.navigation.goBack();
        }
    }

    componentDidMount() {
        this._loadData();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : 
                    this.state.isTimeout ?
                        <CaterPlannerResult
                            state={ResultState.TIMEOUT}
                            backgroundStyle={{flex: 1}}
                            reRequest={() => {
                                this.setState({
                                    isTimeout : false,
                                    isLoading : true
                                }, this._loadData)
                            }}
                        /> :
                            this.state.data.length == 0 ? 
                            <CaterPlannerResult
                                backgroundStyle={{flex:1}}
                                text="생성된 목적이 없습니다."
                                state={ResultState.NOTHING}
                            /> : 
                            <View style={{ paddingRight: 10, paddingLeft: 2, paddingVertical: 10 }}>
                                <FlatList
                                    style={{  marginTop : 12 }}
                                    data={this.state.data}
                                    renderItem={({ item }) => (
                                        <View style={{marginBottom: 10}}>
                                            <PurposePaper
                                                imageUri={item.photoUrl}
                                                name={item.name}
                                                checkedBriefing={false}
                                                onPress={() => {
                                                    this.props.navigation.push('LoadUserPurpose', {
                                                        id: item.id
                                                    })
                                                }}
                                            />
                                        </View>
                                    )} />
                            </View>
                }
            </View>
        )
    }
}
