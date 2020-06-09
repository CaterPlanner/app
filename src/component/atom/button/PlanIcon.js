import React from 'react'
import {StyleSheet, TouchableOpacity, Text , View} from 'react-native'

export default function PlanIcon({name, color}){
    return(
        <TouchableOpacity>
            <View style={[styles.button, {backgroundColor : color}]}>
                <Text style={styles.buttonText}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        width: 200,
        height: 100
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
})