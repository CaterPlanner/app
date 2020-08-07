import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native'

export default class MyPage extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView>
                <Text>Hello I am Record :D</Text>
            </ScrollView> 
        )
    }
}
