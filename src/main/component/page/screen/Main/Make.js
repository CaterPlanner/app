import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';



export default function Make({ navigation }) {

    navigation.navigate('CreateNavigation');

    return (
        <View>
        </View>
    )
}
