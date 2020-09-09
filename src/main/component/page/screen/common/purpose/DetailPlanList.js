import React from 'react'
import { FlatList, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import DetailPlanStat from '../../../../atom/button/DetailPlanStat';
import Goal from '../../../../../rest/model/Goal';

export default function DetailPlanList({ navigation }) {

    const route = useRoute();

    const data = route.params.data

    const detailPlans = data.purpose.detailPlans;
    const isOwner = data.isOwner;



    return (
        <FlatList
            style={{ flex: 1, paddingTop : 10}}
            data={detailPlans}
            renderItem={({ item }) => (
                <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
                    <DetailPlanStat
                        goal={item}
                        onPress={() => {
                            navigation.navigate('DetailGoal', {
                                goal: item
                            })
                        }}
                    />
                </View>
            )}

        />
    )
}