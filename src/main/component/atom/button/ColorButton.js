import React from 'react'
import {TouchableOpacity, Text, View } from 'react-native'

export default function ColorButton({ text, color, width, height, textStyle, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: color, width: width, height: height,  borderRadius: 20, justifyContent: 'center'}}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

