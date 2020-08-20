import React from 'react';
import { View, Text } from 'react-native';


export default function DecimalDayWidget({ stat, decimalDay }) {

    let text;
    let color;

    switch (stat) {
        case 0:
            text = 'D - ' + (decimalDay == 0 ? 'Day' : decimalDay);
            color = "#ff0000"
            break;
        case 1:
            text = '완료'
            color = 'blue'
            break;
        case 2:

            break;
    }

    return (
        <View style={{ justifyContent: 'center', alignSelf: 'center', height: 29 , width: 65, borderWidth: 2, borderRadius: 5, borderColor: color }}>
            <Text style={{ color: color, fontSize: 12, textAlign: 'center' }}>
                {text}
            </Text>
        </View>
    )
}