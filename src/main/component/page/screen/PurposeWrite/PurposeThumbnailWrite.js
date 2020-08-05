import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import ImageButton from '../../../atom/button/ImageButton';


export default function PurposeThumbnailWrite() {

    const { purposeWriteStore } = useStores();

    const [purposeTumbnail, setPurposeTumbnail] = useState("");
    const ImageBtn = './../../../../../asset/sample_Image/Sam.png';



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

            <View style={purposeStyles.bottomContainer}>
                <ImageButton
                    text="image"
                    width="100%"
                    height="100%"
                />
            </View>
        </View>
    );
}