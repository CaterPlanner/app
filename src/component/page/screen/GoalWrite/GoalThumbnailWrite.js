import React from 'react'
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImageBtn = './../../../../../asset/sample_Image/Sam.png';

export default function GoalTumbnailWrite() {
    return(
        <View style = {styles.container}>
            
        <Text style = {styles.title}>자신의 목표에 맞는</Text>
            <Text style = {styles.Gettitle}>대표 이미지를 설정해주세요</Text>

            <Text style = {styles.subtitle}>대표 이미지를 설정하여 맞는 이미지를 넣어 보아요</Text>
           
           <TouchableOpacity>
               <Image 
               source={require(ImageBtn)}
               style={styles.imgIn}
               >
               </Image>
               
               <Text style = {{fontSize:17, textAlign:'center', marginTop:5}}>대표 이미지 가져오기</Text>
           
           </TouchableOpacity>


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
        marginLeft:20,
        marginTop:20
    },

    Gettitle:{
        fontSize : 22,
        //fontWeight : "bold",
        marginLeft:20,
        marginTop:5,
        marginBottom:20

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

    imgIn:{
        backgroundColor:'black',
        width:'60%',
        height:'45%',
        alignSelf:'center',
        justifyContent:'center',

        marginTop:'34%',    

        borderRadius:20
 
    },

    


})