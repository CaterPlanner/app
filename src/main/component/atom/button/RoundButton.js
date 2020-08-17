import React from 'react'
import {TouchableOpacity, Text, View } from 'react-native'

export default function RoundButton({ text, color, width, height, textStyle, onPress, borderWidth = 0}) {
    return (
        <TouchableOpacity onPress={onPress} style={{ borderWidth :borderWidth, backgroundColor: color, width: width, height: height,  borderRadius: 20, justifyContent: 'center'}}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

