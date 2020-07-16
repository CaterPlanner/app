import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native';
import purposeStyles from './stylesheet/PurposeStyles';

export default function GoalDecimalDayWrite({mainGoal}) {

    const [mainGoalDecimalDay, setMainGoalDecimalDay] = useState(new Date())

    return(
        <View style = {purposeStyles.container}>
            <View style={purposeStyles.titleContainer}>
                <Text style={purposeStyles.title}>
                    목표를 끝날 날짜를
                    {"\n"}
                    입력해 주세요
                </Text>
            </View>
            <View style={purposeStyles.bottomContainer}>
                <View>
                <Text> Data Picker date</Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
    },

    title:{
        fontSize : 22,
        //fontWeight : "bold",
        marginTop:20,
        marginLeft:20
    },

    subtitle:{
        marginLeft:20,
        fontSize : 22,
        marginTop:5
    },

    title_In:{
        marginTop:20,
        height:40,
        alignSelf:'center',
        width:"91%",
        borderWidth:1,
        
    },
    
    shoudBeDate:{
        alignSelf:'center',
        marginTop:'30%',
        fontSize:30
    }


})