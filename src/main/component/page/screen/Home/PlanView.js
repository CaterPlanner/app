import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage } from 'react-native'


export default class PlanView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mainGoal: props.route.params.mainGoal
    }


  }


  render() {
    return (
      <ScrollView>
        <Text>
          메인 목표 이름 : {this.state.mainGoal.name}
        </Text>
        <Text>
          메인 목표 설명 : {this.state.mainGoal.description}
        </Text>
        <Text>
          =================== 세부 목표 데이터 ========================
        </Text>
        <View>
          {
            this.state.mainGoal.detailPlans.map((detailPlan) => {
              return (
                <View>
                  <Text>---------------------</Text>
                  <Text>| Key : {detailPlan.key} </Text>
                  <Text>| constructorKey : {detailPlan.constructorKey} </Text>
                  <Text>| constructorRelationType : {detailPlan.constructorRelationType} </Text>
                  <Text>| name : {detailPlan.name} </Text>
                  <Text>| type : {detailPlan.type} </Text>
                  <Text>| startDate : {detailPlan.startDate} </Text>
                  <Text>| endDate : {detailPlan.endDate} </Text>
                  <Text>| color : {detailPlan.color} </Text>
                  <Text>| cycle : {detailPlan.cycle} </Text>
                  <Text>| stat : {detailPlan.stat} </Text>
                  <Text>---------------------</Text>
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    )
  }
}

