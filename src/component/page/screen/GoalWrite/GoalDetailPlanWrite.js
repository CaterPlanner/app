import React from 'react'
import {View, Text, Button} from 'react-native';

export default function GoalDetailPlanWrite({navigation}) {
    return(
        <View>
            <Text>GoalDetailPlanWrite</Text>
            <Button
                title='Go to DetailPlanWriteNavigator'
                onPress={() => {navigation.navigate('DetailPlanNavigation')}}
            />
        </View>
    );
}