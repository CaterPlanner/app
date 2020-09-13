import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImageButton from '../../atom/button/ImageButton';
import ProfileWidget from '../../molecule/ProfileWidget';
import CaterPlannerRank from '../icon/CaterPlannerRank';

export default function PurposeBox({ data, onPress }) {

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.container}>

            <View style={{ flex: 2.7, backgroundColor: 'white', marginTop: 14, marginBottom: 5 }}>

                <Image
                    source={{ uri: data.photoUrl }}
                    style={{ flex: 1 }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    numberOfLines={2}
                    style={styles.purposeNameFont}>
                    {data.name}
                </Text>
            </View>
            <View style={{ position: 'absolute', right: 16, bottom: 20 }}>
                    <CaterPlannerRank
                        purpose={data}
                        style={{
                            width: 75,
                            height: 75,
                        }}
                    />
                </View>
            {/* <Image
                source={{uri : data.photoUrl}}
                resizeMode="stretch"
                style={styles.photoContainer}
        />
        <View style={styles.emptyContainer}/>
        <View style={styles.infoContainer}>
            <Text 
            numberOfLines={1}
            style={styles.purposeNameFont}>
                {data.name}
            </Text>
            <Text 
            numberOfLines={2}
            style={styles.purposeDescriptionFont}>
                {data.description}
            </Text>
            <View style={{alignSelf : 'flex-start'}}>
            <ProfileWidget
                user={data.author}
                fontStyle={{ alignSelf: 'flex-end', marginBottom: 5}}
            />
            </View>
        </View> */}
        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 390,
        backgroundColor: 'white',
        paddingHorizontal: 16
    },
    purposeNameFont: {
        fontSize: 18,
        marginVertical: 10,
        width: '60%'
    },
})
