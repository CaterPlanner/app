import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import DetailPlanIcon from '../../component/atom/button/DetailPlanBlock'


export default function DetailPlanBar(){
    return(
        <View>
            <Button title="<"/>
            <View style={{position: 'absolute'}}>
                <Button title="modify"/>
            </View>
            <DetailPlanIcon/>
            <Button title=">"/>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    }
})