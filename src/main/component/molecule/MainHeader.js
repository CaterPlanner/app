import React from 'react';
import { View, Image } from 'react-native';
import ImageButton from '../atom/button/ImageButton';


export default function MainHeader() {
    return (
        <View style={{
            flexDirection: 'row',
            width:'100%',
            alignItems: 'center',
            backgroundColor : '#ffffff',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderBottomColor: '#000',
            borderBottomWidth: 1
        }}>
            <View style={{width : 180, height: 28}}>
                <Image
                resizeMode="stretch"
                style={{flex:1, width: "100%", height: undefined}}
                source={require('../../../../asset/logo/CaterPlanner.png')}/>
            </View>
            <View style={{flex:1}}/>
            <View>
                <ImageButton
                    width={22}
                    height={22}
                    source={require('../../../../asset/button/notification_button.png')}
                />
            </View>
        </View>
    );
}