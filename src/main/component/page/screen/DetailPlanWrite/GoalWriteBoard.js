import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import GoalWriteBoardTop from '../../../organism/DetailPlanWrite/GoalWriteBoardTop'
import GoalWriteBoardBottom from '../../../organism/DetailPlanWrite/GoalWriteBoardBottom'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react'
import CommonType from '../../../../util/CommonType'



@inject(['detailPlanTreeStore'])
@observer
export class GoalWriteBoard extends Component {

    constructor(props) {
        super(props);

        this.detailPlanTreeStore = this.props.detailPlanTreeStore
        
        this.detailPlanTreeStore.start(this.props.route.params.purpose);

        switch (props.route.params.startType) {
            case CommonType.CREATE:
                this.detailPlanTreeStore.create();
                break;
            case CommonType.MODIFY:
                this.detailPlanTreeStore.buildTree(this.props.route.params.initData);
                break;
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.planStateArea}>
                    <GoalWriteBoardTop
                        detailPlanTreeStore={this.props.detailPlanTreeStore}
                    />
                </View>
                <View style={styles.planCreateArea}>
                    <GoalWriteBoardBottom
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