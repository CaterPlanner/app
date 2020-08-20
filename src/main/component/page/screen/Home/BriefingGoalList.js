import React from 'react';
import {View, FlatList} from 'react-native';
import DetailPlanCheckBox from '../../../atom/checkbox/DetailPlanCheckbox';


export default function BriefingGoalList(){

    const data = [
        {
            color: 'red',
            name: 'hello',
            acheive: 50
        },
        {
            color: 'blue',
            name: 'dsfsdf',
            acheive: 100
        },
    ]


    return(
        <FlatList
            style={{flex: 1}}
            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20}}
            data={data}
            renderItem={({item}) => (
                <View style={{ marginTop: 8}}>
                    <DetailPlanCheckBox
                        color={item.color}
                        name={item.name}
                        acheive={item.acheive}
                    />
                </View>
            )}
        />
    );

}


