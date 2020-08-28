import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import GlobalConfig from '../../../../../GlobalConfig';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import { useRoute } from '@react-navigation/native';

export default function WriteStory({ navigation}) {

    const route = useRoute();

    const isModify = route.params.story != null;

    const [storyContent, setStoryContent] = useState(isModify ? route.params.story.content : null);
    const [storyType, setStoryType] = useState(isModify ? route.params.story.type : null);
    const [isUploading, setIsUploading] = useState(false);


    const { authStore } = useStores();


    const save = () => {
        setIsUploading(true);
        uploadData();
    }

    const uploadData = async () => {
        try {
            const resource = {
                purposeId : route.params.purposeId,
                content : storyContent,
                type : storyType
            }

            if(isModify){          
                await Request.post(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/story', resource)
                        .auth(authStore.userToken.token)
                        .submit();

            }else{
                const response = await Request.put(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/story' + route.params.story.id, resource)
                                        .auth(authStore.userToken.token)
                                        .submit();
                
            }


        } catch (e) {
            console.log(e);
            setIsUploading(false);
        }
        //
    }

    useEffect(() => {
        navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })
    }, [])


    navigation.setParams({
        save : save
    })

    return (
        <View style={{ flex: 1 }}>
            {isUploading ? <Loader /> : (
                <View style={{flex: 1}}>
                    <View style={{ height: 0.4, backgroundColor: 'black' }} />
                    <TextInput
                        numberOfLines={1}
                        multiline={true}
                        placeholder={'내용을 입력해주세요'}
                        style={[styles.inputFont, {
                            backgroundColor: 'white',
                            padding: 10,
                            flex: 1,
                            textAlignVertical: 'top'
                        }]}
                        value={storyTitle}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputFont: {
        fontSize: 15
    }
})