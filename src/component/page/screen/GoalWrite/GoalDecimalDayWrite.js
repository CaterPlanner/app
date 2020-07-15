import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function GoalDecimalDayWrite({mainGoal}) {

    const [mainGoalDecimalDay, setMainGoalDecimalDay] = useState(new Date())

    return(
        <View style = {styles.container}>
            
            <Text 
            adjustsFontSizeToFit
            numberOfLines={1}
            style = {styles.title}>목표가 끝날 날짜를</Text>
            <Text 
            adjustsFontSizeToFit
            numberOfLines={1}
            style = {styles.subtitle}>입력해 주세요</Text>
          
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