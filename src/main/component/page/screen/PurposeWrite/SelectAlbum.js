import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { useRoute } from "@react-navigation/native";

function Album({ imageUri, name, count, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', width: '100%', height: 80, backgroundColor: 'white' }}>
            <Image
                resizeMode="stretch"
                source={{uri : imageUri}}
                style={{
                    width: 80,
                    height: undefined
                }}
            />
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
                <Text style={albumStyles.albumNameFont}>
                    {name}
                </Text>
                <Text style={albumStyles.countFont}>
                    {count}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function SelectAlbum({ navigation }) {

    const [allAlbum, setAllAlbum] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const route = useRoute();

    const getAlbums = async () => {
        const albums = await CameraRoll.getAlbums({
            assertType: 'Photos'
        });

        for(const album of albums){
            const firstPhotoUri = (await CameraRoll.getPhotos({
                first: 1,
                groupName: album.title,
                assertType: 'Photos'
            })).edges[0].node.image.uri;
            album.firstPhotoUri = firstPhotoUri;
        }

        setAllAlbum(albums);
    }

    const askPermission = async () => {
        getAlbums()
        .then(() => {
            setLoading(true);
        });
    }
    useEffect(() => {
        askPermission();
    }, []);

    return (
        <View>
            { isLoading ? (
                    <FlatList
                        data={allAlbum}
                        renderItem={({item}) => (
                            <Album name={item.title} count={item.count} imageUri={item.firstPhotoUri}
                                onPress={() => {
                                    navigation.navigate('SelectPhoto', {
                                        albumName : item.title,
                                        photoCount: item.count,
                                        setPurposePhoto : route.params.setPurposePhoto
                                    });
                                }}
                            />
                        )}
                    />      
                ) :
                (
                    <Text>isLoading</Text>
                )
            }
        </View>
    )
}

const albumStyles = StyleSheet.create({
    albumNameFont: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    countFont: {
        fontSize: 12,
        color: 'gray'
    }
})
