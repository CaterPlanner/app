import React from "react";
import { View, ScrollView } from 'react-native'
import ImageButton from '../../../atom/button/ImageButton'
import DetailPlanPaper from '../../../atom/button/DatePlanPaper'

export default function DetailPlanWrite({ }) {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <DetailPlanPaper
                    color={'#F8C2C2'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#C94A4A'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#B5FBFF'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#F8C2C2'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#C94A4A'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#B5FBFF'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#F8C2C2'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#C94A4A'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />
                <DetailPlanPaper
                    color={'#B5FBFF'}
                    name={'PPT 템플릿 판매'}
                    startDate={'2020-08-10'}
                    endDate={'2020-08-31'}
                />

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 30, right: 22 }}>
                <ImageButton
                    backgroundStyle={{ backgroundColor: '#25B046', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                    imageStyle={{ width: 31, height: 34, marginLeft: 5 }}
                    source={require('../../../../../../asset/button/plan_insert_button.png')}
                    onPress={() => {
                        console.log('hi');
                    }}
                />
            </View>
        </View>
    )
}
