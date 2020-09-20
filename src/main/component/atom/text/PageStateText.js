import React from 'react';
import {View, Text} from 'react-native'

export default function PageStateText({activeIndex, endIndex}){
    return(
        <View style={{
        alignItems: "center",
        backgroundColor: '#dfdfdf',
        justifyContent: "center",
        width: 65,
        height: 25,
        borderRadius: 12,
        alignSelf: 'center'}}>
            <Text>{activeIndex} / {endIndex}</Text>
        </View>
    )
}