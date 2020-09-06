import React from 'react';
import {View} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default function MyProgressBar({value, height = 7, width, animated, barColor, backgroundColor='#F2F2F2', styles}){
    return(
        <View style={{backgroundColor : backgroundColor}}> 
            <ProgressBarAnimated
                {...styles}
                maxValue={100} value={value} height={height} width={width}  animated={animated} backgroundColor={barColor} borderRadius={0} borderWidth={0}
            />
        </View>
    )
}