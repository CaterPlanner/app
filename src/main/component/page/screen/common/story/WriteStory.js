import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import GlobalConfig from '../../../../../GlobalConfig';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import { useRoute } from '@react-navigation/native';

export default function WriteStory({ navigation}) {

    const route = useRoute();

    const story = route.params.story;
    // console.log(story ? route.params.story.title : null);

    const [storyTitle, setStoryTitle] = useState(story ? route.params.story.title : null);
    const [storyContent, setStoryContent] = useState(story ? route.params.story.content : null);
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
                title : storyTitle,
                content : storyContent,
                type : storyType
            }

            let id = story.id;

            if(isModify){          
                const response = await Request.post(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/story', resource)
                        .auth(authStore.userToken.token)
                        .submit();

                id = response.data.id;
            }else{
                await Request.put(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/story' + route.params.story.id, resource)
                        .auth(authStore.userToken.token)
                        .submit();
            }

            navigation.navigate('DetailStory', {
                id : id
            })

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
                    <TextInput
                        numberOfLines={1}
                        placeholder={'제목을 입력해주세요'}
                        style={[styles.inputFont, {
                            backgroundColor: 'white',
                            padding: 10,
                            textAlignVertical: 'center',
                        }]}
                        onChangeText={text => setStoryTitle(text)}
                        value={storyTitle}
                    />
                    <View style={{ height: 0.4, backgroundColor:'#888888'}} />
                    <TextInput
                        multiline={true}
                        placeholder={'내용을 입력해주세요'}
                        style={[styles.inputFont, {
                            backgroundColor: 'white',
                            padding: 10,
                            flex: 1,
                            textAlignVertical: 'top',
                        }]}
                        onChangeText={text => setStoryContent(text)}
                        value={storyContent}
                    />
                    <View style={{width:'100%',height: 55, backgroundColor:'#888888'}}/>
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