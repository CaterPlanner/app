import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";



export default ({navigation}) => (
    <View>
        <TouchableOpacity onPress={()=> navigation.navigate("WriteName")}>
        <Text>goalw</Text>
        </TouchableOpacity>
    </View>
);