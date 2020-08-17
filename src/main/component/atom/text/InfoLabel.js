import React from 'react';
import { View, Text } from 'react-native';

export default function InfoLabel({ title, value }) {
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
                fontSize: 14,
                textAlign: 'center',
                color: '#7F7F7F'
            }}>
                {title}
            </Text>
            <Text style={{
                fontSize: 19,
                textAlign: 'center'
            }}>
                {value}
            </Text>
        </View>
    )
}