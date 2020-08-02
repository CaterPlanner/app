import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import GoalWriteBoardTop from '../../../organism/DetailPlanWrite/GoalWriteBoardTop'
import GoalWriteBoardBottom from '../../../organism/DetailPlanWrite/GoalWriteBoardBottom'
import { inject, observer } from 'mobx-react'
import CommonType from '../../../../util/CommonType'



@inject(['detailPlanMakerStore'])
@observer
export class GoalWriteBoard extends Component {

    constructor(props) {
        super(props);

        this.detailPlanMakerStore = this.props.detailPlanMakerStore
        
        this.detailPlanMakerStore.start(this.props.route.params.purpose);

        switch (props.route.params.startType) {
            case CommonType.CREATE:
                this.detailPlanMakerStore.create();
                break;
            case CommonType.MODIFY:
                this.detailPlanMakerStore.build(this.props.route.params.initData);
                break;
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.planStateArea}>
                    <GoalWriteBoardTop
                        detailPlanMakerStore={this.props.detailPlanMakerStore}
                    />
                </View>
                <View style={styles.planCreateArea}>
                    <GoalWriteBoardBottom
                        detailPlanMakerStore={this.props.detailPlanMakerStore}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }

    componentWillUnmount(){
        this.props.route.params.result(this.detailPlanMakerStore.entry);
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