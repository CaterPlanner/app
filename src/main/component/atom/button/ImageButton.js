import React from 'react';
import {TouchableOpacity, Image } from 'react-native';

export default function imageButton({height, width, source, onPress, disabled = false}){
    return(
        <TouchableOpacity onPress={onPress} 
            disabled={disabled}>
            <Image style={{width : width, height: height}} source={source}/> 
        </TouchableOpacity>
    )
}