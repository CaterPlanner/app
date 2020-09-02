import React from 'react';
import {View, Text} from 'react-native'
import ProfileWidget from './ProfileWidget';
import TimeAgo from '../atom/text/TimeAgo';

//임ㅅ미
import EasyDate from '../../util/EasyDate';


export default function Comment({user, createDate, content}){
    return(
        <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical : 10}}>
                <ProfileWidget 
                imageStyle={{
                    width: 32,
                    height: 32
                }}
                fontStyle={{
                    fontSize:14
                }}
                profileUrl={user.profileUrl} name={user.name}/>
                <TimeAgo time={createDate}/>
            </View>
            <View>
                <View style={{ padding : 15, borderRadius: 5, width: 350, backgroundColor:'#E9E9E9', }}>
                    <Text style={{fontSize: 13}}>{content}</Text>
                </View>    
            </View>
        </View>
    )
}