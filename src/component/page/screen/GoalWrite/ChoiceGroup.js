import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'



export default ({navigation}) => (
    <View>
        <Text>GRP{"\n\n"}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Text>확인</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>빢</Text>
        </TouchableOpacity>

    </View>
);