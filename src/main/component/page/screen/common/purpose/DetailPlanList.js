import React from 'react'
import { FlatList, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import DetailPlanPaper from '../../../../atom/button/DatePlanPaper';
import Goal from '../../../../../rest/model/Goal';

export default function DetailPlanList({ navigation }) {

    const route = useRoute();

    const data = route.params.data

    const detailPlans = data.purpose.detailPlans;
    const isOwner = data.isOwner;


    console.log(detailPlans[0].achieve)

    return (
        <FlatList
            style={{ flex: 1, paddingTop : 10}}
            data={detailPlans}
            renderItem={({ item }) => (
                <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
                    <DetailPlanPaper
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