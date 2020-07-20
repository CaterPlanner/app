import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';

const UserName  = '김근육';

export default function Header_Main(){
    return(
     
        <View style={styles.head}>
           
           <View style={styles.profile}>

            <View style={styles.userBase}>
            <Image
            style = {{width:'34%' , height:'100%', 
            borderRadius:50,
            flex : 1.2,
            marginTop:'0%',}}
            source={{uri:'https://pbs.twimg.com/media/EUcnhlGUUAAX4T2.jpg'}}
            ></Image>

            <Text 
             adjustsFontSizeToFit
             numberOfLines={1}
            style = {{flex:2, alignSelf:'center',
             fontSize:20, marginLeft:'5%'}}>
                {UserName}
            </Text>

            </View>

           </View>
            <View style={styles.blank} />

            <View style={styles.bell}>
            <Image style = {{width:40 , height:40,  marginTop:'12%'}}
                source = {{uri:'https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Bell-icon.png'}}/>
            </View>

            
            <View style={styles.option}>
            <Image style = {{width:40 , height:40,  marginTop:'12%'}}
                source = {{uri:'https://img.pngio.com/break-fix-fix-repair-icon-with-png-and-vector-format-for-free-fix-png-512_512.png'}}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    head:{

        backgroundColor: 'white',
        height:'8%',
        width:'100%',
        borderBottomWidth:1,
        
        flexDirection: 'row',

    },

    profile: {

        flex: 3,
        //backgroundColor: 'red',
    
      },
    
      blank: {
    
        flex: 3,
    
        //backgroundColor: 'yellow',
    
      },
    
      bell: {
    
        flex: 0.9,
        //backgroundColor: 'green',
        alignItems:'center'

      },

      
      option: {
    
        flex: 0.9,
        //backgroundColor: 'aqua',
        alignItems:'center'
    
      },

      userBase:{
          backgroundColor:'#CACACA',
          width:'80%',
          height:'80%',

          alignSelf:'center',

          marginTop:'3%',

          borderRadius:20,
          flexDirection : 'row'
          

      }

})
