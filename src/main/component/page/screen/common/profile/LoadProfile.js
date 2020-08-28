import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import Request from '../../../../../util/Request';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import Offline from '../../../../organism/Offline';
import DetailProfile from './DetailProfile';
import GlobalConfig from '../../../../../GlobalConfig';

export default function MyProfile(){

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const {authStore} = useStores();

    const loadProfile = async () => {

        try{
            if(!authStore.isLogin){
                setIsLoading(false);
            }else{
                const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/myProfile`)
                .auth(authStore.userToken.token)
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
