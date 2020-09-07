import React, {useState} from "react";
import {View, Text, StyleSheet, CheckBox, Alert} from 'react-native'
import ImageButton from '../../atom/button/ImageButton';
import useStores from "../../../mobX/helper/useStores";


export default function Setting(){

    const {authStore, appStore} = useStores();

    const [allowScheduling, setAllowScheduling] = useState(appStore.isScheduling)

    return(
        <View style={{flex: 1, backgroundColor: 'white'}}> 
            <View style={[styles.box, {flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.boxTitle}>브리핑 알림 사용</Text>
                <CheckBox value={allowScheduling}
                    onValueChange={() => {
                        if(allowScheduling){
                            appStore.offScheduler();
                            setAllowScheduling(false);
                        }else{
                            appStore.onScheduler();
                            setAllowScheduling(true);
                        }
                    }}
                />
            </View>
            <View style={[styles.box, {flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.boxTitle}>계정 변경</Text>
                <ImageButton
                    backgroundStyle={{
                        marginRight: 10
                    }}
                    imageStyle={{
                        width: 10, height : 20
                    }}
                    source={require('../../../../../asset/button/next_button.png')}
                    onPress={() => {
                        try{
                            authStore.logout();
                        }catch(e){
                            Alert.alert(e);
                        }
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box : {
        borderBottomWidth: 0.5,
        height: 60,
        paddingHorizontal: 10
    },
    boxTitle: {
        fontSize: 20
    }
})
