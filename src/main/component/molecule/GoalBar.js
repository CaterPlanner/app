import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import DetailPlanIcon from '../atom/button/GoalIcon'


const WIDTH = 300;
const HEIGHT = 100;

export default function DetailPlanBar({goal, successorHead, successor, remove , modify, create}){
    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems:'flex-start', height:"100%" ,  width:"10%"}}>
                <Button title="<"/>
            </View>
            <View style={{height:"100%", width:"80%"}}>
                <View style={{justifyContent: 'center', alignItems:'center'}}>
                <DetailPlanIcon name={goal.name} color={goal.color} width={WIDTH} height={HEIGHT} onPress={() => {modify(goal)}}/>
                </View>
                <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
                        <Button title="remove" onPress={remove}/>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems:'flex-end' , height:"100%",  width:"10%"}}>
                <Button title={successorHead ? ">": "+"} onPress={successorHead ? successor : () => {create(goal.key, 1)}}/>
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