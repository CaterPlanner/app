import React, { useState } from 'react'
import { View, Text } from 'react-native';
import purposeStyles from '../purposeWrite/style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import DatePicker from 'react-native-date-picker';
import EasyDate from '../../../../util/EasyDate';

import RoundButton from '../../../atom/button/RoundButton';

export default function PurposeDecimalDayWrite() {

    const { purposeWriteStore } = useStores();

    const [purposeEndDate, setPurposeEndDate] = useState(purposeWriteStore.purpose.endDate)

    // purposeWriteStore.purpose.stat = 0;
    // purposeWriteStore.purpose.endDate = purposeEndDate;
    // purposeWriteStore.purpose.startDate = EasyDate.now();
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
                <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
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
                </View>
            </View>
        </View>
    );
}