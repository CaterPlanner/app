import React from 'react';
import {Text} from 'react-native'

export default function PageStateText({activeIndex, endIndex}){
    return(
        <Text style={{fontSize :15}}>{activeIndex}/{endIndex}</Text>
    )
}
