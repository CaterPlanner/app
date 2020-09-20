import React from 'react';
import {View, PixelRatio} from 'react-native';
import Loader from '../page/Loader';

export default function LoaderFooter(){
    return(
        <View style={{ height: PixelRatio.getPixelSizeForLayoutSize(73.5), width: '100%' }}>
                    <Loader/>
        </View>
    )
}