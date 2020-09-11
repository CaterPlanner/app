import React, {useState} from "react";
import {View, Text, StyleSheet, CheckBox, TouchableOpacity} from 'react-native'
import ImageButton from '../../atom/button/ImageButton';
import useStores from "../../../mobX/helper/useStores";


export default function Setting(){

    const {authStore, appStore} = useStores();

    const [allowScheduling, setAllowScheduling] = useState(appStore.isScheduling)

    return(
        <View style={{flex: 1, backgroundColor: 'white'}}> 
            <View style={[styles.box, {flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.boxTitle}>수행 요청 알림 사용</Text>
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
            <TouchableOpacity 
            onPress={() => {
                try{
                    authStore.logout();
                }catch(e){
                    Alert.alert(e);
                }
            }}
            style={[styles.box, {flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.boxTitle}>계정 변경</Text>
    
            </TouchableOpacity>
        <Text>{new Date().toString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box : {
        borderBottomWidth: 0.5,
        height: 60,
        top : 5,
        paddingHorizontal: 10
    },
    boxTitle: {
        fontSize: 20
    }
})
