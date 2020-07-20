import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import DetailPlanIcon from '../../component/atom/button/DetailPlanIcon'


const WIDTH = 100;
const HEIGHT = 100;

export default function DetailPlanBar({detailPlan, successorHead, nextClick, callPlanInsert}){
    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems:'flex-start', height:"100%" ,  width:"10%"}}>
                <Button title="<"/>
            </View>
            <View style={{height:"100%", width:"80%"}}>
                <View style={{justifyContent: 'center', alignItems:'center'}}>
                <DetailPlanIcon name={detailPlan.name} color={detailPlan.color} width={300} height={HEIGHT} onPress={() => {console.log(detailPlan.key)}}/>
                </View>
                <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                        <Button title="modify" onPress={callPlanInsert}/>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems:'flex-end' , height:"100%",  width:"10%"}}>
                {successorHead && 
                    <Button title=">" onPress={nextClick}/>
                }
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