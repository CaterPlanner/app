import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StatusBar, StyleSheet, Modal, PixelRatio } from 'react-native';
import useStores from '../../../../mobX/helper/useStores';
import Loader from '../../Loader';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import normalize from '../../../../util/noramlize';

const fullWidth = Dimensions.get('window').width;

// function SocialButton({ logo, name, onPress }) {
//     return (
//         <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', backgroundColor: '#1FBE2F', width: 300, height: 45, alignItems: 'center', justifyContent: 'center' }}>
//             <View style={{ position: 'absolute', left: 15, height: '100%' }}>
//                 <View style={{ justifyContent: 'center', flex: 1 }}>
//                     <Image
//                         resizeMode={'stretch'}
//                         source={logo}
//                         style={{ width: 25, height: 25 }}
//                     />
//                 </View>
//             </View>
//             <Text style={{ marginLeft: 20, color: 'white', fontSize: 18, textAlign: 'center' }}>
//                 {name}
//             </Text>
//         </TouchableOpacity>
//     )
// }


export default function SignIn() {

    const [isLoading, setIsLoading] = useState(false);
    const { authStore } = useStores();

    const loginGoogle = async () => {
        try {
            setIsLoading(true);
            await authStore.signInByGoogle();

        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor:'white' }}>
            <StatusBar hidden />
            <Modal
                transparent={true}
                visible={isLoading}
            >
                <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
                    <Loader />
                </View>
            </Modal>
            <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <View>
                        <Image
                            resizeMode={'stretch'}
                            source={require('../../../../../../asset/image/intro_logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={{ marginTop: '20%' }}>
                        <GoogleSigninButton
                            style={styles.googleButton}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={loginGoogle}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    logo : {
        width: 250, 
        height: 230
    },
    googleButton : {
        width:  300,  
        height: 60,
    }
})




