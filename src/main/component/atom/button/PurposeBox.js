import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ImageButton from '../../atom/button/ImageButton';
import ProfileWidget from '../../molecule/ProfileWidget';

export default function PurposeBox({data, onPress}){

    return(
    <TouchableOpacity activeOpacity={1} onPress={onPress}  style={styles.container}>
       <Image
                source={{uri : purpose.photoUrl}}
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
                profileUrl={data.author.profileUrl}
                name={data.author.name}
                fontStyle={{ alignSelf: 'flex-end', marginBottom: 5}}
            />
            </View>
        </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container: {
        width : '100%',
        height: 300,
        borderRadius: 20,
        elevation : 5
    },
    photoContainer:{
        flex: 2,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
        },
    emptyContainer: {
        flex: 1,
    },
    infoContainer :{
        paddingHorizontal: 15,
        position: 'absolute',
         width: '100%',
        paddingVertical: 10,
       backgroundColor:'white',
       borderRadius : 10,
       elevation: 10,
       bottom : 0,
       paddingBottom : 10
    },
    purposeNameFont: {
        fontSize: 22,
        paddingTop: 10,
        paddingBottom: 20,
    },
    purposeDescriptionFont: {
        fontSize: 16,
        height: 40,
        marginBottom: 15
    }
})
