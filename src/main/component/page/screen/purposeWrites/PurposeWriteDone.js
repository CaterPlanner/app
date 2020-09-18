import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import ColorButton from '../../../atom/button/ColorButton';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';



export default function PurposeWriteDone() {


    const route = useRoute();
    const navigation = useNavigation();

    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
            resizeMode="stretch"
            style={{ width: 270, height: 220, marginLeft: 20 }}
            source={require('../../../../../../asset/image/caterpillar_great.png')}
        />
        <View style={{ marginTop: 20 }}>
            <Text style={purposeStyles.title}>
                목적 생성이 완료되었습니다!
</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
            <Text style={[purposeStyles.subtitle, { textAlign: 'center' }]}>
                앞으로 매일 목적을 위해 노력해서 {'\n'}
    원하는 모든 것들을 이룰 수 있길 바랍니다.
</Text>
        </View>
        <View style={{marginTop : 60}}>
            <ColorButton
                textStyle={{
                    paddingVertical: 5,
                    textAlign: 'center',
                    color: 'white'
                }}
                text={'완 료'}
                backgroundStyle={{
                    width: Dimensions.get('window').width - 40,       
                    backgroundColor:'#25B046',
                    paddingVertical:4
                }}
                onPress={
                    () => {
                        navigation.navigate('HomeNavigation');
                    }
                }
            />
        </View>
    </View>
    );
}


// [{ "fieldName": "name", "headers": 
// { "content-disposition": "form-data; name=\"name\"" }, "string": "sdfsfsdf" },
//  { "fieldName": "description", "headers": { "content-disposition": "form-data; name=\"description\"" }, "string": "sdfsdfsdf" }, 
//  { "fieldName": "photo", "headers": { "content-disposition": "form-data; name=\"photo\"; filename=\"IMG_20200819_103452.jpg\"", "content-type": "image/jpeg" }, 
//  "name": "IMG_20200819_103452.jpg", "type": "image/jpeg", "uri": "/storage/emulated/0/DCIM/Camera/IMG_20200819_103452.jpg" }, 
//  { "fieldName": "disclosureScope", "headers": { "content-disposition": "form-data; name=\"disclosureScope\"" }, "string": "0" }, 
//  { "fieldName": "statDate", "headers": { "content-disposition": "form-data; name=\"statDate\"" }, "string": "2020-08-23" }, 
//  { "fieldName": "endDate", "headers": { "content-disposition": "form-data; name=\"endDate\"" }, "string": "2020-10-24" }, 
//  { "fieldName": "stat", "headers": { "content-disposition": "form-data; name=\"stat\"" }, "string": "0" }, 
//  { "fieldName": "detailPlans", "headers": { "content-disposition": "form-data; name=\"detailPlans\"" }, 
//  "string": "[{\"id\":0,\"purposeId\":null,\"name\":\"sdfsdf\",\"description\":\"sdfsdf\",\"startDate\":\"2020-08-23T05:17:51.694Z\",\"endDate\":\"2020-10-24T05:17:00.000Z\",\"color\":\"#EB5757\",\"cycle\":\"A\",\"stat\":0,\"briefings\":[]}]" }]