import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import MyProgressBar from '../progressBar/MyProgressBar';

export default function DetailPlanPaper({goal, onPress, disabled=false}){
    return (
        <TouchableOpacity disabled={disabled} style={{width : '100%', height: 65, backgroundColor: 'white', elevation : 5}} onPress={onPress}>
            <View style={{flexDirection : 'row', flex : 1}}>
                <View
                    style={{height: '100%', width: 30, backgroundColor: goal.isProcceedEnd ? '#8B8B8B' : goal.color}}
                />
                <View style={{flex: 1}}>
                    <View style={{flex: 1, paddingHorizontal: 10}}>
                        <Text style={{fontSize: 18, paddingVertical :10}}>
                            {goal.name}
                        </Text>
                        <MyProgressBar
                            value={goal.achieve}
                            height={6}
                            width={Dimensions.get('window').width - 70}
                            animated={true}
                            barColor={goal.color}
                            backgroundColor={'#F2F2F2'}
                        />
                    </View>
                </View>        
            </View>
        </TouchableOpacity>
    )
}