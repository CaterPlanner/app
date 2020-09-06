import React, { Component } from 'react'
import { View, Text, ScrollView, Modal, StyleSheet, ToastAndroid } from 'react-native';
import EasyDate from '../../../../util/EasyDate';
import useStores from '../../../../mobX/helper/useStores';
import ImageButton from '../../../atom/button/ImageButton';
import CaterPlannerTextInput from '../../../atom/input/CaterPlannerTextInput'
import RoundButton from '../../../atom/button/RoundButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
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
            goalName: this.baseGoal ? this.baseGoal.name : null,
            goalDescription: this.baseGoal ? this.baseGoal.description : null,
            goalStartDate: this.baseGoal ? this.baseGoal.startDate : this.detailPlanWriteStore.entryStartDate,
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
        } else if (this.state.goalDescription == '') {
            ToastAndroid.showWithGravity('목표 설명을 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
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
        if (!this._vaild())
            return;

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

        this.props.navigation.goBack();
    }

    componentDidMount() {
        this.goalNameInput.focus();
    }

    render() {

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <Modal
                    transparent={true}
                    visible={this.state.showDatePicker}
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, height: 250, width: 300 }}>
                            <DatePicker
                                date={this.state.selectDate}
                                androidVariant={'nativeAndroid'}
                                minimumDate={this.detailPlanWriteStore.entryStartDate}
                                mode={'date'}
                                locale={'ko'}
                                onDateChange={(date) => {
                                    date = new EasyDate(date);
                                    this.setState({
                                        selectDate: date.isBefore(this.detailPlanWriteStore.entryStartDate.minusDays(1)) ? date : this.state.selectDate
                                    })
                                }}
                            />
                            <View style={{ width: '100%', paddingHorizontal: 50, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <RoundButton
                                    text={'취소'}
                                    width={80}
                                    height={25}
                                    textStyle={{
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                    color={'black'}
                                    onPress={() => {
                                        this.setState({
                                            showDatePicker: false
                                        })
                                    }}
                                />

                                <RoundButton
                                    text={'확인'}
                                    color={'black'}
                                    textStyle={{
                                        color: 'white',
                                        textAlign: 'center'
                                    }}
                                    width={80}
                                    height={25}
                                    onPress={() => {
                                        if (this.state.changeDate == 0) {
                                            this.setState({
                                                goalStartDate: this.state.selectDate, selectDate: null,
                                                showDatePicker: false
                                            })
                                        } else {
                                            this.setState({
                                                goalEndDate: this.state.selectDate, selectDate: null,
                                                showDatePicker: false
                                            })
                                        }


                                    }}
                                />
                            </View>

                        </View>
                    </View>
                </Modal>
                <View style={styles.headerContainer}>
                    <ImageButton
                        source={
                            require('../../../../../../asset/button/arrow_button.png')
                        }

                        backgroundStyle={{ width: 40, height: 40 }}
                        imageStyle={{ width: 25, height: 22 }}
                        onPress={this.props.navigation.goBack}
                    />
                    <ImageButton
                        source={require('../../../../../../asset/button/check_button.png')}
                        backgroundStyle={{ width: 40, height: 40 }}
                        imageStyle={{ width: 40, height: 40 }}
                        onPress={this._updateGoal}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View style={{ paddingBottom: 50 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>목표를 설정해 주세요.</Text>
                    </View>
                    <View style={styles.editContainer}>
                        <CaterPlannerTextInput
                            ref={(r) => {
                                this.goalNameInput = r;
                            }}
                            label={'목적 이름 설정하기'}
                            numberOfLines={1}
                            maxLength={32}
                            placeHolder={"이름을 입력하세요"}
                            onSubmitEditing={event => {
                                this.goalDescriptionInput.focus();
                            }}
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
                            ref={(r) => { this.goalDescriptionInput = r; }}
                            label={'목표 수행 방법 적기'}
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
                        <RoundButton
                            text={this.state.goalStartDate.toStringDateByView()}
                            textStyle={{
                                textAlign: 'center'
                            }}
                            color={'white'}
                            borderWidth={2}
                            width={160}
                            height={33}
                            onPress={() => {
                                this.setState({
                                    changeDate: 0,
                                    selectDate: this.state.goalStartDate,
                                    showDatePicker: true
                                })
                            }}
                        />
                    </View>
                    <View style={[styles.editContainer, styles.choiceContainer]}>
                        <Text>
                            마지막일
                         </Text>
                        <RoundButton
                            text={this.state.goalEndDate.toStringDateByView()}
                            textStyle={{
                                textAlign: 'center'
                            }}
                            color={'white'}
                            borderWidth={2}
                            width={160}
                            height={33}
                            onPress={() => {
                                this.setState({
                                    changeDate: 1,
                                    selectDate: this.state.goalEndDate,
                                    showDatePicker: true
                                })
                            }}
                        />
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
                            <RoundButton
                                text={'매일'}
                                textStyle={{
                                    textAlign: 'center'
                                }}
                                borderWidth={1}
                                color={this.state.goalCycleType == 0 ? this.state.goalColor : '#F2F2F2'}
                                width={80}
                                height={33}
                                onPress={() => {
                                    this.setState({
                                        goalCycleType: 0
                                    })
                                }}
                            />
                            <RoundButton
                                text={'매주'}
                                textStyle={{
                                    textAlign: 'center'
                                }}
                                borderWidth={1}
                                color={this.state.goalCycleType == 1 ? this.state.goalColor : '#F2F2F2'}
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
                                                backgroundColor: this.state.goalCycleParamByDays[index] || this.state.goalCycleType == 0 ? this.state.goalColor : '#C4C4C4'
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


// //class 변환하기
// export default function GoalWrite({ navigation, route }) {

//     const { detailPlanWriteStore } = useStores();

//     const colorList = [
//         '#EB5757', '#F2994A', '#F2C94C', '#219653', '#27AE60', '#6FCF97', '#2F80ED', '#2D9CDB',
//         '#56CCF2', '#9B51E0', '#BB6BD9'
//     ];

//     const baseGoal = route.params ? route.params.goal : null;


//     const goalId = baseGoal ? baseGoal.id : null;
//     const goalPurposeId = baseGoal ? baseGoal.purposeId : null;
//     const [goalName, setGoalName] = useState(baseGoal ? baseGoal.name : '');
//     const [goalDescription, setGoalDescription] = useState(baseGoal ? baseGoal.description : '');
//     const [goalStartDate, setGoalStartDate] = useState(baseGoal ? baseGoal.startDate : detailPlanWriteStore.entryStartDate);
//     const [goalEndDate, setGoalEndDate] = useState(baseGoal ? baseGoal.endDate :  detailPlanWriteStore.entryEndDate);
//     const [goalColor, setGoalColor] = useState(baseGoal ? baseGoal.color  : colorList[0]);
//     const [goalCycleType, setGoalCycleType] = useState(baseGoal ? (baseGoal.cycleType == 'A' ?  0 : 1) : 0); //0 매일 1 매주
//     const [goalCycleParamByDays, setGoalCycleParamByDays] = useState(
//         (() => {
//             const init = [false, false, false, false, false, false, false]
//             const cycleParams = baseGoal ? baseGoal.cycleParams : [];

//             cycleParams.forEach((value) => {
//                 init[value] = true;
//             })

//             return init;
//         })())
//     const goalStat = baseGoal ? baseGoal.stat : 0;

//     //set date system
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [changeDate, setchangeDate] = useState(null);
//     const [selectDate, setSelectDate] = useState(null);

//     const valid = () => {

//         const cycleType = goalCycleType == 0 ? 'A' : 'W';
//         const cycleParams = [];

//         goalCycleParamByDays.forEach((value, index) => {
//             if(value)
//                 cycleParams.push(index);
//         })


//         if(goalName == ''){
//             ToastAndroid.showWithGravity('목표 이름을 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
//             return false;
//         }else if(goalDescription == ''){
//             ToastAndroid.showWithGravity('목표 설명을 입력해주세요', ToastAndroid.SHORT, ToastAndroid.CENTER);
//             return false;
//         }else if(goalStartDate.isBefore(goalEndDate)){
//             ToastAndroid.showWithGravity('종료날짜는 시작날짜의 이후여야 합니다.', ToastAndroid.SHORT, ToastAndroid.CENTER)
//             return false;
//         }else if(getBetweenMaxBriefing(goalStartDate, goalEndDate, cycleType, cycleParams).day == 0){
//             ToastAndroid.showWithGravity('기간 내에 수행할수 있는 날짜가 없습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
//             return false;
//         }

//         return true;
//     }

//     const updateGoal = () => {

//         if(!valid())
//             return;

//         let formatCycle = goalCycleType == 0 ? 'A' : 'W';
//         if(goalCycleType == 1){
//             goalCycleParamByDays.forEach((checked, index) => {
//                 if(checked){
//                     formatCycle += ' ' + index;
//                 }
//             })
//         }

//         detailPlanWriteStore.update(
//             new Goal(goalId, goalPurposeId, goalName, goalDescription ,goalStartDate, goalEndDate, goalColor, formatCycle, goalStat)
//         )

//         navigation.goBack();
//     }


//     useEffect(() => {
//         this.goalNameInput.focus();
//     }, []);


// }

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 7.5,
        flex: 1
    },
    contentContainer: {
        paddingTop: 10,
        paddingHorizontal: 15
    },
    editContainer: {
        marginBottom: 30
    },
    choiceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})