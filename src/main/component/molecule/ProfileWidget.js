import React from 'react';
import {View, Text} from 'react-native';
import ImageButton from '../atom/button/ImageButton';

export default function ProfileWidget({profileUrl, name, imageBackgroundStyle, imageStyle, fontStyle}){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ImageButton
                backgroundStyle={[{marginRight: 10}, imageBackgroundStyle]}
                imageStyle={[{width : 42, height: 42, borderRadius: 42}, imageStyle]}
                source={{uri : profileUrl}}
            />
            <Text style={[{fontSize : 15, marginHorizontal: 5}, fontStyle]}>
                {name}
            </Text>
        </View>
    )
}