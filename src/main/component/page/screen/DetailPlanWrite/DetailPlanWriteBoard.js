import React, { Component } from '../ObjectionWrite/node_modules/react'
import { View, StyleSheet } from '../ObjectionWrite/node_modules/react-native'
import DetailPlanState from '../../../organism/DetailPlanWrite/DetailPlanState'
import DetailPlanCreate from '../../../organism/DetailPlanWrite/DetailPlanCreate'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react'


export const startType = {
    CREATE: 0,
    MODIFY: 1
}

@inject(['detailPlanStore'])
@observer
export class DetailPlanWriteBoard extends Component {

    constructor(props) {
        super(props);

        this.detailPlanStore = this.props.detailPlanStore

        switch (props.route.params.startType) {
            case startType.CREATE:
                this.detailPlanStore.create();
                break;
            case startType.MODIFY:
                this.detailPlanStore.buildTree(props.route.params.initData);
                break;
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.planStateArea}>
                    <DetailPlanState
                        data={this.detailPlanStore.currentTopViewData}
                        get={this.detailPlanStore.getDetailPlan}
                        changeActiveShowKey={this.detailPlanStore.changeActiveShowKey}
                    />
                </View>
                <View style={styles.planCreateArea}>
                    <DetailPlanCreate
                        detailPlanStore={this.props.detailPlanStore}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }

    componentWillUnmount(){
        this.props.route.params.result(this.detailPlanStore.entry);
    }
}

const styles = StyleSheet.create({

    planStateArea: {
        flex: 1,
    },

    planCreateArea: {
        flex: 2,
    }
});
