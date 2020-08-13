import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function GoalPager({color, name, startDate, endDate}){
    return (
        <TouchableOpacity style={{width : '100%', height: 90, backgroundColor: 'white', marginVertical : 5}}>
            <View style={{flexDirection : 'row', flex : 1}}>
                <View
                    style={{height: '100%', width: 20, backgroundColor: color}}
                />
                <View style={{flex: 1}}>
                    <View style={{flex: 1, paddingHorizontal: 10}}>
                        <Text style={{fontSize: 18, paddingVertical :10}}>
                            {name}
                        </Text>
                        <Text style={{fontSize: 15, textAlign: 'right'}}>
                            {startDate}  ~  {endDate}
                        </Text>
                        <View style={{position : 'absolute', left: 10,  bottom : 8, height:6, width:'100%', backgroundColor:'#F2F2F2'}}/>
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}