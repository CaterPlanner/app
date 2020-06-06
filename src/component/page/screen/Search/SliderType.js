import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Icon} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class SliderType extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-flag' style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <View style={style.container}>
                
               <ScrollView>
               <View style={style.base_LayOut}></View>
                <View style={style.base_LayOut}></View>
                <View style={style.base_LayOut}></View>
                <View style={style.base_LayOut}></View>
               </ScrollView>


            </View>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopWidth:1,
        borderBottomWidth:1,
        
    },
    base_LayOut:{

        flex: 1,
        borderWidth:1,
        width:'100%',
        height:235
        

    }

});