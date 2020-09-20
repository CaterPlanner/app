import React, { Component } from 'react';
import { View, FlatList, PixelRatio } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import Loader from '../../Loader';
import PurposeService from '../../../../rest/service/PurposeService';


import { inject } from 'mobx-react';
import Purpose from '../../../../rest/model/Purpose';
import CaterPlannerResult from '../../../organism/CaterPlannerResult'
import {ResultState} from '../../../../AppEnum'
import Goal from '../../../../rest/model/Goal';

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
        let activePurpose = [];
        if(!this.state.isLoading && this.state.purposes){
            this.state.purposes.forEach((purpose, index) => {
                const goalList = purpose.detailPlans.filter(g => g.isNowBriefing);




                if(goalList.length != 0){
                    activePurpose.push({
                        index: index,
                        purpose : purpose,
                        activeGoals : goalList
                    });
                }
            })
        }
        


        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : 
                    !this.state.purposes || activePurpose.length == 0 ?  
                        <CaterPlannerResult
                        backgroundStyle={{flex:1}}
                        state={ResultState.GREAT}
                        text={'수행할 목표가 없습니다.'}
                        />
                    :
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                        data={activePurpose}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop:12}}>
                                    <PurposePaper
                                        imageUri={item.purpose.photoUrl}
                                        name={item.purpose.name}
                                        count={item.activeGoals.length}
                                        onPress={() => {

                                            const purposeClone = Purpose.clone(item.purpose);
                                            const activeGoalsClone = item.activeGoals.map((goal) => {
                                                return Goal.clone(goal);
                                            })

                                            this.props.navigation.navigate('BriefingGoalList', {
                                                purpose: purposeClone,
                                                activeGoals : activeGoalsClone,
                                                acceptData: (updatePurpose) => {
                                                    this._acceptPurpose(item.index, updatePurpose)
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

