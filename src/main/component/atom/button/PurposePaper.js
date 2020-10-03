import React from 'react';
import { View, Text , Image,TouchableOpacity } from 'react-native';
import ImageButton from '../../atom/button/ImageButton';

export default function PurposePaper({ imageUri, name, count, onPress, checkedBriefing=true }) {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={{ paddingHorizontal: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItmes: 'center', width: '100%', height: 68,
            
        }}>
            <View style={{ width:'100%', backgroundColor: 'white', justifyContent: 'center', elevation: 5, height: 65,
            borderTopLeftRadius: 65,  borderBottomLeftRadius: 65, borderBottomRightRadius: 65
        }}>
                {/* <View style={{ position: 'absolute', left: 5, justifyContent: 'center', alignItmes: 'center' }}>
                    <Image
                        source={{ uri: imageUri }}
                        style={{ flex: 1, width: '100%', height: undefined, width: 55, height: 55, borderRadius: 55 }}
                    />
                </View> */}
                <View style={{ position: 'absolute', left: 5, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: imageUri }}
                        style={{ height: undefined, width: 55, height: 55, borderRadius: 55 }}
                    />
                    <View style={{ justifyContent: 'center', alignItmes: 'center', flex: 1, marginLeft: 10 }}>
                        <Text numberOfLines={1}>
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
                                width: 15,
                                height: 33,
                                tintColor : 'black'
                            }}
                            source={require('../../../../../asset/button/next_button.png')}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}