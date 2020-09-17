import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, ToastAndroid, TouchableWithoutFeedback, Image } from 'react-native';
import EasyDate from '../../../../util/EasyDate';
import useStores from '../../../../mobX/helper/useStores';
import ImageButton from '../../../atom/button/ImageButton';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput'
import RoundColorButton from '../../../atom/button/RoundColorButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Goal, { getBetweenMaxBriefing } from '../../../../rest/model/Goal';
import { inject } from 'mobx-react';

const DAYS = ['일', '월', '화', '수', '목', '금', '토']


const colorList = [
    '#EB5757', '#F2994A', '#F2C94C', '#219653', '#27AE60', '#6FCF97', '#2F80ED', '#2D9CDB',
    '#56CCF2', '#9B51E0', '#BB6BD9'
];

@inject(['detailPlanWriteStore'])
export default class GoalWrite extends Component {

    constructor(props) {
        super(props);

        this.baseGoal = props.route.params ? props.route.params.goal : null;
        this.detailPlanWriteStore = props.detailPlanWriteStore;


        this.state = {
            goalId: this.baseGoal ? this.baseGoal.id : null,
            goalPurposeId: this.baseGoal ? this.baseGoal.purposeId : null,
            goalName: this.baseGoal ? this.baseGoal.name : '',
            goalDescription: this.baseGoal ? this.baseGoal.description : '',
            goalStartDate: this.baseGoal ? this.baseGoal.startDate : this.detailPlanWriteStore.entryStartDate.isAfter(EasyDate.now()) ? EasyDate.now() : this.detailPlanWriteStore.entryStartDate,
            goalEndDate: this.baseGoal ? this.baseGoal.endDate : this.detailPlanWriteStore.entryEndDate,
            goalColor: this.baseGoal ? this.baseGoal.color : colorList[0],
            goalCycleType: this.baseGoal ? (this.baseGoal.cycleType == 'A' ? 0 : 1) : 0,
            goalCycleParamByDays: (() => {
                const init = [false, false, false, false, false, false, false]
                const cycleParams = this.baseGoal ? this.baseGoal.cycleParams : [];

                cycleParams.forEach((value) => {
                    init[value] = true;
                })

                return init;
            })(),
            showDatePicker: false,
            changeDate: null,
            selectDate: null
        }

        this.isWrited = false;

    }

