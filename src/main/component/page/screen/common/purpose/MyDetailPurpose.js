import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DetailPurpose from './DetailPurpose';

import useStores from '../../../../../mobX/helper/useStores';
import Request from '../../../../../util/Request';
import Loader from '../../../Loader';

export default function MyDetailPurpose({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const [purpose, setPurpose] = useState(null);

    const { purposeService, authStore } = useStores();


    const getData = async (id) => {

        try {
            Request.get('http://192.168.0.10:5252/purpose/' + id)
            .auth(authStore.userToken)
            .then(data => { //set Online Data;      
                setPurpose(data);
                setIsLoading(false);
            })
            .catch(e => {
                try {
                    purposeService.read(id)
                    .then((data) => { //set Local Data;
                        setPurpose(data);
                        setIsLoading(false);
                    })
                    .catch(e2 => {
                        throw e2;
                    });

                } catch (e) {
                    throw e;
                }
            });

        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <Loader /> : <DetailPurpose data={purpose} />}
        </View>
    );
}