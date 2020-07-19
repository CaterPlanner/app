import React from "../ObjectionWrite/node_modules/react";
import {View, Text, TouchableOpacity} from '../ObjectionWrite/node_modules/react-native'


export default function PlanInsert({route}){
    const {detailPlan} = route.params;
    return(
        <View>
            <Text> This is DetailPlan Key is {detailPlan.key}</Text>
        </View>
    )
}
