import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import DetailPlanState from '../../../organism/DetailPlanWrite/DetailPlanState'
import DetailPlanCreate from '../../../organism/DetailPlanWrite/DetailPlanCreate'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react'


export const startType = {
    CREATE: 0,
    MODIFY: 1
}

@inject(['detailPlanTreeStore'])
@observer
export class DetailPlanWriteBoard extends Component {

    constructor(props) {
        super(props);

        this.detailPlanTreeStore = this.props.detailPlanTreeStore

        switch (props.route.params.startType) {
            case startType.CREATE:
                this.detailPlanTreeStore.create();
                break;
            case startType.MODIFY:
                this.detailPlanTreeStore.buildTree(props.route.params.initData);
                break;
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.planStateArea}>
                    <DetailPlanState
                        detailPlanTreeStore={this.props.detailPlanTreeStore}
                    />
                </View>
                <View style={styles.planCreateArea}>
                    <DetailPlanCreate
                        detailPlanTreeStore={this.props.detailPlanTreeStore}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }

    componentWillUnmount(){
        this.props.route.params.result(this.detailPlanTreeStore.entry);
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
