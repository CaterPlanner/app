import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageButton from '../../../atom/button/ImageButton';
import useStores from '../../../../mobX/helper/useStores';

const fullWidth = Dimensions.get('window').width;

function SocialButton({ logo, name, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', backgroundColor: '#B2E7BD', width: 300, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', left: 15, height: '100%' }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Image
                        resizeMode={'stretch'}
                        source={logo}
                        style={{ width: 25, height: 25 }}
                    />
                </View>
            </View>
            <Text style={{ marginLeft: 15, color: 'white', fontSize: 18, textAlign: 'center' }}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}


export default function SignIn() {

    const { authStore } = useStores();

    return (
        <LinearGradient colors={['#B0DF5C', '#5EDF8C']} style={{ flex: 1, paddingVertical: 80, paddingHorizontal: 40 }}>
            <StatusBar hidden />
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:'10%'}}>
                <View style={{ marginTop: 10, paddingHorizontal: 1 }}>
                    <Image
                        resizeMode={'stretch'}
                        source={require('../../../../../../asset/image/caterplanner_logo.png')}
                        style={{ width: 220, height: 320 }}
                    />
                </View>
                <View style={{marginTop:'20%'}}>
                    <SocialButton
                        name={'구글로 로그인하기'}
                        logo={require('../../../../../../asset/image/google_logo.png')}
                        onPress={authStore.signInByGoogle}
                    />
                </View>

            </View>
        </LinearGradient>
    )
}





