import React from 'react';
import ImageButton from '../button/ImageButton';
import { useNavigation } from '@react-navigation/native';

export default function ProfileIcon({user, imageBackgroundStyle, imageStyle, onPress}){

    const navigation = useNavigation();

    return(
        <ImageButton
        backgroundStyle={[{borderRadius: 30, overflow: "hidden"}, imageBackgroundStyle]}
        imageStyle={[{width : 30, height: 30}, imageStyle]}
        source={{uri : user.profileUrl}}
        onPress={!onPress ? () => {
            navigation.push('LoadProfile', {
                id : user.id
            })
        } : onPress}
    />
    )
}