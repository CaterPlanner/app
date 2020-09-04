import React from 'react';
import {View, Text} from 'react-native';
import ImageButton from '../atom/button/ImageButton';

export default function ProfileWidget({profileUrl, name, imageBackgroundStyle, imageStyle, fontStyle}){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ImageButton
                backgroundStyle={[{marginRight: 5}, imageBackgroundStyle]}
                imageStyle={[{width : 42, height: 42, borderRadius: 42}, imageStyle]}
                source={{uri : profileUrl}}
            />
            <Text style={[{fontSize : 14, marginHorizontal: 5, alignSelf: 'flex-start', marginTop : 5}, fontStyle]}>
                {name}
            </Text>
        </View>
    )
}