import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'




export default ({navigation}) => (
    <View>
        
        <Text>디테일 플랜{"\n\n"}</Text>
        
        <TouchableOpacity onPress={()=> navigation.navigate("PlanInsert")}>
        <Text>다음으로 PlanInsert</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>빢</Text>
    </TouchableOpacity>
        
    </View>
);