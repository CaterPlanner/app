import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'


export default ({navigation}) => (
    <View>
        <Text>여기서는 내용 써줄테고</Text>
        <Text> 그다음거 뭐냐 DetailPlanNavigation여기로 넘어가야지 
        {"\n\n"}
        </Text>


        <TouchableOpacity onPress={() => navigation.navigate('DetailPlanNavigation')}>
        <Text>다음으로 DetailPlanNavigation</Text>
        </TouchableOpacity>
      
   

    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>빢</Text>
    </TouchableOpacity>

    </View>
);