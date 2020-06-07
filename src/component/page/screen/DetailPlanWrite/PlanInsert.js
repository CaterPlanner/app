import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'




export default ({navigation}) => (
    <View>
        <Text>Plan Insert 하는친구{"\n\n"}</Text>
    
    
    <TouchableOpacity onPress={() => navigation.navigate('ChoiceImage')}>
    <Text>다음으로 ChoiceImage</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>빢</Text>
    </TouchableOpacity>

    </View>
);