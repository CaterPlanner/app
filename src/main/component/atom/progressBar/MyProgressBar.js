import React from 'react';
import {View} from 'react-native';
import * as Progress from 'react-native-progress';

export default function MyProgressBar({value, height = 7, width=null, animated, barColor, backgroundColor='#F2F2F2', styles}){
    return(
        <Progress.Bar
                {...styles}
               progress={value /100} height={height} width={width}  animated={animated} unfilledColor={backgroundColor} color={barColor} borderRadius={0} borderWidth={0}
            />
    )
}