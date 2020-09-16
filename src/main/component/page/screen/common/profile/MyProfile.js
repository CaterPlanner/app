import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Request from '../../../../../util/Request';
import Loader from '../../../Loader';
import DetailProfile from './DetailProfile';
import GlobalConfig from '../../../../../GlobalConfig';
import { inject } from 'mobx-react';
import CaterPlannerResult from '../../../../organism/CaterPlannerResult';
import { ResultState } from '../../../../../AppEnum';

@inject(['authStore'])
export default class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: null,
            isTimeout : false
        }

        this.authStore = this.props.authStore;
    }

    _loadProfile = async () => {

        try {
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/myProfile`)
                .auth(await this.authStore.getToken())
                .submit();

            this.setState({
                data: response.data,
                isLoading: false
            })


        } catch (e) {
            console.log(e);
            this.setState({
                isTimeout : true,
                isLoading : false
            })
        }
    }

    componentDidMount() {
        // this._loadProfile();
        this.props.navigation.addListener('focus', () => {
            this._loadProfile();
        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> :
                    this.state.isTimeout ? 
                    <CaterPlannerResult
                        state={ResultState.TIMEOUT}
                        reRequest={() => {
                            this.setState({
                                isTimeout : false,
                                isLoading : true
                            }, this._loadProfile)
                        }}
                    /> :
                    <DetailProfile data={this.state.data} />
                }
            </View>
            )
    }
}


