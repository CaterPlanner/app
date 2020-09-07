import React from 'react';
import {View, Text} from 'react-native';
import ProfileIcon from '../atom/icon/ProfileIcon';

export default function ProfileWidget({user, imageBackgroundStyle, imageStyle, fontStyle}){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ProfileIcon user={user} imageBackgroundStyle={imageBackgroundStyle} imageStyle={imageStyle} />
            <Text style={[{fontSize : 14, marginHorizontal: 5, alignSelf: 'flex-start', marginTop : 5}, fontStyle]}>
                {user.name}
            </Text>
        </View>
    )
}