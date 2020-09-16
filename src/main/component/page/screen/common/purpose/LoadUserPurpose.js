import React, { Component } from 'react';
import { View } from 'react-native';
import Loader from '../../../Loader';
import GlobalConfig from '../../../../../GlobalConfig';
import Request from '../../../../../util/Request';
import Purpose from '../../../../../rest/model/Purpose';
import Goal from '../../../../../rest/model/Goal';
import DetailPurpose from './DetailPurpose';
import { inject } from 'mobx-react';
import CaterPlannerResult from '../../../../organism/CaterPlannerResult';
import { ResultState } from '../../../../../AppEnum';

@inject(['authStore'])
export default class LoadUserPurpose extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            data:  null
        }

        this.authStore = this.props.authStore;
    }

    _getData = async () => {
        try {
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.props.route.params.id}`)
                .auth(await this.authStore.getToken()).submit();

            const purpose = new Purpose(response.data.id, response.data.name, response.data.description, response.data.photoUrl, response.data.disclosureScope,
                response.data.startDate, response.data.endDate, response.data.stat);

            purpose.setDetailPlans(
                response.data.detailPlans.map((goal) => (
                    new Goal(goal.id, purpose.id, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate)
                ))
            );

            this.setState({
                isLoading : false,
                data : {
                    ...response.data,
                    purpose: purpose
                }
            })


        } catch (e) {
            console.log(e);
            this.setState({
                isLoading : false,
                isTimeout: true
            })
        }   
    }

    componentDidMount(){
        // this._getData();
        this.props.navigation.addListener('focus', () => {
            this._getData();
        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : 
                    this.state.isTimeout ? 
                    <CaterPlannerResult
                        state={ResultState.TIMEOUT}
                        reRequest={() => {
                            this.setState({
                                isLoading : true,
                                isTimeout : false
                            }, this._getData)
                        }}
                    />
                    :
                    <DetailPurpose data={this.state.data} navigation={this.props.navigation} />}
            </View>
        )
    }

}