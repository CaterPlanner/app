import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet, Image } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


const data = {
    name: '생존수영 수업 받기',
    startDate: '2020-06-01',
    endDate: '2020-07-30',
    color: '#F8C2C2',
    performs: [
        {
            name: '잠수 심화 수업 듣기',
            endDate: new Date('2020-07-31'),
            cycle: 'A 1 2'
        },
        {
            name: '생존 수영 강의 듣기',
            endDate: new Date('2020-07-31'),
            cycle: 'W 1 2'
        },
        {
            name: '30분 물에 떠 있기',
            endDate: new Date('2020-07-31'),
            cycle: 'A 1 2'
        },
        {
            name: '3분 물 속 잠수하기',
            endDate: new Date('2020-07-31'),
            cycle: 'A 1 2'
        }
    ]
}

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

function PerfromInfo({ goalColor, perform }) {

    const cyclePiece = perform.cycle.split(' ');
    const cylceParam = cyclePiece.slice(1, cyclePiece.length);

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
                        perform.cycle[0] == 'A' ? '매일' : '매주'
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
                                backgroundColor: cylceParam.includes(index.toString()) || perform.cycle[0] == 'A' ? goalColor : '#C4C4C4'
                            }}>
                                <Text>{dayName}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={perfomInfoStyles.propertyContainer}>
                <Text style={perfomInfoStyles.fontStyle}>9/9 수행</Text>
                <Text style={perfomInfoStyles.fontStyle}>100%</Text>
            </View>
            <View style={{ paddingTop: 8, paddingBottom: 20 }}>
                <ProgressBarAnimated style={{
                    alignSelf: 'center', justifyContent: 'center'}} 
                    value={100} height={7} width={Dimensions.get('window').width - 18} animated={true} backgroundColor={'#5EDF8C'} unfilledColor={'#AFAFAF'} borderRadius={0} borderWidth={0} />
            </View>
        </View>
    )
}

function PerformAccordian({ name, performInfo, animationEnd }) {

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
                <View style={performAccordianStyles.icon} />
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

    goal = data;

    console.log('hello')
    return (
        <ScrollView
            ref={(scrollView) => { this.scrollView = scrollView }}
            style={{ flex: 1 }}>
            <View
                style={detailGoalstyles.topBackground}>
            </View>
            <View style={{ width: '100%', backgroundColor: 'white' }}>
                <Text style={detailGoalstyles.goalNameFont}>
                    {goal.name}
                </Text>
                <Text style={detailGoalstyles.goalDecimalDayFont}>
                    {goal.d_day}
                </Text>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>
                            {goal.startDate.toString()}                            
                        </Text>
                        <Text>
                            {goal.endDate.toString()}
                        </Text>
                    </View>
                    <View style={{alignItems : 'center'}}>
                        <ProgressBarAnimated style={{
                            alignSelf: 'center', justifyContent: 'center'}} 
                            value={100} height={7} width={Dimensions.get('window').width - 18} animated={true} backgroundColor={goal.color} unfilledColor={'#AFAFAF'} borderRadius={0} borderWidth={0} />
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', backgroundColor: 'white', marginTop: 10, paddingBottom : 30 }}>
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
                                    animationEnd={() => {
                                        this.scrollView.scrollToEnd({ animated: true,  duration: 500 });
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
        backgroundColor: '#5EDF8C',
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
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 20
    }

})