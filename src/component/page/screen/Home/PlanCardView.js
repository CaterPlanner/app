import React from 'react';
import {Image, View, Text, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const PlanCardView = ({navigation}) => {
  return(
    <View style={{}}>

      <Image source={require('../../../../../asset/sample_Image/Sam.png')}
      style = {{width : '100%', height: 350,
      borderTopLeftRadius: 20, borderTopRightRadius:20,
      borderWidth:0.5,
      borderColor:'black',
      elevation:10
      }}></Image>

      <View 
      style = {{
        backgroundColor:'white', alignItems: 'center', paddingTop:'10%',
        width:"100%",
        height:"20%",
        borderRightWidth : 0.5,
        borderLeftWidth : 0.5, 
        
      }}>
      <Text
      
      style = {{fontSize:20,}}
      
      >Hello! I am PlanCardView :D</Text>
      </View>

      
        
        <View style={{
         backgroundColor: 'white',
         width:'100%',
         height:30,
         color: 'gray',
         alignItems:'center',
         justifyContent:'center',
         borderBottomWidth:0.5,
         borderBottomEndRadius: 20, borderBottomStartRadius:20,
         borderColor:'black',
         borderRightWidth : 0.5,
         borderLeftWidth : 0.5, 
         elevation:10
         }}>
      <TouchableOpacity onPress={() => navigation.navigate('PlanView')}>
           <Text style = {{color:'gray'}}> 자세히 보기 </Text>
           </TouchableOpacity>
         </View>
      


    </View>
  );
}

export default PlanCardView;