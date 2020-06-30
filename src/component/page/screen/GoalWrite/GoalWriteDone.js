import React from 'react'
import { View, Text, Button } from 'react-native';

export default function GoalWriteDone({ mainGoal, navigation }) {
    return (
        <View>
            <Text>GoalWriteDone</Text>
            <Button
                title="Done"
                onPress={
                    () => {
                        navigation.navigate('MainNavigation', {
                            screen: 'Home',
                            params: {
                                screen: 'PlanView',
                                params: {
                                    mainGoal : mainGoal
                                }
                            }
                        })
                    }
                }
            />
        </View>
    );
}