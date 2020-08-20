import React from 'react'
import {TouchableOpacity, Text, View } from 'react-native'

export default function RoundButton({ text, color, width, height, textStyle, onPress, borderWidth = 0, elevation}) {
    return (
        <TouchableOpacity onPress={onPress} style={{ elevation:elevation , borderWidth :borderWidth, backgroundColor: color, width: width, height: height,  borderRadius: 20, justifyContent: 'center'}}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

