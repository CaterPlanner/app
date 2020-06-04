/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, View} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/app'

GoogleSignin.configure({
  scopes: [],
  webClientId: '824557913187-k8onrhv3nt0q5cbfvc2hf6gamspjseo1.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

async function onGoogleButtonPress(){
  const data = await GoogleSignin.signIn();
  console.log(data);
}

const App = () => {
  return (
    <View>
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress()}
    />
    </View>
  );
};





export default App;
