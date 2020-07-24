import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default function Card({ image, title, date }) {

    return (
        <View style={styles.container}>
            <Image style={styles.image_con}
                source={{ uri: image }} />
            <View style={styles.title_con}>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.date}>
                    {date}
                </Text>
            </View>
            <TouchableOpacity >
                <View style={styles.more}>
                    <Text style={{ color: 'gray' }}>자세히 보기</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        //flex:1,
        backgroundColor: 'white',
        height: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

        borderWidth: 1,


        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20

    },

    image_con: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'aqua',
        height: '77%',
        width: '100%'
    },

    title_con: {

        alignSelf: 'center',
        marginTop: '5%',


    },

    title: {
        fontSize: 20,

    },

    date: {
        marginTop: '2%',
        color: 'red',
        alignSelf: 'center',
        fontSize: 18
    },

    more: {
        width: '100%',
        height: 30,

        marginTop: '1%',

        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',

    }




})