import React, {useState} from 'react';
import {View} from 'react-native';
import MyTextInput from '../main/component/atom/input/MyTextInput';

export default function TextView(){

    const [text, setText] = useState("");

    return(
        <View style={{flex:1}}>
            <MyTextInput
                backgroundStyles={{
                    height: 100,
                    paddingVertical: 10
                }}
                maxLine={100}
                multiline={true}
                value={text}
                onChangeText={(text) => setText(text)}
            />
        </View>
    )
}