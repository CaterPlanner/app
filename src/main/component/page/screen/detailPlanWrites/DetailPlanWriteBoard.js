import React, { Component } from "react";
import { View, FlatList, ToastAndroid, Text, Dimensions, Button } from 'react-native'
import ImageButton from '../../../atom/button/ImageButton'
import DetailPlanDate from '../../../atom/button/DetailPlanDate'
import { inject, observer } from 'mobx-react'
import EasyDate from "../../../../util/EasyDate";

import { PurposeWriteType } from '../../../../AppEnum';
import Purpose from "../../../../rest/model/Purpose";

@inject(stores => ({
    detailPlanWriteStore: stores.detailPlanWriteStore,
    purposeWriteStore: stores.purposeWriteStore
}))
@observer
export default class DetailPlanWriteBoard extends Component {

    constructor(props) {
        super(props)

        this.detailPlanWriteStore = this.props.detailPlanWriteStore;
        this.purposeWriteStore = this.props.purposeWriteStore;

        //init
        this.props.navigation.setParams({
            // isGraph: this.state.isGraph,
            // changeShow: this._changeShow,
            saveDetailPlans: this._saveDetailPlans,
        });


        const purpose = Purpose.clone(this.purposeWriteStore.purpose);
        // if(this.purposeWriteStore.writeType == PurposeWriteType.MODIFY){
        //     this.purposeWriteStore.resetDetailPlans(purpose);
        // }

        this.detailPlanWriteStore.init(purpose);

    }


    componentDidMount() {





        if (this.purposeWriteStore.writeType == PurposeWriteType.CREATE || this.detailPlanWriteStore.goal == 0) {
            setTimeout(() => {
                ToastAndroid.showWithGravity(
                    '버튼을 눌러 수행 목표를 생성해주세요'
                    , ToastAndroid.SHORT, ToastAndroid.CENTER);
            }, 500);
        } else if (this.purposeWriteStore.writeType == PurposeWriteType.RISE || this.purposeWriteStore.writeType == PurposeWriteType.RETRY || this.purposeWriteStore.writeType == PurposeWriteType.FOLLOW) {
            setTimeout(() => {
                ToastAndroid.showWithGravity(
                    '수행 목표 기간이 현재 날짜에 맞추어 재설정 되었습니다.'
                    , ToastAndroid.SHORT, ToastAndroid.CENTER);
            }, 500);

        }

        this.props.navigation.addListener('focus', () => {
            if (this.detailPlanWriteStore.isCanSave) {

                this.props.navigation.setParams({
                    isCanSave: true
                })
 
            }
        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }


    _saveDetailPlans = () => {
        try {
            // this.detailPlanWriteStore.valid();

            this.purposeWriteStore.purpose.detailPlans = this.detailPlanWriteStore.goals;
            let minDate = EasyDate.now();

            this.detailPlanWriteStore.goals.forEach((goal) => {
                if(goal.startDate.isAfter(minDate))
                    minDate = goal.startDate;
            })

            this.purposeWriteStore.purpose.startDate = minDate;
            this.purposeWriteStore.purpose.endDate = this.detailPlanWriteStore.entryEndDate;

            if (this.purposeWriteStore.writeType == PurposeWriteType.MODIFY)
                this.purposeWriteStore.writeType = PurposeWriteType.GROUND_MODIFY;

            this.props.route.params.setPurposeDetailPlans(this.purposeWriteStore.purpose.detailPlans);

            
            this.props.navigation.navigate('PurposeWriteBoard');

        } catch (e) {
            console.log(e);
            ToastAndroid.showWithGravity(e, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }


    render() {


        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1, marginTop: 10 }}
                    data={this.detailPlanWriteStore.goals}
                    renderItem={({ item: goal }) => {

                        const isLocked = (this.purposeWriteStore.writeType == PurposeWriteType.MODIFY || this.purposeWriteStore.writeType == PurposeWriteType.GROUND_MODIFY)
                            && goal.isActive && goal.purposeId;

                        return (
                            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>

                                <DetailPlanDate
                                    disabled={isLocked}
                                    goal={goal}
                                    onPress={() => {
                                        this.props.navigation.navigate('GoalWrite', {
                                            index: goal.id,
                                            goal: this.detailPlanWriteStore.getGoal(goal.id)
                                        })
                                    }}
                                />

                                {isLocked &&
                                    <View style={{ position: 'absolute', elevation: 5, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }} />
                                }

                                <View style={{ position: 'absolute', top: -10, right: -10, elevation: 10 }}>
                                    <ImageButton
                                        backgroundStyle={{
                                            width: 30, height: 30
                                        }}
                                        source={require('../../../../../../asset/button/remove_button.png')}
                                        imageStyle={{
                                            width: 25,
                                            height: 25
                                        }}
                                        onPress={() => {
                                            this.detailPlanWriteStore.delete(goal.id);
                                            if (!this.detailPlanWriteStore.isCanSave) {
                                                this.props.navigation.setParams({
                                                    isCanSave: false
                                                });
                                            }
                                        }}
                                    />
                                </View>
                            </View>)
                    }}
                />
                <View style={{ position: 'absolute', bottom: 30, right: 22 }}>
                    <ImageButton
                        disabled={this.detailPlanWriteStore.isFilled}
                        backgroundStyle={{ backgroundColor: this.detailPlanWriteStore.isFilled ? '#F1F1F1' : '#25B046', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                        imageStyle={{ width: 35, height: 35, tintColor: this.detailPlanWriteStore.isFilled ? '#888888' : 'white' }}
                        source={require('../../../../../../asset/button/plus_button.png')}
                        onPress={() => {
                            this.props.navigation.navigate('GoalWrite');
                        }}
                    />
                </View>
            </View>
        )
    }
}

