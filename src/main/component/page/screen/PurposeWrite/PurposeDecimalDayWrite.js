import React, { useState } from 'react'
import { View, Text } from 'react-native';
import purposeStyles from './style/PurposeStyle';
import useStores from '../../../../mobX/helper/useStores'
import DatePicker from 'react-native-date-picker';
import EasyDate from '../../../../util/EasyDate';

export default function PurposeDecimalDayWrite() {

    const { purposeWriteStore } = useStores();

    const [purposeDecimalDay, setPurposeDecimalDay] = useState(new EasyDate().plusDays(1))

    purposeWriteStore.purpose.decimalday = purposeDecimalDay;
    purposeWriteStore.changePermit(true);

    return (
        <View style={purposeStyles.container}>
            <View style={purposeStyles.headContainer}>
                <View style={purposeStyles.titleArea}>
                    <Text style={purposeStyles.title}>
                        목표를 끝날 날짜를
                        {"\n"}
                        입력해 주세요
                    </Text>
                </View>
            </View>
            <View style={[purposeStyles.bottomContainer, {alignItems: 'center'}]}>
                <View style={{justifyContent: 'center'}}>
                    <DatePicker
                        date={purposeDecimalDay}
                        androidVariant={'nativeAndroid'}
                        minimumDate={EasyDate.now().plusDays(1)}
                        mode={'date'}
                        locale={'ko'}
                        onDateChange={(date) => {
                            date = new EasyDate(date);
                            if(EasyDate.now().isBefore(date)){
                                purposeWriteStore.changePermit(false);
                            }else{
                                purposeWriteStore.purpose.decimalDay = date;
                                setPurposeDecimalDay(date)
                                purposeWriteStore.changePermit(true);
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
}