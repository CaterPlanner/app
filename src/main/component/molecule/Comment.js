import React from 'react';
import {View, Text, TouchableWithoutFeedback } from 'react-native'
import ProfileWidget from './ProfileWidget';
import TimeAgo from '../atom/text/TimeAgo';

//임ㅅ미
import EasyDate from '../../util/EasyDate';
import ImageButton from '../atom/button/ImageButton';
import ProfileIcon from '../atom/icon/ProfileIcon';


export default function Comment({user, createDate, content, onLongPress}){
    return(
        <TouchableWithoutFeedback  style={{flex:1}} onLongPress={onLongPress}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical : 10}}>
            <ProfileIcon
                user={user}
                backgroundStyle={{marginRight: 5}}
                imageStyle={{width : 37, height: 37, borderRadius: 35}}            />
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                        <Text style={{fontSize : 14, marginHorizontal: 5, alignSelf: 'flex-start'}}>
                                {user.name}
                        </Text>
                        <TimeAgo time={createDate}/>
                    </View>
                    <View style={{ marginLeft: 5, padding : 15, borderRadius: 5, width: '100%', backgroundColor:'#E9E9E9', }}>
                        <Text style={{fontSize: 13}}>{content}</Text>
                    </View>    
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}