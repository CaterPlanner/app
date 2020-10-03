import React, {useState} from "react";
import {View, Text, StyleSheet, Switch, TouchableOpacity, Modal} from 'react-native'
import ImageButton from '../../atom/button/ImageButton';
import useStores from "../../../mobX/helper/useStores";
import UITutorial from "./tutorial/UITutorial";


export default function Setting(){

    const {authStore, appStore} = useStores();

    const [allowScheduling, setAllowScheduling] = useState(appStore.isScheduling)
    const [showTutorial, setShowTutorial] = useState(false);

    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Modal
            transparent={true}
            visible={showTutorial}
            >
            <UITutorial finish={() => {
                setShowTutorial(false);
            }}/>
            </Modal>
            <View style={[styles.box, {flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.boxTitle}>수행 요청 알림 사용</Text>
                <Switch value={allowScheduling}
                    trackColor={{false: "#888888", true: "#00B412"}}
                    thumbColor={allowScheduling ? "white" : "#f4f3f4"}
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
            <TouchableOpacity 
            onPress={() => {
               setShowTutorial(true);
            }}
            style={[styles.box, {flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                <Text style={styles.boxTitle}>튜토리얼 다시보기</Text>
            </TouchableOpacity>
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
