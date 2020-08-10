import React, { useState  } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";

export default function Accordian({ title, titlefont, headerStyle, child }) {

    const [expanded, setExpanded] = useState(false);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }


    return (
        <View>
            <TouchableOpacity style={[{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            headerStyle
            ]} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpanded(!expanded);
            }}>
                <Text style={titlefont}>{title}</Text>
            </TouchableOpacity>
            {
                expanded &&
                    <View style={{}}>
                        {child}
                    </View>
            }
        </View>
    )
}
