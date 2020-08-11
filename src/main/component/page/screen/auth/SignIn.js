import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import useStores from '../../../../mobX/helper/useStores';
import { GoogleSigninButton } from '@react-native-community/google-signin';

export default function SignIn() {

    const { authStore } = useStores();

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>
                Hello I am SignIn;
            </Text>

            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={authStore.signInByGoogle}
                />

            <Button
                title="Log out"
                onPress={authStore.logout}
            />

        </View>
    );
}