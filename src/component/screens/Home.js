import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Icon, Row} from 'native-base';
 
export default class Home extends Component {

    

    static navigationOptions = {
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-flag' style={{ color: tintColor }} />
        ),

        

    }
    
    render() {

        

        return (
            <View style={style.container}>
            


                <View style={style.base_side}/>
                <View style={style.base_center}>


                <View style={style.in_side}/>
                <View style={style.in_center}>
                

                </View>
                <View style={style.in_side}></View>


                </View>
                <View style={style.base_side}/>


            </View>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
       // alignItems: 'center',
       // justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FAFAFA'
    },

    base_side: {
        flex:1,
        borderWidth:1,
        flexDirection:'column'
    },  
    base_center:{
        flex:6,
        borderWidth:1,
      
    },

    in_center:{
        borderWidth:1,
        flex:6
    },

    in_side:{
        borderWidth:1,
        flex:1
    }



});