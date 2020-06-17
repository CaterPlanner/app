import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import DetailPlanState from '../../../organism/DetailPlanWrite/DetailPlanState'
import DetailPlanCreate from '../../../organism/DetailPlanWrite/DetailPlanCreate'
import {inject} from 'mobx-react'


const TMP_DATA = 
[
    {
        key: "A",
        name: "Detail Plan A",
        type : "M",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'red',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "B",
        name: "Detail Plan B",
        type : "M",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'blue',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "A:A",
        name: "Detail Plan A:A",
        type: "P",
        startDate : "2020-02-03",
        endDate : "2020-02-04",
        color : 'gray',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "A:B",
        name: "Detail Plan A:B",
        type: "M",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'blue',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "A:C",
        name: "Detail Plan A:C",
        type: "M",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'blue',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "A:B:A",
        name: "Detail Plan A:B:A",
        type: "P",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'gray',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "A:B:B",
        name: "Detail Plan A:B:B",
        type: "P",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'gray',
        cycle : 'unknown',
        stat : 0
    },
    {
        key: "B:A",
        name: "Detail Plan B:A",
        type : "M",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'green',
        cycle : 'unknown',
        stat : 0
    },
        {
        key: "B:A:A",
        name: "Detail Plan B:A:A",
        type : "P",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'gray',
        cycle : 'unknown',
        stat : 0
    },
        {
        key: "B:A:B",
        name: "Detail Plan B:A:B",
        type : "P",
        startDate : "2020-02-03",
        endDate : "2020-02-27",
        color : 'gray',
        cycle : 'unknown',
        stat : 0
    },   
]


@inject((stores) => ({
    detailPlanStore: stores.detailPlanStore
}))
export default class DetailPlanWriteBoard extends Component{

    constructor(props){
        super(props);

        console.log("yese!")
        this.detailPlanStore = this.props.detailPlanStore
        //여기다 하면 2번실행됨
    }

    componentDidMount(){
        this.detailPlanStore.buildTree(TMP_DATA);

        console.log(this.detailPlanStore.topViewData);
        console.log(this.detailPlanStore.bottomViewData);
        console.log(this.detailPlanStore.get("A"));
    }
    
 
    render(){
        return(
            // <View style={{flex:1}}>
            //     <View style={styles.planStateArea}>
            //         <DetailPlanState/>
            //     </View>
            //     <View style={styles.planCreateArea}>
            //         <DetailPlanCreate/>
            //     </View>
            // </View>
            <View>
                
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
