import React from 'react';
import { View, Text, Button, fetch } from 'react-native'
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth'

GoogleSignin.configure({
    scopes: [],
    webClientId: '824557913187-k8onrhv3nt0q5cbfvc2hf6gamspjseo1.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
});

function onGoogleButtonPress() {
    GoogleSignin.signIn()
    .then((data) => {
        console.log(data);
        const googleCre = auth.GoogleAuthProvider.credential(data.idToken);
        console.log(auth().signInWithCredential(googleCre))
    });
}

const newGoals = () => {
    return (
        <View>
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress()}
            />
        </View>
    )
}

export default newGoals;