import React from 'react';
import {ActivityIndicator, View} from 'react-native'; 

export default function Loader(){
    return(
        <View style={{flex: 1, justifyContent: 'center', alginItems:'center'}}>
            <ActivityIndicator color={'black'}/>
        </View>
    )
}