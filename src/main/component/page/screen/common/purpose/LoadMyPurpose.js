import React, { Component } from 'react';
import { View } from 'react-native';
import DetailPurpose from './DetailPurpose';

import Request from '../../../../../util/Request';
import Loader from '../../../Loader';
import Purpose from '../../../../../rest/model/Purpose';
import Goal from '../../../../../rest/model/Goal';
import GlobalConfig from '../../../../../GlobalConfig';
import { inject } from 'mobx-react';
import CaterPlannerResult from '../../../../organism/CaterPlannerResult';
import { ResultState } from '../../../../../AppEnum';

@inject(['authStore'])
export default class LoadMyPurpose extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            data : null
        }

        this.authStore = this.props.authStore;

    }

    _getData = async () => {

        const id = this.props.route.params.id;

        try {
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${id}`)
                .auth(await this.authStore.getToken()).submit();

                const purpose = new Purpose(response.data.id, response.data.name, response.data.description, response.data.photoUrl, response.data.disclosureScope,
                    response.data.startDate, response.data.endDate, response.data.stat);
                    
                
                purpose.setDetailPlans(
                    response.data.detailPlans.map((goal) =>(
                        new Goal(goal.id, goal.purposeId, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate)
                    ))
                );

                this.setState({
                    isLoading : false,
                    data : {
                        ...response.data,
                        purpose: purpose,
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

    _refresh = () => {
        this.setState({
            data : this.state.data
        })
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
                    /> :
                    <DetailPurpose data={this.state.data} navigation={this.props.navigation} 
                        refresh={this._refresh}
                    />}
            </View>
        );
    }
}

