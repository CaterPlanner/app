import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function imageButton({text, height, width, image, onPress}){
    return(
        <TouchableOpacity onPress={onPress} style={{width : width, height: height, backgroundColor: 'red'}}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}