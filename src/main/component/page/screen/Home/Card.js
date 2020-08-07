import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Card({ image, title, date }) {
    return (
        <View style={{
            height: 400
        }}>
            <View style={{
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                borderBottomStartRadius: 40,
                borderBottomEndRadius: 40,
                backgroundColor: '#ffffff',
                elevation: 3,
                flex: 1,
                margin: 3,
            }}
            >
                <View style={{
                    flex: 2,
                }}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            flex: 1, width: "100%", height: undefined, borderTopRightRadius: 40,
                            borderTopLeftRadius: 40,
                        }}
                    />
                </View>
                <View style={{
                    flex: 1
                }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                                alignSelf: 'center',
                                fontSize: 20
                            }}>
                            {title}
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={styles.date}>
                            {date}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        //flex:1,
        backgroundColor: 'white',
        height: '100%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,

        borderWidth: 1,


        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40

    },

    image_con: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: 'aqua',
        height: '77%',
        width: '100%'
    },

    title_con: {

        alignSelf: 'center',
        marginTop: '5%',


    },

    title: {
        fontSize: 40,

    },

    date: {
        marginTop: '2%',
        color: 'red',
        alignSelf: 'center',
        fontSize: 18
    },

    more: {
        width: '100%',
        height: 40,

        marginTop: '1%',

        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',

    }




})