import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MyProgressBar from '../progressBar/MyProgressBar';

export default function DetailPlanPaper({color, name, onPress, value, disabled=false}){
    return (
        <TouchableOpacity disabled={disabled} style={{width : '100%', height: 65, backgroundColor: 'white', elevation : 5}} onPress={onPress}>
            <View style={{flexDirection : 'row', flex : 1}}>
                <View
                    style={{height: '100%', width: 30, backgroundColor: color}}
                />
                <View style={{flex: 1}}>
                    <View style={{flex: 1, paddingHorizontal: 10}}>
                        <Text style={{fontSize: 18, paddingVertical :10}}>
                            {name}
                        </Text>
                        <MyProgressBar
                            value={value}
                            height={6}
                            width={200}
                            animated={true}
                            barColor={color}
                            backgroundColor={'#F2F2F2'}
                        />
                    </View>
                </View>        
            </View>
        </TouchableOpacity>
    )
}