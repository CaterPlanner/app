import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import DetailPlanState from './DetailPlanState'
import DetailPlanCreate from './DetailPlanCreate'
import {observer, inject} from 'mobx-react'

@inject('detailplans')
@observer
export default class DetailPlanWriteBoard extends Component{

    constructor(props){
        super(props)

        this.detailplanStore = {detailplanStore}  = this.props
        this.detailplanStore.reset();

        if(this.props.route.detailPlans){
            this.detailplanStore.build(this.props.route.detailPlans)
        }

        this.state = {
            activeParentKey: null,
            tmp_children : [
                {
                    key: "A",
                    type : "M",
                    isClear : false,
                    successors : [
                        {
                            key: "A:A",
                            type : "P",
                            isClear : false,
                            successors: null
                        },
                        {
                            key: "A:B",
                            type : "M",
                            isClear : false,
                            successors: [
                                {
                                    key: "A:B:A",
                                    type : "P",
                                    isClear : false,
                                    successors: null
                                },
                                {
                                    key: "A:B:B",
                                    type : "P",
                                    isClear : false,
                                    successors: null
                                }
                            ]
                        },
                        {
                            key: "A:C",
                            type : "M",
                            isClear : false,
                            successors: [
                                {
                                    key: "A:C:A",
                                    type : "P",
                                    isClear : false,
                                    successors: null  
                                }
                            ]
                        }
                    ]
                },
                {
                    key: "B",
                    type : "M",
                    isClear : false,
                    successors: [
                        {
                            key: "B:A",
                            type : "M",
                            isClear : false,
                            successors: [
                                {
                                    key: "B:A:A",
                                    type : "P",
                                    isClear : false,
                                    successors: null
                                },
                                {
                                    key: "B:A:B",
                                    type : "P",
                                    isClear : false,
                                    successors: null
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    }


    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.planStateArea}>
                    <DetailPlanState children={tmp_children}/>
                </View>
                <View style={styles.planCreateArea}>
                    <DetailPlanCreate/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    planStateArea: {
        flex:1,
        backgroundColor:'red'
    },

    planCreateArea: {
        flex:2,
        backgroundColor:'blue'
    }
});
