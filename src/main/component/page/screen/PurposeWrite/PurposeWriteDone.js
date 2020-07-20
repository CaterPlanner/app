import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PurposeWriteDone({purpose, navigation }) {



    return (
        <View style={styles.container}>

        <Image source={require('../../../../../../asset/DDC.gif')} style={{
            
            height: 180,
            width: 180,
            alignSelf:'center',
            marginTop:'32%'

        }}></Image>

            <Text style={styles.title}>목표 생성이 완료되었습니다</Text>
            <Text style={styles.subtitle}>목표를 지킬 수 있도록 노력해 주세요!</Text>


            <TouchableOpacity 
            style={styles.Toy}
            onPress={ () => {
                navigation.navigate('MainNavigation', {
                    screen: 'Home',
                    params: {
                        screen: 'PlanView',
                        params: {
                            purpose : purpose
                        }
                    }
                })
            }}
            //버튼
            >
            
           
                <View style={styles.Button_sample}>

                <Text style={{color:'white' ,fontSize:20}}>확        인</Text>

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
        justifyContent: 'center',
    },

    title: {
        fontSize: 22,
        //fontWeight : "bold",
        margin: 20,
        alignSelf:'center'
    },

    subtitle: {
        alignSelf:'center',
        marginLeft: 20
    },

    title_In: {
        marginTop: 20,
        height: 40,
        alignSelf: 'center',
        width: "91%",
        marginLeft: '-3%'
        //borderWidth: 1,

    },

    Button_sample : {

        width: 240,
        height: '32%',
        backgroundColor : '#55d517',    
        borderRadius : 40,
        marginTop:'10%',
        alignItems:'center',
        justifyContent:'center'
        

    },

    Toy:{
        alignItems:'center',
        
        justifyContent:'center'

    }

})

