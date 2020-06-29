import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function GoalDecimalDayWrite({mainGoal}) {

    const [mainGoalDecimalDay, setMainGoalDecimalDay] = useState(new Date())

    return(
        <View style = {styles.container}>
            
            <Text style = {styles.title}>목표의 종료일을 정해 주세요</Text>
            <Text style = {styles.subtitle}>목표를 정하고 목표 종료일을 정하면</Text>
            <Text style = {styles.subtitle}>사용자님이 더 편하게 목표를 달성하실 수 있을거에요</Text>
           
           {/*} <DatePicker
             date={date}
             onDateChange={setDate}
             />*/}


             <Text style={styles.shoudBeDate}> Data Picker date</Text>

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
        margin:20
    },

    subtitle:{
        marginLeft:20
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