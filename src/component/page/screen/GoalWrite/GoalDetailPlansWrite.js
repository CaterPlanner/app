import React, { useState } from 'react'
import {View, Text, Button, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function GoalDetailPlanWrite({mainGoal, navigation}) {

    const [mainGoalDetailPlans, setMainGoalDetailPlans] = useState();

    return(
        <View style = {styles.container}>
            
            <Text style = {styles.title}>목표 세부적으로</Text>
            <Text style = {styles.Gettitle}>설정하는 시간입니다</Text>

            <Text style = {styles.subtitle}>자신이 직접 새로운 목표 계획을 세우거나 기존에 있던 목표를</Text>
            <Text style = {styles.subtitle}>가지고 올 수 있으며 다른 사람의 목표도 가져올 수 있습니다.</Text>
           
           
           <TouchableOpacity onPress={() => {navigation.navigate('DetailPlanNavigation')}}>
           <View style={styles.itWasButton}>
            <Text style={{fontSize:270, alignSelf:'center', color:'gray', marginTop:'-2%'}}> + </Text>
           </View>
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
        marginTop:10,
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

    itWasButton:{

        height:'80%',
        width:'90%',
        marginTop:'10%',
        borderWidth:1,
        alignSelf:'center',
        

    }

    


})