import React from 'react';
import {View, Button, Text} from 'react-native';

import useStores from '../../../../mobX/helper/useStores'


export default function BeginTest(){
    const {authStore} = useStores();

    return (
        <View>
            <Text>Hello I am Begin Test!</Text>
            <Button
                title="확인"
                onPress={() => {
                    authStore.setIsBegin(true)
                }}
            />
        </View>
    )
}