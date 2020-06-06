import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'




export default ({navigation}) => (
    <View>
        <TouchableOpacity onPress={()=> navigation.navigate("PlanInsert")}>
        <Text>DTP</Text>
        </TouchableOpacity>
    </View>
);