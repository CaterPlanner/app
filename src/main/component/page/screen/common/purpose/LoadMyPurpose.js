import React, { Component } from 'react';
import { View } from 'react-native';
import DetailPurpose from './DetailPurpose';

import Request from '../../../../../util/Request';
import Loader from '../../../Loader';
import Purpose from '../../../../../rest/model/Purpose';
import Goal from '../../../../../rest/model/Goal';
import PurposeService from '../../../../../rest/service/PurposeService';
import GlobalConfig from '../../../../../GlobalConfig';
import { inject } from 'mobx-react';
import { useFocusEffect} from '@react-navigation/native';

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
            if(!this.authStore.offlineMode){


                const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${id}`)
                .auth(await this.authStore.getToken()).submit();

                const purpose = new Purpose(response.data.id, response.data.name, response.data.description, response.data.photoUrl, response.data.disclosureScope,
                    response.data.startDate, response.data.endDate, response.data.stat);
                    

                console.log(purpose);
                
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
                        refreshHome : this.props.route.params.refreshHome,
                        refreshPurpose : this._getData
                    }
                })

            }else{
                const offlineUser = this.authStore.user;

                this.setState({
                    isLoading : false,
                    data : {
                        purpose : await PurposeService.getInstance().read(id),
                        author : {
                            name : offlineUser.name,
                            profileUrl : offlineUser.profileUrl
                        }
                    }
                })
            }

        } catch (e) {
            console.log(e);
            this.props.navigation.goBack();
        }
    }

    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading : true
            }, this._getData)
        })
    }

    componentWillUnmount(){
        this.props.navigation.removeListener('focus');
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : <DetailPurpose data={this.state.data} />}
            </View>
        );
    }
}

