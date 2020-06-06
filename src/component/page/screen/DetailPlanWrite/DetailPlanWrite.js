import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'




export default ({navigation}) => (
    <View>
        <TouchableOpacity onPress={()=> navigation.navigate("PlanInsert")}>
        <Text>DTP{"\n\n"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>빢</Text>
    </TouchableOpacity>
        
    </View>
);