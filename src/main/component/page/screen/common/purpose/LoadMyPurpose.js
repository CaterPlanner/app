import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DetailPurpose from './DetailPurpose';

import useStores from '../../../../../mobX/helper/useStores';
import Request from '../../../../../util/Request';
import Loader from '../../../Loader';
import { useRoute } from '@react-navigation/native';
import Purpose from '../../../../../rest/model/Purpose';
import Goal from '../../../../../rest/model/Goal';
import PurposeService from '../../../../../rest/service/PurposeService';
import GlobalConfig from '../../../../../GlobalConfig';


export default function LoadMyPurpose({ navigation }) {

    const route = useRoute();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const { authStore } = useStores();


    const getData = async () => {

        const id = route.params.id;

        try {
            if(!authStore.offlineMode){
                const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${id}`)
                .auth(authStore.userToken.token).submit();

                const purpose = new Purpose(response.data.id, response.data.name, response.data.description, response.data.photoUrl, response.data.disclosureScope,
                    response.data.startDate, response.data.endDate, response.data.stat);
                    
                purpose.setDetailPlans(
                    response.data.detailPlans.map((goal) =>(
                        new Goal(goal.id, goal.purposeId, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate, goal.stat)
                    ))
                );

                setData({
                    ...response.data,
                    purpose: purpose,
                    refreshHome : route.params.refreshHome,
                    refreshPurpose : getData
                });

            }else{
                const offlineUser = authStore.user;

                setData({
                    purpose : await PurposeService.getInstance().read(id),
                    author : {
                        name : offlineUser.name,
                        profileUrl : offlineUser.profileUrl
                    }
                });
            }

            setIsLoading(false);

        } catch (e) {
            console.log(e);
            navigation.goBack();
        }

    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <Loader /> : <DetailPurpose data={data} />}
        </View>
    );
}