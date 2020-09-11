import React from 'react';
import {TouchableOpacity, Image } from 'react-native';

export default function ImageButton({backgroundStyle, imageStyle, source, onPress, disabled = false}){
    return(
        <TouchableOpacity onPress={onPress} style={[backgroundStyle, { justifyContent : 'center', alignItems: 'center'}]}
            disabled={disabled}>
            <Image resizeMode="stretch" style={[imageStyle]} source={source}/> 
        </TouchableOpacity>
    )
}          