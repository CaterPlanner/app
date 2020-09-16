import React from 'react';
import {View, Text, Image} from 'react-native';

export default function Offline(){
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            {/* <View style={{width: 260, height: 260, justifyContent: 'center', alignItems:'center'}}>
                <Image
                    resizeMode="stretch"
                    style={{flex:1, height:undefined, width:'100%'}}
                    source={require('../../../../asset/image/Offline_image.png')}
                />
            </View> */}
        </View>
    )
}