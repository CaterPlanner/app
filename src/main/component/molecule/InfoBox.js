import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function InfoBox({ title, detailButtonPress, detailButtonHint = '자세히 보기', child }) {
    return (
        <View style={{width: '100%'}}>
            <View style={{paddingHorizontal: 12, paddingVertical: 10 , backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Text style={{ fontSize: 17 }}>
                    {title}
                </Text>
                <TouchableOpacity onPress={detailButtonPress}>
                    <Text style={{
                        fontSize: 13,
                        color: '#7F7F7F'
                    }}>
                        {detailButtonHint}
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                {child}
            </View>
        </View>
    )
}