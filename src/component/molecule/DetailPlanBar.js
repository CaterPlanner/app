import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import DetailPlanIcon from '../../component/atom/button/DetailPlanBlock'


const WIDTH = 200;
const HEIGHT = 400;

export default function DetailPlanBar({detailPlan, nextClick}){
    return(
        <View>
            <View style={{position: 'absolute'}}>
                {detailPlan.successonHead && 
                    <Button title="modify" onClick={() => nextClick(detailPlan.key)}/>}
            </View>
            <DetailPlanIcon name={detailPlan.name} color={detailPlan.color} width={WIDTH} height={HEIGHT}/>
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