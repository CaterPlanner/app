import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import MyPrgoressBar from '../../../../atom/progressBar/MyProgressBar';
import { useRoute } from '@react-navigation/native';
import SafeOverFlowText from '../../../../atom/text/SafeOverFlowText';


const DAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function DetailGoal() {

    const goal = useRoute().params.goal;

    return (
        <View
            style={{ flex: 1 }}
        >
            {/* <View
                style={detailGoalstyles.topBackground}/> */}
            <View style={{ width: '100%', backgroundColor: 'white', paddingHorizontal: 10 }}>
                <Text style={detailGoalstyles.goalNameFont}>
                    {goal.name}
                </Text>
                <SafeOverFlowText
                    backgroundStyle={{marginTop : 15}}
                    fontStyle={detailGoalstyles.goalDescription}
                    text={goal.description}
                    minNumberOfLines={4}
                />
                {/* <View style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                    <Text>다음 수행 날짜   2019-02-03</Text>
                </View> */}
                <View style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={detailGoalstyles.goalAchieveFont}>
                            달성률
                        </Text>
                        <Text style={detailGoalstyles.goalAchieveFont}>
                            {goal.achieve}%
                        </Text>
                    </View>
                    <MyPrgoressBar
                        width={Dimensions.get('window').width - 18}
                        height={7}
                        animated={true}
                        barColor={goal.color}
                        value={goal.achieve}
                    />
                </View>
            </View>
            <View style={{ flex: 1, marginTop: 7, backgroundColor: 'white', paddingHorizontal: 12 }}>
                <Text style={{ fontSize: 17, paddingVertical: 10, textAlign: 'left' }}>
                    수행 방법
                </Text>
                <View>
                    <View style={detailGoalstyles.infoPropertyContainer}>
                        <Text style={detailGoalstyles.goalInfoFont}>기간</Text>
                        <Text style={detailGoalstyles.goalInfoFont}>
                            {goal.startDate.toString()} ~ {goal.endDate.toString()}</Text>
                    </View>
                    <View style={detailGoalstyles.infoPropertyContainer}>
                        <Text style={detailGoalstyles.goalInfoFont}>수행 주기</Text>
                        <Text style={detailGoalstyles.fogoalInfoFontntStyle}>
                            {
                                goal.cycleType == 'A' ? '매일' : '매주'
                            }
                        </Text>
                    </View>
                    <View style={detailGoalstyles.infoPropertyContainer}>
                        {
                            DAYS.map((dayName, index) => {
                                return (
                                    <View style={{
                                        width: 40, height: 40, borderRadius: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: goal.cycleParams.includes(index.toString()) || goal.cycleType == 'A' ? goal.color : '#C4C4C4'
                                    }}>
                                        <Text>{dayName}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

const perfomInfoStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
    },
})

const detailGoalstyles = StyleSheet.create({
    topBackground: {
        width: '100%',
        height: Dimensions.get('window').height * 0.33,
        backgroundColor: 'red',
    },
    goalNameFont: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
        marginBottom: 8
    },
    goalDescription: {
        fontSize: 15,
        textAlign: 'left',
    },
    goalAchieveFont: {
        fontSize: 14,
        textAlign: 'right',
        paddingVertical: 8
    },
    goalInfoFont: {
        fontSize: 16
    },
    infoPropertyContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10
    }

})