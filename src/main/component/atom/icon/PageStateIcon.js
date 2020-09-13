import React from 'react';
import {View} from 'react-native';

export default function PageStateIcon({current, max, selectColor, unselectColor}){
    return(
        <View style={{flexDirection : 'row', justifyContent: 'center', alignItems:'center'}}>
            {
                (() =>{
                    let icons = [];
                    for(let i = 0; i < max; i++){
                        icons.push(
                            <View key={i} style={{marginHorizontal: 8, width : 10, height: 10, borderRadius: 10, backgroundColor: i === current ? selectColor : unselectColor}}/>
                        )
                    }
                    return icons;
                })()
            }
        </View>
    )
}