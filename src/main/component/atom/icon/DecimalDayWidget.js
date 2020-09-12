import React from 'react';
import { View, Text } from 'react-native';


export default function DecimalDayWidget({ purpose }) {

    const decimalDay = purpose.leftDay;

    let text;
    let color;


    switch (purpose.stat) {
        case 0:
            if(!purpose.isProcceedEnd){
                text = (decimalDay == 0 ? 'FinalDay' : 'D - ' + decimalDay);
            }else{
                text = purpose.isSucceeseProceed ? '수행완료' : '수행실패'
            }
            color = "#ff0000"
            break;
        case 1:
            text = '대기'
            color = 'gray'
            break;
        case 2:         
            text = '성공'
            color = 'blue'
            break;
        case 3:
            text = '실패'
            color = 'green'
            break;
    }

 

    

    return (
        <View style={{ justifyContent: 'center', alignSelf: 'center', height: 29, width: 65, borderWidth: 2, borderRadius: 5, borderColor: color }}>
            <Text style={{ color: color, fontSize: 12, textAlign: 'center' }}>
                {text}
            </Text>
        </View>
    )
}