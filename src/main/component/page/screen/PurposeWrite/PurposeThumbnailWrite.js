import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import purposeStyles from './style/PurposeStyle';


export default function PurposeThumbnailWrite({ purpose }) {

    const [purposeTumbnail, setPurposeTumbnail] = useState("");
    const ImageBtn = './../../../../../asset/sample_Image/Sam.png';



    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, { flex: 1 }]}>
                <Text style={purposeStyles.title}>
                    자신의 목표에 맞는{"\n"}
                    대표 이미지를 설정해주세요
                </Text>
            </View>

            <View style={[purposeStyles.bottomContainer, { flex: 8, justifyContent: 'center' }]}>
                <TouchableOpacity style={{
                    width: '80%',
                    height: '77%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    marginTop: '10%',
                    borderStyle: 'dashed',
                    borderRadius: 1
                }}>
                    <Image source={{ uri: 'https://www.kindpng.com/picc/m/33-330145_gallery-image-icon-album-circle-hd-png-download.png' }} style={{

                        height: '30%',
                        width: '30%',
                        alignSelf: 'center',
                        borderRadius: 70


                    }}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}