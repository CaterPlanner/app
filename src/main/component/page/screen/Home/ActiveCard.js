import React,  { Component } from '../ObjectionWrite/node_modules/react';
import {View, Text, Image, StyleSheet, Dimensions, ScrollView} from '../ObjectionWrite/node_modules/react-native'
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { TouchableOpacity } from 'react-native-gesture-handler';


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

//한번 보라고 주석 달아놓았음 얘가 프로그레스 바 안에 들어가는 친구임 
//얘를 PlanCardView에서 받아올까 하다가 그냥 애매해서 일단 여기에 만들어놨음
var BarColor = '#83D74E'
var BarPers = 70


export default function Card({progresValue}){

    const ProgPers =  progresValue;

    
    return(

        
     
    <View style = {styles.container}>
        
        
          
        <View style = {styles.goalProgsContainer_out}>

            <ScrollView style = {styles.goalProgsContainer} showsVerticalScrollIndicator={false}>

                {/** 얘는 props가 아니라 그냥 넣은거임 26 ~ 91*/}
            
                <View style = {{
            borderWidth:1,
            height:70,
            width:'90%',
            alignSelf:'center',
            marginTop:15
        }}>
    <View style = {{height : '90%', flexDirection:'column' , }}>
    <View style = {{flex:1 , flexDirection:'row', }}>
    <View>
    <Text style = {{marginTop:5, marginLeft:10 }}>개발 족같이 하기</Text>
    </View>
    <View style = {{flex:1}}>
    <Text style = {{marginTop:5, marginLeft:'70%', color:'red', fontSize : 12}}>D - 1</Text>
    </View>
    </View>
    <View style = {{flex:1}}>
    <Text style = {{marginTop:7,marginLeft:10, fontSize:10}}>{BarPers}% 달성!</Text>
    </View>
    </View>

    <View style = {{alignItems:'center', width:'100%'}}>
    <ProgressBarAnimated style={{
        alignSelf:'center', justifyContent:'center'
    }} value={BarPers} height={7} width={fullWidth - fullWidth / 2.29 } animated={true} backgroundColor = {BarColor} unfilledColor={'#AFAFAF'} borderColor = {'gray'} borderRadius = {0} />
    </View>

    </View>

             {/** 얘는 props가 아니라 그냥 넣은거임*/}
            
            </ScrollView>
        </View>

        <View style = {styles.progressBarContainer}>
            <Text style = {styles.ProgPers}> 달성률 {'\n'} {ProgPers}%</Text>
            <ProgressBarAnimated value={progresValue} height={10} width={250} animated={true} backgroundColor = {BarColor} unfilledColor={'#AFAFAF'} borderColor = {'gray'} borderRadius = {0} borderWidth = {1} />
        </View>
        

        <TouchableOpacity>
        <View style = {styles.button}>
        
        <Text style = {{color:'white', fontSize:18}}>확     인</Text>

        </View>
        </TouchableOpacity>


    </View>
);
}




const styles = StyleSheet.create({

container:{
    //flex:1,
    backgroundColor:'white',
    height:'100%',
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    
    borderWidth:1,

    
    borderBottomStartRadius : 20,
    borderBottomEndRadius : 20
    
},

goalProgsContainer_out:{
    flex:2,
  //  backgroundColor:'blue',
    borderTopStartRadius:20,
    borderTopEndRadius:20
},

goalProgsContainer:{
    
    width:'90%',
    alignSelf:'center',
    marginTop:27,
   // backgroundColor:'green',
    //borderRadius:20,
    borderWidth:1,
    
},

progressBarContainer:{
    flex:1,
    //justifyContent:'center',
    marginTop:'6%',
    alignItems:'center',
    //height : 20,
    elevation:10
},

ProgPers:{
    fontSize:18,
    marginBottom:12,
    textAlign:'center',
    //justifyContent:'center'
    //elevation:10
},

button: {
    backgroundColor:'#A8D954',
    alignSelf:'center',
    width:150,
    height: 30,
    alignItems:'center',    
    justifyContent:'center',
    marginBottom:'7%',
    borderRadius:20
  
}



})