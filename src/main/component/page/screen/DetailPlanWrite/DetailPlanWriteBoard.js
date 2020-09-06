import React, { Component } from "react";
import { View, FlatList, ToastAndroid, Text, Dimensions, Button } from 'react-native'
import ImageButton from '../../../atom/button/ImageButton'
import DetailPlanPaper from '../../../atom/button/DatePlanPaper'
import { inject, observer } from 'mobx-react'
import EasyDate from "../../../../util/EasyDate";

import { PurposeWriteType } from '../../../../AppEnum';

@inject(stores => ({
    detailPlanWriteStore: stores.detailPlanWriteStore,
    purposeWriteStore: stores.purposeWriteStore
}))
@observer
export default class DetailPlanWriteBoard extends Component {

    constructor(props) {
        super(props)


        //init
        this.props.navigation.setParams({
            // isGraph: this.state.isGraph,
            // changeShow: this._changeShow,
            saveDetailPlans: this._saveDetailPlans
        });

        this.detailPlanWriteStore = this.props.detailPlanWriteStore;
        this.purposeWriteStore = this.props.purposeWriteStore;



        this.detailPlanWriteStore.init(EasyDate.now(), EasyDate.now().plusDays(1), this.props.route.params ? this.props.route.params.detailPlans : null);
    }


    _saveDetailPlans = () => {
        try {
            this.detailPlanWriteStore.valid();

            this.purposeWriteStore.purpose.detailPlans = this.detailPlanWriteStore.goals;
            this.purposeWriteStore.purpose.startDate = this.detailPlanWriteStore.entryStartDate;
            this.purposeWriteStore.purpose.endDate = this.detailPlanWriteStore.entryEndDate;

            if (this.purposeWriteStore.purpose.stat == 1 && this.purposeWriteStore.writeType == PurposeWriteType.MODIFY)
                this.purposeWriteStore.writeType = PurposeWriteType.GROUND_MODIFY;

            this.props.route.params.setPurposeDetailPlans(this.purposeWriteStore.purpose.detailPlans);

            this.props.navigation.navigate('PurposeWriteBoard');

        } catch (e) {
            console.log(e);
            ToastAndroid.showWithGravity(e, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    render() {

        // const entryWidth = Dimensions.get('window').width;
        // const iconHeight = 50;
        // const bottomMargin = 5;



        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1, marginTop: 10 }}
                    data={this.detailPlanWriteStore.goals}
                    renderItem={({ item }) => (
                        <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                            <DetailPlanPaper
                                color={item.color}
                                name={item.name}
                                onPress={() => {
                                    this.props.navigation.navigate('GoalWrite', {
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
                                    onPress={() => { this.detailPlanWriteStore.delete(item.id) }}
                                />
                            </View>
                        </View>
                    )}
                />
                <View style={{ position: 'absolute', bottom: 30, right: 22 }}>
                    <ImageButton
                        backgroundStyle={{ backgroundColor: '#25B046', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                        imageStyle={{ width: 31, height: 34, marginLeft: 5 }}
                        source={require('../../../../../../asset/button/plan_write_button.png')}
                        onPress={() => {
                            this.props.navigation.navigate('GoalWrite');
                        }}
                    />
                </View>
            </View>
        )
    }
}

