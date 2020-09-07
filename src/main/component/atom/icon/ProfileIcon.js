import React from 'react';
import ImageButton from '../button/ImageButton';
import { useNavigation } from '@react-navigation/native';

export default function ProfileIcon({user, imageBackgroundStyle, imageStyle}){

    const navigation = useNavigation();

    return(
        <ImageButton
        backgroundStyle={[{marginRight: 5}, imageBackgroundStyle]}
        imageStyle={[{width : 30, height: 30, borderRadius: 30}, imageStyle]}
        source={{uri : user.profileUrl}}
        onPress={() => {
            navigation.navigate('PublicNavigation', {
                screen : 'LoadProfile',
                params : {
                    id : user.id
                }
            })
        }}
    />
    )
}