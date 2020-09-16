import React from 'react'
import {TouchableOpacity, Text, View } from 'react-native'

export default function RoundColorButton({ text, height, textStyle, onPress, backgroundStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={[{justifyContent: 'center'},backgroundStyle]}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}