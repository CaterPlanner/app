import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import Request from '../../../../../util/Request';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import Offline from '../../../../organism/Offline';
import DetailProfile from './DetailProfile';
import GlobalConfig from '../../../../../GlobalConfig';
import { useRoute } from '@react-navigation/native';

export default function LoadProfile(){

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const {authStore} = useStores();
    const route = useRoute();

    const loadProfile = async () => {

        try{
            if(!authStore.isLogin){
                setIsLoading(false);
            }else{
                const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/${route.params.id}`)
                .auth(await authStore.getToken())
                .submit();

                setData(response.data);
                setIsLoading(false);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        loadProfile();
    },[])

    return(
        <View style={{flex : 1}}>
            {isLoading ? <Loader/> :
                data == null ?  <Offline/> : <DetailProfile data={data} />
            }
        </View>
    );
}
