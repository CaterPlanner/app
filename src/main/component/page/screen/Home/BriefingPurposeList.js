import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import Loader from '../../Loader';
import PurposeService from '../../../../rest/service/PurposeService';

import BriefingNotificationManager from '../../../../util/BriefingNotificationManager';
import GlobalConfig from '../../../../GlobalConfig';
import Request from '../../../../util/Request';
import { inject } from 'mobx-react';


@inject(['authStore'])
export default class BriefingPurposeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: null
        }
    }

    _getData = async () => {
        try {
            const purposes = await PurposeService.getInstance().findPurposeForBrifingList();
            this.setState({
                data: purposes,
                isLoading: false
            })
        } catch (e) {
            console.log(e);
            this.props.navigation.goBack();
        }
    }

    _acceptData = async (index, unCheckedDetailPlans, checkedDetailPlanIdList) => {

        try {
            console.log(checkedDetailPlanIdList)
            if (checkedDetailPlanIdList.length == 0)
                return;

            const purpose = await PurposeService.getInstance().read(this.state.data[index].id);
            console.log(purpose);
            const checkedGoals = purpose.detailPlans.filter(g => checkedDetailPlanIdList.includes(g.id));

            console.log(purpose.achieve);


            console.log(
                Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.state.data[index].id}/update`, {
                    achieve: purpose.achieve,
                    stat: purpose.stat,
                    modifiedGoalAchieve: checkedGoals.map((goal) => ({
                        id: goal.id,
                        briefingCount: goal.briefingCount,
                        lastBriefingDate: goal.lastBriefingDate.toString(),
                        stat: goal.stat
                    }))
                }).body
            );

            const response = await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.state.data[index].id}/update`, JSON.stringify({
                achieve: purpose.achieve,
                stat: purpose.stat,
                modifiedGoalAchieve: checkedGoals.map((goal) => ({
                    id: goal.id,
                    briefingCount: goal.briefingCount,
                    lastBriefingDate: goal.lastBriefingDate.toString(),
                    stat: goal.stat
                }))
            })).auth(this.props.authStore.userToken.token).submit();

            console.log(response)

            this.state.data[index].detailPlans = unCheckedDetailPlans;

            this.state.data.forEach((purpose, index) => {
                if (purpose.detailPlans.length == 0)
                    this.state.data.splice(index, 1);
            })

            this.setState({
                data: this.state.data
            });

        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this._getData();
    }

    componentWillUnmount() {
        BriefingNotificationManager.show(this.state.data);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : (
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                        data={this.state.data}
                        renderItem={({ item: purpose, index }) => {

                            if (purpose.detailPlans.length == 0)
                                return;

                            return (
                                <View style={{ marginTop: 8 }}>
                                    <PurposePaper
                                        imageUri={purpose.photoUrl}
                                        name={purpose.name}
                                        count={purpose.detailPlans.length}
                                        onPress={() => {
                                            this.props.navigation.navigate('BriefingGoalList', {
                                                purpose: purpose,
                                                goals: purpose.detailPlans,
                                                acceptData: (unCheckedDetailPlans, checkedDetailPlans) => {
                                                    this._acceptData(index, unCheckedDetailPlans, checkedDetailPlans)
                                                }
                                            })
                                        }}
                                    />
                                </View>)
                        }}
                    />
                )
                }
            </View>
        );
    }
}

