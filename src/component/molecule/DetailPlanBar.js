import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import DetailPlanIcon from '../../component/atom/button/DetailPlanIcon'


const WIDTH = 100;
const HEIGHT = 100;

export default function DetailPlanBar({detailPlan, successonHead, nextClick}){
    return(
        <View style={styles.container}>
            <View style={{position: 'absolute'}}>
                {successonHead && 
                    <Button title="modify" onClick={() => nextClick(detailPlan.key)}/>}
            </View>
            <View style={{justifyContent: 'center', alignItems:'flex-start', height:"100%" ,  width:"10%"}}>
                <Button title="<"/>
            </View>
            <View style={{justifyContent: 'center', alignItems:'center', height:"100%", width:"80%"}}>
                <DetailPlanIcon name={detailPlan.name} color={detailPlan.color} width={300} height={HEIGHT} onClick={() => {console.log(detailPlan.key)}}/>
            </View>
            <View style={{justifyContent: 'center', alignItems:'flex-end' , height:"100%",  width:"10%"}}>
                <Button title=">"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
    }
})