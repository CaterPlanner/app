import React, { useState } from 'react'
import { View, Text } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import DatePicker from 'react-native-date-picker';
import EasyDate from '../../../../util/EasyDate';

import RoundButton from '../../../atom/button/RoundButton';

export default function PurposeDecimalDayWrite() {

    const { purposeWriteStore } = useStores();

    const [purposeEndDate, setPurposeEndDate] = useState(new EasyDate().plusDays(1))
    const [purposeStat, setPurposeStat] = useState(0);

    purposeWriteStore.purpose.endDate = purposeEndDate;
    //purposeWriteStore.changePermit(true);

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        목적의 종료일을 정해주세요.
                    </Text>
                </View>
                <View style={purposeStyles.subtitleArea}>
                    <Text style={purposeStyles.subtitle}>
                        목표를 열심히 이루어 목적을 완료해 보아요{"\n"}
                        목적의 종료일까지 노력해 주세요.
                    </Text>
                </View>
            </View>
            <View style={purposeStyles.bottomContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>
                        실천 계획 세우기
                    </Text>
                    <View style={{ width: 160, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <RoundButton
                            text={'지금'}
                            textStyle={{
                                textAlign: 'center'
                            }}
                            elevation={5}
                            color={purposeStat == 0 ? '#F2F2F2' : 'white'}
                            width={75}
                            height={30}
                            onPress={() => {
                                setPurposeStat(0);
                                purposeWriteStore.purpose.stat = 0;
                                purposeWriteStore.omitted(false);

                            }}
                        />
                        <RoundButton
                            text={'나중에'}
                            textStyle={{
                                textAlign: 'center'
                            }}
                            elevation={5}
                            color={purposeStat == 1 ? '#F2F2F2' : 'white'}
                            width={75}
                            height={30}
                            onPress={() => {
                                setPurposeStat(1);
                                purposeWriteStore.purpose.stat = 1;
                                purposeWriteStore.omitted(true);
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    {purposeStat == 0 &&
                        <DatePicker
                            date={purposeEndDate}
                            androidVariant={'nativeAndroid'}
                            minimumDate={EasyDate.now().plusDays(1)}
                            mode={'date'}
                            locale={'ko'}
                            onDateChange={(date) => {
                                date = new EasyDate(date);
                                if (EasyDate.now().isBefore(date)) {
                                    purposeWriteStore.changePermit(false);
                                } else {
                                    purposeWriteStore.purpose.endDate = date;
                                    setPurposeEndDate(date)
                                    purposeWriteStore.changePermit(true);
                                }
                            }}
                        />
                    }
                </View>
            </View>
        </View>
    );
}