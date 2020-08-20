import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import useStores from '../../../../mobX/helper/useStores';
import Loader from '../../Loader';


export default function BriefingPurposeList({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    const { purposeService } = useStores();

    const getDate = async () => {

        try {
            const purposes = await purposeService.findPurposeForBrifingList();
            setData(purposes);
            setIsLoading(false);

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getDate();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {isLoading ? <Loader /> : (
                <FlatList
                    style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10}}
                    data={data}
                    renderItem={({ item : purpose }) => (
                        <View style={{ marginTop: 8 }}>
                            <PurposePaper
                                imageUri={purpose.imageUrl}
                                name={purpose.name}
                                count={purpose.detailPlans.length}
                                onPress={() => {
                                    navigation.navigate('BriefingGoalList', {
                                        purposeName: purpose.name,
                                        goals: purpose.detailPlans
                                    })
                                }}
                            />
                        </View>
                    )}
                />
            )
            }
        </View>
    );
}