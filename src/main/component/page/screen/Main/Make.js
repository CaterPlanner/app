import React, { Component } from 'react';
import { View, Image, Text} from 'react-native';
import MainHeader from '../../../molecule/header/MainHeader'
import ColorButton from '../../../atom/button/ColorButton'


export default function Make({navigation}){
    return(
        <View style={{flex: 1}}>
            <MainHeader navigation={navigation}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                
                <View style={{
                    alignItems : 'center',
                    width: '100%',
                    height: '80%'
                }}>
                    <Image
                        source={require('../../../../../../asset/image/normal_caterpillar.gif')}
                        resizeMode="stretch"
                        style={{
                            width: 300,
                            height: 300
                        }}
                    />
                    <Text style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        marginTop: 10
                    }}>
                        목표를 추가해 볼까요?
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 20
                    }}>
                        버튼을 누르고 목표를 추가하여 {"\n"}
                        다른 사용자들과 목표를 공유해 보도록 해요.
                    </Text>
                    <ColorButton
                        text={'추    가'}
                        textStyle={{
                            textAlign: 'center',
                            color: '#ffffff',
                            fontSize: 20
                        }}
                        color={'#25B046'}
                        width={300}
                        height={30}
                        onPress={() => {
                            navigation.navigate("CreateNavigation");
                        }}
                    />
                    
                </View>
            </View>
        </View>
    )
}
