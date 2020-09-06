import React from 'react';
import {View, Text} from 'react-native'
import ProfileWidget from './ProfileWidget';
import TimeAgo from '../atom/text/TimeAgo';

//임ㅅ미
import EasyDate from '../../util/EasyDate';
import ImageButton from '../atom/button/ImageButton';


export default function Comment({user, createDate, content}){
    return(
        <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical : 10}}>
            <ImageButton
                backgroundStyle={{marginRight: 5}}
                imageStyle={{width : 37, height: 37, borderRadius: 35}}
                source={{uri : user.profileUrl}}/>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                        <Text style={{fontSize : 14, marginHorizontal: 5, alignSelf: 'flex-start'}}>
                                {user.name}
                        </Text>
                        <TimeAgo time={createDate}/>
                    </View>
                    <View style={{ padding : 15, borderRadius: 5, width: 350, backgroundColor:'#E9E9E9', }}>
                        <Text style={{fontSize: 13}}>{content}</Text>
                    </View>    
                </View>
            </View>
        </View>
    )
}