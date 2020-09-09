import React, {useState} from 'react';
import { View, Text, TouchableOpacity, CheckBox, Dimensions } from 'react-native';
import MyProgressBar from '../progressBar/MyProgressBar';

export default function DetailPlanCheckBox({ color, name, acheive, onChange}) {
    
    const [isSelected, setIsSelected] = useState(false);

    return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItmes: 'center', width: '100%', height: 65, backgroundColor: 'white', elevation: 5 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View
                    style={{ height: '100%', width: 30, backgroundColor: color }}
                />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, paddingVertical: 10 }}>
                            {name}
                        </Text>
                        <MyProgressBar
                            value={acheive}
                            height={6}
                            width={Dimensions.get('window').width - 135}
                            animated={true}
                            barColor={color}
                            backgroundColor={'#F2F2F2'}
                        />
                    </View>
                </View>
                <View style={{justifyContent: 'center', paddingHorizontal : 10}}>
                    <CheckBox
                        value={isSelected}
                        style={{ alignSelf: 'center' }}
                        onChange={() => {
                            onChange(!isSelected)
                            setIsSelected(!isSelected);
                        }}
                    />
                </View>
            </View>
        </View>
    )
}