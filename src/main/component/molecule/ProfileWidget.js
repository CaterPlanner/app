import React from 'react';
import {View, Text} from 'react-native';
import ProfileIcon from '../atom/icon/ProfileIcon';

export default function ProfileWidget({user, imageBackgroundStyle, imageStyle, fontStyle, profilePress}){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProfileIcon user={user} imageBackgroundStyle={imageBackgroundStyle} imageStyle={imageStyle} onPress={profilePress} />
            <Text style={[{fontSize : 11, marginLeft: 6 ,marginRight: 4}, fontStyle]}>
                {user.name}
            </Text>
        </View>
    )
}