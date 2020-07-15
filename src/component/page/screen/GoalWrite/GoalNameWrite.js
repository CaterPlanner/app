import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';


export default function GoalNameWrite({ mainGoal }) {

    const [mainGoalName, setMainGoalName] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>당신의 목표는 무엇인가요?</Text>

            <TextInput
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.title_In}
                placeholder={"목표 이름을 적어주세요!"}
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
        marginLeft: '-3%'
        //borderWidth: 1,

    },


})