    _vaild = () => {
        const cycleType = this.state.goalCycleType == 0 ? 'A' : 'W';
        const cycleParams = [];

        this.state.goalCycleParamByDays.forEach((value, index) => {
            if (value)
                cycleParams.push(index);
        })


        if (this.state.goalName == '') {
            ToastAndroid.showWithGravity('목표 이름을 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return false;
        } else if (!(/[^\s]/g).test(this.state.goalName)) {
            ToastAndroid.showWithGravity('목표 이름이 공백이 될 순 없습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return false;
        } else if (this.state.goalDescription == '') {
            ToastAndroid.showWithGravity('목표 설명을 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return false;
        } else if (!(/[^\s]/g).test(this.state.goalDescription)) {
            ToastAndroid.showWithGravity('목표 설명이 공백이 될 순 없습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return false;
        } else if (this.state.goalStartDate.isBefore(this.state.goalEndDate)) {
            ToastAndroid.showWithGravity('종료날짜는 시작날짜의 이후여야 합니다.', ToastAndroid.SHORT, ToastAndroid.CENTER)
            return false;
        } else if (getBetweenMaxBriefing(this.state.goalStartDate, this.state.goalEndDate, cycleType, cycleParams).day == 0) {
            ToastAndroid.showWithGravity('기간 내에 수행할수 있는 날짜가 없습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
            return false;
        }

        return true;
    }

    _updateGoal = () => {
        if (!this._vaild()){
            this.isWrited = false;
            return;
        }

        let formatCycle = this.state.goalCycleType == 0 ? 'A' : 'W';
        if (this.state.goalCycleType == 1) {
            this.state.goalCycleParamByDays.forEach((checked, index) => {
                if (checked) {
                    formatCycle += ' ' + index;
                }
            })
        }

        this.detailPlanWriteStore.update(
            new Goal(this.state.goalId, this.state.goalPurposeId, this.state.goalName, this.state.goalDescription
                , this.state.goalStartDate, this.state.goalEndDate, this.state.goalColor, formatCycle, 0, null)
        )

        this.props.navigation.navigate('DetailPlanWriteBoard');



    }


    render() {


        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                {this.state.showDatePicker &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.changeDate == 0 ? this.state.goalStartDate : this.state.goalEndDate}
                        is24Hour={true}
                        display="default"
                        minimumDate={this.detailPlanWriteStore.entryStartDate}
                        onChange={(event, date) => {
                            if (event.type == 'set') {
                                date = new EasyDate(date);
                                const data = this.state.changeDate == 0 ? { goalStartDate: date } : { goalEndDate: date };
                                
                                this.setState({
                                    selectDate: date.isBefore(this.detailPlanWriteStore.entryStartDate.minusDays(1)) ? date : this.state.selectDate,
                                    selectDate: null,
                                    showDatePicker: false,
                                    ...data,
                                })
                            }
                        }}
                    />}
                <View style={styles.headerContainer}>
                    <ImageButton
                        source={
                            require('../../../../../../asset/button/arrow_button.png')
                        }
                        backgroundStyle={{ width: 50, height: '100%' }}
                        imageStyle={{
                            width: 32,
                            height: 37,
                            tintColor: 'black'
                        }}
                        onPress={this.props.navigation.goBack}
                    />
                    <ImageButton
                        source={require('../../../../../../asset/button/check_button.png')}
                        backgroundStyle={{ 
                            width: 50, height: '100%' , paddingBottom:6
                            }}
                        imageStyle={{ width: 29, height: 27 }}
                        onPress={() => {
                            if(this.isWrited)
                                return;
                            this.isWrited = true;
                            this._updateGoal()}}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View style={{ paddingBottom: 50}}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>수행 목표를 설정해 주세요.</Text>
                    </View>
                    <View style={styles.editContainer}>
                        <CaterPlannerTextInput
                            // ref={(r) => {
                            //     this.goalNameInput = r;
                            // }}
                            label={'수행 목표 이름 설정하기'}
                            numberOfLines={1}
                            maxLength={32}
                            placeHolder={"이름을 입력하세요"}
                            // onSubmitEditing={event => {
                            //     this.goalDescriptionInput.focus();
                            // }}
                            onChangeText={text => {
                                this.setState({
                                    goalName: text
                                })
                            }}
                            value={this.state.goalName}
                        />
                    </View>
                    <View style={styles.editContainer}>
                        <CaterPlannerTextInput
                            // ref={(r) => { this.goalDescriptionInput = r; }}
                            label={'수행 목표 설명 적기'}
                            maxLength={100}
                            multiline={true}
                            placeHolder={'내용을 입력하세요'}
                            blueOnSumbit={true}
                            onSubmitEditing={event => {

                            }}
                            onChangeText={text => {
                                this.setState({
                                    goalDescription: text
                                })
                            }}
                            value={this.state.goalDescription}

                        />
                    </View>
                    <Text style={{ marginBottom: 30 }}>목표 상세 설정</Text>
                    <View style={[styles.editContainer, styles.choiceContainer]}>
                        <Text>
                            시작일
                         </Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({
                                changeDate: 0,
                                selectDate: this.state.goalStartDate,
                                showDatePicker: true
                            })
                        }}>
                            <View style={styles.choiceDateButton}>

                                <Text style={{ textAlign: 'center' }}>
                                    {this.state.goalStartDate.toStringDateByView()}
                                </Text>
                                <Image
                                    style={styles.choiceIcon}
                                    source={require('../../../../../../asset/icon/calender_icon.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.editContainer, styles.choiceContainer]}>
                        <Text>
                            마지막일
                         </Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({
                                changeDate: 1,
                                selectDate: this.state.goalEndDate,
                                showDatePicker: true
                            })
                        }}>
                            <View style={styles.choiceDateButton}>
                                <Text style={{ textAlign: 'center' }}>
                                    {this.state.goalEndDate.toStringDateByView()}
                                </Text>
                                <Image
                                    style={styles.choiceIcon}
                                    source={require('../../../../../../asset/icon/calender_icon.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.editContainer, styles.choiceContainer]}>
                        <Text>
                            목표 색 설정
                         </Text>
                        <View style={{ flex: 1 }} />
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ width: 80, height: 50 }} contentContainerStyle={{ alignItems: 'center' }}>
                            {
                                colorList.map((color, index) => {
                                    const circleWidth = colorList[index] == this.state.goalColor ? 35 : 25;
                                    return (
                                        <TouchableOpacity
                                            style={{ marginHorizontal: 5, width: circleWidth, height: circleWidth, backgroundColor: color, borderRadius: circleWidth }}
                                            onPress={() => {
                                                this.setState({
                                                    goalColor: colorList[index]
                                                })
                                            }}
                                        />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={[styles.editContainer, styles.choiceContainer]}>
                        <Text>
                            브리핑 주기
                         </Text>
                        <View style={[styles.choiceContainer, { width: 170 }]}>
                            <RoundColorButton
                                text={'매일'}
                                textStyle={{
                                    textAlign: 'center'
                                }}
                                borderWidth={0}
                                elevation={this.state.goalCycleType == 0 ? 1 : 0}
                                color={this.state.goalCycleType == 0 ? 'white' : '#F2F2F2'}
                                width={80}
                                height={33}
                                onPress={() => {
                                    this.setState({
                                        goalCycleType: 0
                                    })
                                }}
                            />
                            <RoundColorButton
                                text={'매주'}
                                textStyle={{
                                    textAlign: 'center'
                                }}
                                borderWidth={0}
                                elevation={this.state.goalCycleType == 1 ? 1 : 0}
                                color={this.state.goalCycleType == 1 ? 'white' : '#F2F2F2'}
                                width={80}
                                height={33}
                                onPress={() => {
                                    this.setState({
                                        goalCycleType: 1
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.editContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                            {
                                DAYS.map((dayName, index) => {
                                    return (
                                        <TouchableOpacity
                                            disabled={this.state.goalCycleType == 0}
                                            style={{
                                                width: 40, height: 40, borderRadius: 40,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                elevation: this.state.goalCycleParamByDays[index] || this.state.goalCycleType == 0 ? 1 : 0,
                                                backgroundColor: this.state.goalCycleParamByDays[index] || this.state.goalCycleType == 0 ? 'white' : '#F2F2F2'
                                            }}
                                            onPress={() => {
                                                this.state.goalCycleParamByDays[index] = !this.state.goalCycleParamByDays[index];

                                                let isFull = true;
                                                this.state.goalCycleParamByDays.forEach((value) => {
                                                    if (!value)
                                                        isFull = false;
                                                });

                                                this.setState({
                                                    goalCycleType: isFull ? 0 : this.state.goalCycleType,
                                                    goalCycleParamByDays: isFull ? [false, false, false, false, false, false, false] : this.state.goalCycleParamByDays
                                                })

                                            }}
                                        >
                                            <Text>{dayName}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        height: 53
        },
    contentContainer: {
        paddingTop: 10,
        paddingHorizontal: 15
    },
    editContainer: {
        marginBottom: 30
    },
    choiceDateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width : 155,
        padding: 5,
        borderBottomWidth: 1
    },
    choiceIcon:{
        width: 22,
        height: 22
    },
    choiceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})