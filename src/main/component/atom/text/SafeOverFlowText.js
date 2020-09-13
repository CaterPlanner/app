import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function SafeOverFlowText({ backgroundStyle, text, fontStyle, minNumberOfLines }) {

    const [reStyle, setReStyle] = useState({});

    const textHeight = fontStyle && fontStyle.textHeight ? fontStyle.textHeight : 20;

    return (
        <View style={[backgroundStyle, reStyle]}>
            <Text
                style={[fontStyle, {height : undefined, padding:undefined, margin:undefined, textHeight : textHeight}]}
                onTextLayout={({nativeEvent}) => {
                    
                    if(nativeEvent.lines.length <= minNumberOfLines){
                        setReStyle({
                            height : minNumberOfLines * textHeight
                        })
                    }
                }}
            >{text}</Text>
        </View>)
}