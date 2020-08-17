import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';


export default function BriefingPurposeList({ navigation }) {

    const [data, setData] = useState([{
        id: 0,
        name: '해상 라이프가드 되기',
        count: 23,
        imagUri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Sans_undertale.jpg/220px-Sans_undertale.jpg',
        goals: [
            {
                id: 1,
                name: '생존수업 수영 받기',
                acheive: 70
            }
        ]
    },

    ]);


    useEffect(() => {
        console.log('hello')
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 10 }}>
            {
                data.map((purpose) => {
                    return (
                        <PurposePaper
                            imageUri={purpose.imagUri}
                            name={purpose.name}
                            count={purpose.count}
                            onPress={() => {
                                navigation.navigate('BriefingGoalList', {
                                    purposeName: purpose.name,
                                    goals: purpose.goals
                                })
                            }}
                        />
                    )
                })
            }
        </View>
    )
}

