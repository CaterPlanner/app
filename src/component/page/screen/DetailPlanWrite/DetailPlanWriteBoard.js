import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import DetailPlanState from '../../../organism/DetailPlanWrite/DetailPlanState'
import DetailPlanCreate from '../../../organism/DetailPlanWrite/DetailPlanCreate'
import {inject} from 'mobx-react'
import { autobind } from 'core-decorators'


const TMP_DATA = 
[
    {
        key:1,
        constructorKey:0,
        constructorRelationType:0,
        name:"A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"red",
        cycle:"unknown",
        stat:0
    },
    {
        key:2,
        constructorKey:0,
        constructorRelationType:0,
        name:"B",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"blue",
        cycle:"unknown",
        stat:0
    },
    {
        key:3,
        constructorKey:1,
        constructorRelationType:0,
        name:"A:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:4,
        constructorKey:1,
        constructorRelationType:0,
        name:"A:B",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"blue",
        cycle:"unknown",
        stat:0
    },
    {
        key:5,
        constructorKey:4,
        constructorRelationType:0,
        name:"A:C",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"blue",
        cycle:"unknown",
        stat:0
    },
    {
        key:6,
        constructorKey:4,
        constructorRelationType:0,
        name:"A:B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:7,
        constructorKey:4,
        constructorRelationType:1,
        name:"A:B:B",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:8,
        constructorKey:7,
        constructorRelationType:0,
        name:"B:A:B",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:9,
        constructorKey:5,
        constructorRelationType:0,
        name:"B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"green",
        cycle:"unknown",
        stat:0
    },
    {
        key:10,
        constructorKey:9,
        constructorRelationType:0,
        name:"B:A:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:11,
        constructorKey:9,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:12,
        constructorKey:6,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:13,
        constructorKey:1,
        constructorRelationType:1,
        name:"A:B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:14,
        constructorKey:13,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:15,
        constructorKey:13,
        constructorRelationType:1,
        name:"A:B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:16,
        constructorKey:13,
        constructorRelationType:1,
        name:"A:B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:17,
        constructorKey:15,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:18,
        constructorKey:2,
        constructorRelationType:0,
        name:"A:B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:19,
        constructorKey:2,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:20,
        constructorKey:18,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:21,
        constructorKey:16,
        constructorRelationType:1,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },    
    {
        key:22,
        constructorKey:16,
        constructorRelationType:1,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:23,
        constructorKey:13,
        constructorRelationType:1,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:24,
        constructorKey:2,
        constructorRelationType:1,
        name:"A:B:A",
        type:"M",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:25,
        constructorKey:24,
        constructorRelationType:1,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:26,
        constructorKey:24,
        constructorRelationType:1,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    },
    {
        key:27,
        constructorKey:0,
        constructorRelationType:0,
        name:"A:B:A",
        type:"P",
        startDate:"2020-02-03",
        endDate:"2020-02-27",
        color:"gray",
        cycle:"unknown",
        stat:0
    }

]


@inject(['detailPlanStore'])
@autobind
export default class DetailPlanWriteBoard extends Component{

    constructor(props){
        super(props);

        this.detailPlanStore = this.props.detailPlanStore
        //여기다 하면 2번실행됨

    }

    componentDidMount(){
        this.detailPlanStore.buildTree(TMP_DATA);
    }
    
 
    render(){
        // console.log(this.detailPlanStore.currentbottomViewData)
        // console.log(this.detailPlanStore.currentTopViewData)
        return(
            <View>

            </View>
            // <View style={{flex:1}}>
            //     <View style={styles.planStateArea}>
            //         <DetailPlanState/>
            //     </View>
            //     <View style={styles.planCreateArea}>
            //         <DetailPlanCreate/>
            //     </View>
            // </View>
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
