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
        if(this.purposeWriteStore.writeType == PurposeWriteType.MODIFY){
            this.purposeWriteStore.resetDetailPlans(purpose);
        }

        this.detailPlanWriteStore.init(purpose);
    }

    
    componentDidMount() {
        setTimeout(() => {
            ToastAndroid.showWithGravity(
                this.purposeWriteStore.writeType == PurposeWriteType.CREATE ? 
                '버튼을 눌러 수행 목표를 생성해주세요' : 
                '수행 목표 기간이 현재 날짜에 맞추어 재설정 되었습니다.'
                ,ToastAndroid.SHORT, ToastAndroid.CENTER);
        }, 500);
        
       this.props.navigation.addListener('focus', () => {
            console.log(this.detailPlanWriteStore.isCanSave)
            if(this.detailPlanWriteStore.isCanSave){
                this.props.navigation.setParams({
                    isCanSave: true
                })
            }
        })
    }

    componentWillUnmount(){
        this.props.navigation.removeListener('focus');
    }


    _saveDetailPlans = () => {
        try {
            // this.detailPlanWriteStore.valid();

            this.purposeWriteStore.purpose.detailPlans = this.detailPlanWriteStore.goals;
            this.purposeWriteStore.purpose.startDate = this.detailPlanWriteStore.entryStartDate;
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
                    renderItem={({ item }) => (
                        <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                            <DetailPlanDate
                                goal={item}
                                onPress={() => {
                                    this.props.navigation.navigate('GoalWrite', {
                                        index : item.id,
                                        goal: this.detailPlanWriteStore.getGoal(item.id)
                                    })
                                }}
                            />
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
                                        this.detailPlanWriteStore.delete(item.id);
                                        if(!this.detailPlanWriteStore.isCanSave){
                                            this.props.navigation.setParams({
                                                isCanSave : false
                                            });
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    )}
                />
                <View style={{ position: 'absolute', bottom: 30, right: 22 }}>
                    <ImageButton
                        backgroundStyle={{ backgroundColor: '#2CBD4F', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                        imageStyle={{ width: 36, height: 34, tintColor: 'black'}}
                        source={require('../../../../../../asset/button/plan_insert_button.png')}
                        onPress={() => {
                            this.props.navigation.navigate('GoalWrite');
                        }}
                    />
                </View>
            </View>
        )
    }
}

