import React from 'react';
import {View} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default function MyProgressBar({value, height, width, animated, barColor, backgroundColor, styles}){
    return(
        <View style={{backgroundColor : backgroundColor}}> 
            <ProgressBarAnimated
                {...styles}
                value={value} height={height} width={width} animated={animated} backgroundColor={barColor} borderRadius={0} borderWidth={0}
            />
        </View>
    )
}