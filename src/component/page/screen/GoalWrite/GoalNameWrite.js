import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import purposeStyles from './stylesheet/PurposeStyles';


export default function GoalNameWrite({ mainGoal }) {

    const [mainGoalName, setMainGoalName] = useState("");

    return (
        <View style={purposeStyles.container}>
            <View style={[purposeStyles.titleContainer, {flex:1}]}>
                <Text style={purposeStyles.title}>당신의 목표는 무엇인가요?</Text>
            </View>
            <View style={[purposeStyles.bottomContainer, {flex:8}]}>
            <TextInput
                numberOfLines={1}
                maxLength = {32}
                placeholder={"목표 이름을 적어주세요!"}
                onChangeText={text => {
                    setMainGoalName(text);
                    mainGoal.name = text;
                }}
                value={mainGoalName}
            />
            </View>
        </View>
    );
}

