import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import Request from '../../../../../util/Request';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import Offline from '../../../../atom/icon/Offline';
import UserProfile from './UserProfile';

export default function MyProfile(){

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const {authStore} = useStores();

    const loadProfile = async () => {

        try{
            if(!authStore.isLogin){
                setIsLoading(false);
            }else{
                Request.get('http://192.168.0.10:5252/user/myProfile')
                .auth(authStore.userToken)
                .submit()
                .then((response) => {
                    setData(response);
                    setIsLoading(true);
                })
                .catch((error) => {
                    setIsLoading(false);
                    throw error.message;
                })
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        loadProfile();
    })

    return(
        <View style={{flex : 1}}>
            {isLoading ? <Loader/> :
                data == null ?  <Offline/> : <UserProfile data={data} />
            }
        </View>
    );
}
