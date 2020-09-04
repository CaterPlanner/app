import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import Loader from '../../Loader';
import PurposeService from '../../../../rest/service/PurposeService';

import BriefingNotificationManager from '../../../../util/BriefingNotificationManager';
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


            console.log(purposes);
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
                                                acceptData: (updatePurpose) => {
                                                    this._acceptData(index, updatePurpose)
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

