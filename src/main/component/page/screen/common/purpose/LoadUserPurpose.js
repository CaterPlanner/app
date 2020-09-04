import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import GlobalConfig from '../../../../../GlobalConfig';
import Request from '../../../../../util/Request';
import Purpose from '../../../../../rest/model/Purpose';
import Goal from '../../../../../rest/model/Goal';
import DetailPurpose from './DetailPurpose';


export default function LoadUserPurpose({ navigation }) {

    const route = useRoute();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const { authStore } = useStores();


    const getData = async () => {
        try {
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${route.params.id}`)
                .auth(authStore.userToken.token).submit();

            const purpose = new Purpose(response.data.id, response.data.name, response.data.description, response.data.photoUrl, response.data.disclosureScope,
                response.data.startDate, response.data.endDate, response.data.stat);

            purpose.setDetailPlans(
                response.data.detailPlans.map((goal) => (
                    new Goal(goal.id, purpose.id, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.stat)
                ))
            );

            setData({
                ...response.data,
                purpose: purpose
            });

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
    )

}