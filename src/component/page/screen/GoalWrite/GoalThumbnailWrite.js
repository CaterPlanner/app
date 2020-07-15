import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImageBtn = './../../../../../asset/sample_Image/Sam.png';

export default function GoalTumbnailWrite({ mainGoal }) {

    const [mainGoalTumbnail, setMainGoalTumbnail] = useState("");

    return (
        <View style={styles.container}>

            <Text style={styles.title}>자신의 목표에 맞는</Text>
            <Text style={styles.Gettitle}>대표 이미지를 설정해주세요</Text>
           
            <TouchableOpacity>
              
            <View style={styles.imgIn}>

            <Image source={{uri:'https://www.kindpng.com/picc/m/33-330145_gallery-image-icon-album-circle-hd-png-download.png'}} style={{
                
                height: '30%',
                width: '30%',
                alignSelf:'center',
                borderRadius:70


            }}></Image>

            </View>


            </TouchableOpacity>


        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },

    title: {
        fontSize: 22,
        //fontWeight : "bold",
        marginLeft: 20,
        marginTop: 20
    },

    Gettitle: {
        fontSize: 22,
        //fontWeight : "bold",
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 20

    },

    subtitle: {
        marginLeft: 20
    },

    title_In: {
        marginTop: 20,
        height: 40,
        alignSelf: 'center',
        width: "91%",
        borderWidth: 1,

    },

    imgIn: {
        //backgroundColor: 'black',
        width: '80%',
        height: '77%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth:1,
        marginTop: '10%',
        borderStyle: 'dashed',
        borderRadius: 1

    },




})
