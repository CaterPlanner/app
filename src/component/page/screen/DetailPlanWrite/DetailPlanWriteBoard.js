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
            activeParentKey: null
        }

    }
    
    _arragePlanAsNextLevel = () =>{
        const children = this.detailplanStore.getChildren(this.state.activeParentKey)
        const levelArray = [];

        children.map((child) => {
            let level = 0;
            let current = child;

            while(current){
                if(!levelArray[count]){
                    levelArray = [
                        ...levelArray,
                        {
                            level: count,
                            children: []
                        }
                    ]
                }

                current.next.map((next) => {
                    const upstairs = myLevel.children[myLevel.children.length - 1];
                    const element = {
                        pos: (upstairs ? (upstairs.pos + (upstairs.childCount == 0 ? 1 : upstairs.childCount)) : 1),
                        childCount: next.next.length,
                        data: this.detailplanStore.getDetailPlan(next.key)
                    }
                    levelArray[count].children = {
                        ...levelArray[count].children,
                        element
                    }
                })

                current = current.next;
                level++;
            }
        })

        return levelArray;
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.planStateArea}>
                    <DetailPlanState data={this._arragePlanAsNextLevel()}/>
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
