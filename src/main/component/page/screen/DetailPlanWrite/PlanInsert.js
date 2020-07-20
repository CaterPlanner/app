import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'


export default function PlanInsert({route}){
    const {detailPlan} = route.params;
    return(
        <View>
            <Text> This is DetailPlan Key is {detailPlan.key}</Text>
        </View>
    )
}
