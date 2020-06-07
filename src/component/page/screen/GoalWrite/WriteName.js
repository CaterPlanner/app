import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'




export default ({navigation}) => (
    <View>
        
         <Text>여기서는 제목 입력하고  {"\n\n"}</Text>
         <TouchableOpacity onPress={() => navigation.navigate('WriteContent')}>
             <Text>다음으로 WriteContent</Text>
         </TouchableOpacity>


         <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>빢</Text>
    </TouchableOpacity>

    </View>
);