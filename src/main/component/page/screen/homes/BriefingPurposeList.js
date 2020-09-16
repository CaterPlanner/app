import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import Loader from '../../Loader';
import PurposeService from '../../../../rest/service/PurposeService';


import { inject } from 'mobx-react';
import Purpose from '../../../../rest/model/Purpose';
import CaterPlannerResult from '../../../organism/CaterPlannerResult'
import {ResultState} from '../../../../AppEnum'

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


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : 
                    !this.state.purposes || this.state.purposes.length == 0 ?  
                        <CaterPlannerResult
                        backgroundStyle={{flex:1}}
                        state={ResultState.GREAT}
                        text={'수행할 목표가 없습니다.'}
                        />
                    :
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                        data={this.state.purposes}
                        renderItem={({ item: purpose, index }) => {

                            const goalList = purpose.detailPlans.filter(g => g.isNowBriefing);

                            if (goalList.length == 0)
                                return;

               

                            return (
                                <View style={{ marginTop: 12 }}>
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
                
                }
            </View>
        );
    }
}

