import React from 'react';
import { View, Text , Image,TouchableOpacity } from 'react-native';
import ImageButton from '../../atom/button/ImageButton';

export default function PurposePaper({ imageUri, name, count, onPress, checkedBriefing=true }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItmes: 'center', width: '100%', height: 65 }}>
            <View style={{ width: '90%', backgroundColor: 'white', justifyContent: 'center', elevation: 5, height: '100%' }}>
                <View style={{ position: 'absolute', left: -30, justifyContent: 'center', alignItmes: 'center' }}>
                    <Image
                        source={{ uri: imageUri }}
                        style={{ flex: 1, width: '100%', height: undefined, width: 55, height: 55, borderRadius: 55 }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', alignItmes: 'center', flex: 1, marginLeft: 35 }}>
                        <Text>
                            {name}
                        </Text>
                        {checkedBriefing &&
                        <View style={{flexDirection : 'row'}}>
                            <Text style={{color :'red', marginRight : 5}}>
                                {count}
                            </Text>
                            <Text>
                                개의 수행 목표
                            </Text>
                        </View>}
                    </View>
                    <View style={{marginRight : 20, justifyContent:'center'}}>
                        <Image
                            style={{
                                width: 13,
                                height: 20
                            }}
                            source={require('../../../../../asset/button/next_button.png')}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
