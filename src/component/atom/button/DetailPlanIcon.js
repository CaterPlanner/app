import React from 'react'
import {StyleSheet, TouchableOpacity, Text , View} from 'react-native'

export default function DetailPlanIcon({name, color, width, height, onPress}){
    return(
        <TouchableOpacity onPress={onPress} style={{backgroundColor : color, width: width, height : height}}>
            <View style={styles.button}>
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
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
})