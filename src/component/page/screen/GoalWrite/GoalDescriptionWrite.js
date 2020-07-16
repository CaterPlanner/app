import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import purposeStyles from './stylesheet/PurposeStyles';


export default function GoalDescriptionWrite({mainGoal}) {

    const [mainGoalDescription, setMainGoalDescription] = useState("");

    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, {flex:1}]}>
                <Text 
                style={purposeStyles.title}>
                당신의 목표는... 
                {"\n"} 
                {mainGoal.name}
                </Text>
            </View>
            <View style={[purposeStyles.bottomContainer, {flex:8}]}>
                <TextInput
                    multiline ={true}
                    placeholder="정한 목표에 대한 설명이나 시작하게 된 동기를 적어주세요."
                    onChangeText={text => {
                        setMainGoalDescription(text);
                        mainGoal.description = text;
                    }}
                    value={mainGoalDescription}
                />
            </View>           
        </View>
    );
}


