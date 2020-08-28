import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import ImageButton from '../../../atom/button/ImageButton';
import { useNavigation } from '@react-navigation/native';



export default function PurposePhotoWrite() {

    const { purposeWriteStore } = useStores();

    const [purposePhoto, setPurposePhoto] = useState(purposeWriteStore.purpose.photoUrl);

    const navigation = useNavigation();

    const setPhoto = (photo) => {
        setPurposePhoto(photo);
        purposeWriteStore.changePermit(true);
        purposeWriteStore.purpose.photo = photo;
        purposeWriteStore.isChangePhoto = true;
    } 

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        목적을 대표할{"\n"}
                        사진을 골라주세요.
                    </Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        다른 사람들과 함께 목적을 공유하실 건가요? {"\n"}
                        그렇다면 당신만의 특별한 사진을 넣어보도록 해요.
                    </Text>
                </View>
            </View>

            <View style={[purposeStyles.bottomContainer, {justifyContent: 'center', alignItmes:'center'}]}>
                    <ImageButton
                    backgroundStyle={{ flex:1}}
                    imageStyle={
                        purposePhoto ?  {flex : 1, width : '100%' , height : undefined} : { width: 100, height: 100, marginLeft: 5 }
                    }
                    source={
                        purposePhoto ? {uri : purposeWriteStore.isChangePhoto ? purposePhoto.uri : purposePhoto} : require('../../../../../../asset/button/select_thumbnail_button.png')
                    }
                    onPress={() => {
                        navigation.navigate('SelectAlbum' , {
                            setPurposePhoto : setPhoto
                        })
                    }}
                    />           
            </View>
        </View>
    );
}