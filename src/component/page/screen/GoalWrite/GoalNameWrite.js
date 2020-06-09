import React from 'react'
import {View, Text} from 'react-native';
import { observer } from 'mobx-react';
import useStores from '../../../../mobX/helper/useStores'

const GoalNameWrite = observer(() => {
    return(
        <View>
            <Text>GoalNameWrite</Text>
        </View>
    );
})

export default GoalNameWrite;