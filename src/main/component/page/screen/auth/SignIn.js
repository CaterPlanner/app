import React from 'react';
import {View, Text} from 'react-native';
import useStores from '../../../../mobX/helper/useStores';
import { Button } from 'native-base';

export default function SignIn(){
    
    const {authStore} = useStores();

    return(
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>
            Hello I am SignIn;
            </Text>

            <Button
                title="Google Sign-In"
                onPress={() => authStore.signInByGoogle}
            />
        </View>
    );
}