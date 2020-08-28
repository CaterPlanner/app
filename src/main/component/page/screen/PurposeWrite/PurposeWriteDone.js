import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import RoundButton from '../../../atom/button/RoundButton';
import Loader from '../../Loader';

import Request from '../../../../util/Request';
import Purpose from '../../../../rest/model/Purpose';

import PushNotification from 'react-native-push-notification';
import PurposeService from '../../../../rest/service/PurposeService';
import { useNavigation } from '@react-navigation/native';
import { PurposeWriteType } from '../../../../mobX/store/PurposeWriteStore';
import GlobalConfig from '../../../../GlobalConfig';



export default function PurposeWriteDone() {

    const { purposeWriteStore, authStore, appStore } = useStores();

    const [isUploading, setIsUploading] = useState(true);

    navigation = useNavigation();


    const uploadData = async () => {
        
        const result = purposeWriteStore.purpose;
        let response = null;
        try {

            switch (purposeWriteStore.writeType) {
                case PurposeWriteType.CREATE:

                    response = await Request.post(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/purpose', purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(authStore.userToken.token)
                        .submit();

                    await PurposeService.getInstance().create(
                        new Purpose(response.data.id, result.name, result.description, response.data.photoUrl, result.disclosureScope, result.startDate, result.endDate, result.stat),
                        result.detailPlans ?
                            result.detailPlans.forEach((goal) => {
                                goal.purposeId = response.data.id;
                                goal.briefingCount = 0;
                            }) : null
                    );


                    break;

                case PurposeWriteType.MODIFY:

                    response = await Request.patch(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/purpose/' + purposeWriteStore.purpose.id, purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(authStore.userToken.token)
                        .submit();

                    result.photoUrl = response.photoUrl;

                    await PurposeService.getInstance().modify(result.id, result);

                    break;

                case PurposeWriteType.GROUND_MODIFY:

                    response = await Request.put(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/purpose/' + purposeWriteStore.purpose.id, purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(authStore.userToken.token)
                        .submit();

                    result.photoUrl = response.photoUrl;

                    await PurposeService.getInstance().groundModify(result.id, result);

                    break;
            }

            if (result.stat == 0)
                appStore.onScheduler();

            setIsUploading(true);

        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        uploadData();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {isUploading ? <Loader /> :
                (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            resizeMode="stretch"
                            style={{ width: 200, height: 200 }}
                            source={require('../../../../../../asset/image/normal_caterpillar.gif')}
                        />
                        <View style={{ marginTop: 80 }}>
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
                        <View>
                            <RoundButton
                                textStyle={{
                                    paddingVertical: 5,
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                                text={'완 료'}
                                color={'#25B046'}
                                width={280}
                                onPress={
                                    () => {
                                        navigation.navigate('HomeNavigation');
                                    }
                                }
                            />
                        </View>
                    </View>
                )
            }
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