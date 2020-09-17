import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { ResultState } from '../../AppEnum';

export default function CaterPlannerResult({text, fontStyle, imageStyle, backgroundStyle, state, reRequest}){

    let resource;
    switch(state){
        case ResultState.NOTFOUND:
            resource = require('../../../../asset/image/caterpillar_notfound.png')
            break;
        case ResultState.NOTHING:
            resource = require('../../../../asset/image/caterpillar_nothing.png')
            break;
        case ResultState.GREAT:
            resource = require('../../../../asset/image/caterpillar_great.png')
            break;
        case ResultState.TIMEOUT:
            resource = require('../../../../asset/image/caterpillar_disconnection.png')
            break;
    }

    return(
        <View style={[{flex: 1, justifyContent:'center', alignItems:'center'}, backgroundStyle]}>  
            <Image
             resizeMode="stretch"
                style={[{
                    width: 250,
                    height: 200
                }, imageStyle]}
                source={resource}
            />
             <Text style={[{fontSize: 17, marginTop: 5},fontStyle]}>
                {!text && state == ResultState.TIMEOUT ? '서버와의 연결이 불안정합니다.' : text}
            </Text>
            {state == ResultState.TIMEOUT &&
            <TouchableOpacity
                onPress={reRequest}
            >
                <Text style={{
                    color : '#72C1ED',
                    fontSize: 15,
                    marginTop : 15
                }}>
                    재시도
                </Text>
            </TouchableOpacity>
            }
        </View>
    )
}