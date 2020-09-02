import React from 'react';
import {View, Text} from 'react-native';
import EasyDate from '../../../util/EasyDate';


export default function TimeAgo({time, style}){

    const today = EasyDate.now();
    const diffTime = today.getTime() - time.getTime();

    let text;

    if(diffTime < EasyDate.MiNUTE_TIME){
        text = "방금 전"
    }else if(diffTime < EasyDate.HOUR_TIME){
        text = `${Math.trunc(diffTime / EasyDate.MiNUTE_TIME)}분 전`;
    }else if(diffTime < EasyDate.DAY_TIME){
        text = `${Math.trunc(diffTime / EasyDate.HOUR_TIME)}시간 전`;
    }else if(diffTime < EasyDate.WEEK_TIME){
        text = `${Math.trunc(diffTime / EasyDate.DAY_TIME)}일 전`;
    }else if(diffTime < EasyDate.MONTH_TIME){
        text = `${Math.trunc(diffTime / EasyDate.WEEK_TIME)}주 전`;
    }else if(diffTime < EasyDate.YEAR_TIME){
        text = `${Math.trunc(diffTime / EasyDate.MONTH_TIME)}개월 전`;
    }else{
        text = `${Math.trunc(diffTime / EasyDate.YEAR_TIME)}년 전`;
    }
    
    return(
        <View>
            <Text style={[{ fontSize: 12, color: '#656565'}, style]}>{text}</Text>
        </View>
    )
}