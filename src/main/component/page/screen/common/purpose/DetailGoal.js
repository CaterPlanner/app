import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet, Image } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Goal from '../../../../../rest/model/Goal';
// import Perform from '../../../../../rest/model/Perform';
import Briefing from '../../../../../rest/model/Briefing';



const DAYS = ['월', '화', '수', '목', '금', '토', '일']

function PerfromInfo({ goalColor, perform }) {

    const cylceParams = perform.cycleParams;

    return (
        <View style={perfomInfoStyles.container}>
            <View style={perfomInfoStyles.propertyContainer}>
                <Text style={perfomInfoStyles.fontStyle}>기간</Text>
                <Text style={perfomInfoStyles.fontStyle}></Text>
            </View>
            <View style={perfomInfoStyles.propertyContainer}>
                <Text style={perfomInfoStyles.fontStyle}>브리핑 주기</Text>
                <Text style={perfomInfoStyles.fontStyle}>
                    {
                        perform.cycleType == 'A' ? '매일' : '매주'
                    }
                </Text>
            </View>
            <View style={perfomInfoStyles.propertyContainer}>
                {
                    DAYS.map((dayName, index) => {
                        return (
                            <View style={{
                                width: 40, height: 40, borderRadius: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: cylceParams.includes(index.toString()) || perform.cycleType == 'A' ? goalColor : '#C4C4C4'
                            }}>
                                <Text>{dayName}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={perfomInfoStyles.propertyContainer}>
            <Text style={perfomInfoStyles.fontStyle}>{perform.currentBriefingCount}/{perform.maxTime} 수행</Text>
            <Text style={perfomInfoStyles.fontStyle}>{perform.achieve}%</Text>
            </View>
            <View style={{ paddingTop: 8, paddingBottom: 20 }}>
                <ProgressBarAnimated style={{
                    alignSelf: 'center', justifyContent: 'center'
                }}
                    value={perform.achieve} height={7} width={Dimensions.get('window').width - 18} animated={true} backgroundColor={goalColor} unfilledColor={'#AFAFAF'} borderRadius={0} borderWidth={0} />
            </View>
        </View>
    )
}

function PerformAccordian({ name, goalColor,  performInfo, animationEnd }) {

    const [expanded, setExpanded] = useState(false);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    return (
        <View style={performAccordianStyles.container}>
            <TouchableOpacity style={performAccordianStyles.headerContainer} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, animationEnd);
                setExpanded(!expanded);
            }}>
                <View style={[performAccordianStyles.icon, {backgroundColor : goalColor}]} />
                <Text style={performAccordianStyles.titleFont}>{name}</Text>
                <View style={{ flex: 1 }} />
                <View style={{ marginRight: 10 }}>
                    <Image
                        source={require('../../../../../../../asset/image/scroll_vector.png')}
                        style={{
                            transform: [{ rotate: expanded ? '180deg' : '0deg' }]
                        }}
                    />
                </View>
            </TouchableOpacity>
            {!expanded &&
                <View style={{ height: 1, backgroundColor: 'black' }} />}
            {
                expanded &&
                <View style={{}}>
                    {performInfo}
                </View>
            }
        </View>
    )
}


export default function DetailGoal({ goal }) {

 

    goal = new Goal(0, 0, '생존수영 수업 받기', '2020-06-01', '2020-07-30', '#F8C2C2' , 1);
    performs = [
        new Perform(0, 0, 0,'잠수 심화 수업 듣기', 'W 1 2' ,'2020-06-01', '2020-07-30' ),
        new Perform(1, 0, 0,'생존 수영 강의 듣기', 'W 1 2' ,'2020-06-01', '2020-07-30' ),
        new Perform(2, 0, 0,'30분 물에 떠 있기', 'A' ,'2020-06-01', '2020-07-30' ),
        new Perform(3, 0, 0,'3분 물 속 잠수하기', 'W 2 3' ,'2020-06-01', '2020-07-30' ),
        new Perform(4, 0, 0,'3분 물 속 잠수하기', 'W 2 3' ,'2020-06-01', '2020-07-30' ),
        new Perform(5, 0, 0,'3분 물 속 잠수하기', 'W 2 3' ,'2020-06-01', '2020-07-30' ),
        new Perform(6, 0, 0,'3분 물 속 잠수하기', 'W 2 3' ,'2020-06-01', '2020-07-30' ),
    ]
    goal.setPerforms(performs);
    goal.performs[0].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )
    goal.performs[1].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )
    goal.performs[2].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )
    goal.performs[3].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )
    goal.performs[4].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )
    goal.performs[5].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )
    goal.performs[6].setBriefings(
        [
            new Briefing(0, 0, '2020-06-02', 0),
            new Briefing(0, 0, '2020-06-03', 0),
        ]
    )

    
    return (
        <ScrollView
            ref={(scrollView) => { this.scrollView = scrollView }}
            style={{ flex: 1 }}
        >
            <View
                style={detailGoalstyles.topBackground}/>
            <View style={{ width: '100%', backgroundColor: 'white' }}>
                <Text style={detailGoalstyles.goalNameFont}>
                    {goal.name}
                </Text>
                <Text style={detailGoalstyles.goalDecimalDayFont}>
                    D-3
                </Text>
                <View style={{ marginHorizontal: 12, paddingVertical: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Text>
                            {goal.startDate.toString()}
                        </Text>
                        <Text>
                            {goal.endDate.toString()}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <ProgressBarAnimated style={{
                            alignSelf: 'center', justifyContent: 'center'
                        }}
                            value={goal.achieve} height={7} width={Dimensions.get('window').width - 18} animated={true} backgroundColor={goal.color} unfilledColor={'#AFAFAF'} borderRadius={0} borderWidth={0} />
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', marginTop: 10, paddingBottom: 30 }}>
                <Text style={{ fontSize: 15, marginLeft: 12, marginVertical: 6 }}>
                    수행 방법 리스트
                </Text>
                <View>
                    {
                        goal.performs.map((perform) => {
                            return (
                                <PerformAccordian
                                    name={perform.name}
                                    performInfo={(
                                        <PerfromInfo perform={perform} goalColor={goal.color} />
                                    )}
                                    goalColor={goal.color}
                                    animationEnd={() => {
                                        
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const perfomInfoStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
    },
    fontStyle: {
        fontSize: 15
    },
    propertyContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8
    }
})

const performAccordianStyles = StyleSheet.create({
    container: {
        marginHorizontal: 12
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
    },
    titleFont: {
        fontSize: 15
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 35,
        marginRight: 10
    }
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
        paddingTop: 30,
        paddingBottom: 8
    },
    goalDecimalDayFont: {
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 12
    }

})