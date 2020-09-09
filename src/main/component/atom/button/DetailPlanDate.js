import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function DetailPlanDate({goal, onPress, disabled=false}){
    return (
        <TouchableOpacity disabled={disabled} style={{width : '100%', height: 65, backgroundColor: 'white', elevation : 5}} onPress={onPress}>
            <View style={{flexDirection : 'row', flex : 1}}>
                <View
                    style={{height: '100%', width: 30, backgroundColor: goal.isProcceedEnd ? '#8B8B8B' : goal.color}}
                />
                <View style={{flex: 1}}>
                    <View style={{flex: 1, paddingHorizontal: 10}}>
                        <Text style={{fontSize: 18, paddingTop :10}}>
                            {goal.name}
                        </Text>
                        <Text style={{fontSize: 14, color : '#888888', marginTop: 2}}>
                            {goal.startDate.toString()} - {goal.endDate.toString()}
                        </Text>
                    </View>
                </View>        
            </View>
        </TouchableOpacity>
    )
}