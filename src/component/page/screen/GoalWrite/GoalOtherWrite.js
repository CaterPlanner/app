import React , { useState } from 'react'
import {View, Text, StyleSheet, Image, Button, TextInput} from 'react-native';


const goalImage = './../../../../../asset/sample_Image/Sam.png'

const goalTotal= '23'

export default function GoalOtherWrite({mainGoal}) {

    const [mainGoalScope, setMainGoalScope] = useState();
    const [mainGoalGroup, setMainGoalGroup] = useState();

    return(
        <View style = {styles.container}>
            
            <Text style = {styles.title}>목표 계획을 다 세우셨군요</Text>
            <Text style = {styles.subtitle}>나머지 세부 설정만 마치면 됩니다.</Text>
           
            {/**YE */}
            <View style={{textAlign:'center', justifyContent:'center',}}>
            <Text style={{marginTop:'10%', marginLeft:20, fontSize:18}}>공개 범위  <Text style={{color:'#BEBEBE', fontSize:25, fontWeight:'bold',}}>?</Text></Text>
            </View>

            <View style={{borderWidth:1, width:130, height:35, alignItems:'center', justifyContent:'center', marginLeft:'5%', marginTop:'2%'}}>
                <Text style={{fontSize:17, }}>공개</Text></View>

            <View style={{textAlign:'center', justifyContent:'center',}}>
            <Text style={{marginTop:'3%', marginLeft:20, fontSize:18}}>카테고리  <Text style={{color:'#BEBEBE', fontSize:25, fontWeight:'bold',}}>?</Text></Text>
            </View>

            <View style={{backgroundColor:'blue', width:'90%', height:'33%', alignSelf:'center', marginTop:10}}>
            <Image source={require(goalImage)}
            style = {{
            width:'100%', height:'100%'
            }}>
            </Image>
            </View>

            <Text style={{fontSize:18, marginLeft:20, marginTop:8}}>하루 OO 시간 수행하기</Text>

            <View style={{textAlign:'center', justifyContent:'center',}}>
            <Text style={{marginTop:'3%', marginLeft:20, fontSize:16, marginRight:100}}> 100개의 목표 저장  
        <Text style={{color:'#838383', fontSize:16, }}> 총 {goalTotal}개 완료</Text></Text>
            </View>


            {/**YE */}

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


})