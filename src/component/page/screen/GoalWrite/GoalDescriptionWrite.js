import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';


export default function GoalDescriptionWrite({mainGoal}) {

    const [mainGoalDescription, setMainGoalDescription] = useState("");

    return (
        <View style={styles.container}>

            <Text style={styles.title}>당신의 목표는...</Text>
            <Text style={styles.Gettitle}>{mainGoal.name}</Text>
            <Text style={styles.subtitle}>해당 목표를 정한 이유를 간단하게 적어 주세요</Text>
            <TextInput 
                style={styles.title_In} 
                placeholder=" 이유 작성"
                onChangeText={text => {
                    setMainGoalDescription(text);
                    mainGoal.description = text;
                }}
                value={mainGoalDescription}
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
        marginLeft: 20,
        marginTop: 20
    },

    Gettitle: {
        fontSize: 22,
        //fontWeight : "bold",
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 20

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