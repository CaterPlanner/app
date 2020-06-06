import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'



export default ({navigation}) => (
    <View>
    <Text>목표 계획을 ...{"\n\n"}</Text>


<TouchableOpacity onPress={() => navigation.navigate('ChoiceGroup')}>
<Text>다음으로 ChoiceGroup</Text>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.goBack()}>
<Text>빢</Text>
</TouchableOpacity>

</View>
);