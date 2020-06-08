import React from 'react';
import {Text} from 'react-native'

export default function PageStateText({activeIndex, endIndex}){
    return(
        <Text>{activeIndex}/{endIndex}</Text>
    )
}
