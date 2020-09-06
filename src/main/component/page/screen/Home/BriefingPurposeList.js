import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import Loader from '../../Loader';
import PurposeService from '../../../../rest/service/PurposeService';

import NotificationManager from '../../../../util/NotificationManager';
import GlobalConfig from '../../../../GlobalConfig';
import Request from '../../../../util/Request';
import { inject } from 'mobx-react';
import EasyDate from '../../../../util/EasyDate';


@inject(['authStore'])
export default class BriefingPurposeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            purposes: null
        }
    }

    _getData = async () => {
        try {
            const purposes = await PurposeService.getInstance().findActivePurposes();


            this.setState({
                purposes: purposes,
                isLoading: false
            })
        } catch (e) {
            console.log(e);
            this.props.navigation.goBack();
        }
    }

    _acceptPurpose = async (index, updatePurpose) => {
        console.log(updatePurpose);
        const newPurposes = this.state.purposes.slice();
        newPurposes[index] = updatePurpose;
        this.setState({
            purposes : newPurposes
        })
    }

    componentDidMount() {
        this._getData();
    }

    componentWillUnmount() {
        NotificationManager.briefingAlarmShow(this.state.purposes);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : (
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                        data={this.state.purposes}
                        renderItem={({ item: purpose, index }) => {
                            console.log(purpose.detailPlans)
                            const goalList = purpose.detailPlans.filter(g => g.isNowBriefing);

                            if (goalList.length == 0)
                                return;

                            return (
                                <View style={{ marginTop: 8 }}>
                                    <PurposePaper
                                        imageUri={purpose.photoUrl}
                                        name={purpose.name}
                                        count={goalList.length}
                                        onPress={() => {
                                            this.props.navigation.navigate('BriefingGoalList', {
                                                purpose: purpose,
                                                goals: goalList,
                                                acceptData: (updatePurpose) => {
                                                    this._acceptPurpose(index, updatePurpose)
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

