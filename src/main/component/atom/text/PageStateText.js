import React from '../../page/screen/ObjectionWrite/node_modules/react';
import {Text} from '../../page/screen/ObjectionWrite/node_modules/react-native'

export default function PageStateText({activeIndex, endIndex}){
    return(
        <Text>{activeIndex}/{endIndex}</Text>
    )
}
