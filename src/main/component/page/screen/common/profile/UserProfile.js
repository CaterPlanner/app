import React from 'react';
import { ScrollView, View, Text, Image, Dimensions } from 'react-native'

export default function UserProfile({ navigation, data }) {

    userProfile = 'https://itcm.co.kr/files/attach/images/813/931/364/e2717f5d0ac1131302ff3eaba78f99ed.jpg';
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;


    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: windowHeight * 0.23,
                    backgroundColor: 'red'
                }}>

            </View>
            <View
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    alignItems: 'center'
                }}>
                <View
                    style={{
                        position: 'absolute',
                        top: -50,
                        alignSelf: 'center'
                    }}>
                    <Image
                        source={{ uri: userProfile }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100
                        }}
                    />
                </View>
                <View style={{
                    marginTop: 50 + 22,
                }}>
                    <Text style={{
                        fontSize: 22
                    }}>
                        사용자
                    </Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                marginTop: 10,
                height: 100,
                backgroundColor: 'white'
            }}>

            </View>
        </ScrollView>
    )
}