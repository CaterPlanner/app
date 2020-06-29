import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';


export default function GoalNameWrite({ mainGoal }) {

    const [mainGoalName, setMainGoalName] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>새로운  목표를  정해주세요</Text>
            <Text style={styles.subtitle}>목표 제목 설정하기</Text>
            <TextInput
                style={styles.title_In}
                placeholder={"목표 계획"}
                onChangeText={text => {
                    setMainGoalName(text);
                    mainGoal.name = text;
                }}
                value={mainGoalName}
            />
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },

    title: {
        fontSize: 22,
        //fontWeight : "bold",
        margin: 20
    },

    subtitle: {
        marginLeft: 20
    },

    title_In: {
        marginTop: 20,
        height: 40,
        alignSelf: 'center',
        width: "91%",
        borderWidth: 1,

    },


})