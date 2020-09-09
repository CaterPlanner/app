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
import Purpose from '../../../../rest/model/Purpose';


@inject(['appStore'])
export default class BriefingPurposeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            purposes: null
        }

        this.appStore = this.props.appStore;
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
        if(this.appStore.isScheduling)
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

                            const goalList = purpose.detailPlans.filter(g => g.isNowBriefing);

                            if (goalList.length == 0)
                                return;

                            console.log('dsfsd')

                            return (
                                <View style={{ marginTop: 8 }}>
                                    <PurposePaper
                                        imageUri={purpose.photoUrl}
                                        name={purpose.name}
                                        count={goalList.length}
                                        onPress={() => {

                                            const purpose = Purpose.clone(this.state.purposes[index]);

                                            this.props.navigation.navigate('BriefingGoalList', {
                                                purpose: purpose,
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

