import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;



export default function Card({ image, title, date }) {



    return (

        <View style={styles.container}>


            <Image style={styles.imageContainer} source={{ uri: image }} />



            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.dateCon}>
                <Text style={styles.dateText}>
                    {date}
                </Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    imageContainer: {
        height: fullHeight - 400,
        width: '100%',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        borderWidth: 0.5,
        borderColor: 'black',
        //elevation:10
    },

    titleContainer: {
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', //paddingTop:'10%', paddingBottom:'20%',
        width: "100%",
        height: fullHeight - 685,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
    },

    title: {
        fontSize: 20
    },

    moreCon: {
        backgroundColor: 'white',
        width: '100%',
        height: 30,
        color: 'gray',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomEndRadius: 20, borderBottomStartRadius: 20,
        borderColor: 'black',
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        //elevation:5
    },

    dateCon: {
        backgroundColor: 'white',
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        height: fullHeight,
        width: '100%',
    },

    dateText: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center',
    }



})