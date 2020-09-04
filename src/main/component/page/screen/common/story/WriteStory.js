import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import GlobalConfig from '../../../../../GlobalConfig';
import useStores from '../../../../../mobX/helper/useStores';
import Loader from '../../../Loader';
import { useRoute } from '@react-navigation/native';
import Request from '../../../../../util/Request';
import { inject } from 'mobx-react';

@inject(['authStore'])
export default class WriteStory extends Component {

    constructor(props) {
        super(props);


        this.story = props.route.params.story;
        this.isModify = this.story != null;

        this.state = {
            isUploading: false,
            storyTitle: this.story ? this.story.title : null,
            storyContent: this.story ? this.story.content : null,
            storyType: this.story ? this.story.type : 0
        }

        this.authStore = this.props.authStore;
        
        this.props.navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })

        this.props.navigation.setParams({
            save : this._uploadData
        })
    }

    

    _uploadData = async () => {
        try {
            this.setState({
                isUploading : true
            });

            const resource = {
                purposeId: this.props.route.params.purposeId,
                title: this.state.storyTitle,
                content: this.state.storyContent,
                type: this.state.storyType
            }


            let id = this.isModify ? this.this.story.id : null;

            if (!this.isModify) {
                const response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story`, JSON.stringify(resource))
                    .auth(this.authStore.userToken.token)
                    .submit();

                id = response.data.id;
            } else {
                await Request.put(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${id}`, JSON.stringify(resource))
                    .auth(this.authStore.userToken.token)
                    .submit();
            }

            this.props.navigation.navigate('DetailStory', {
                id: id
            })

        } catch (e) {
            console.log(e);
            this.setState({
                isUploading : false
            })
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isUploading ? <Loader /> : (
                    <View style={{ flex: 1 }}>
                        <TextInput
                            numberOfLines={1}
                            placeholder={'제목을 입력해주세요'}
                            style={[styles.inputFont, {
                                backgroundColor: 'white',
                                padding: 10,
                                textAlignVertical: 'center',
                            }]}
                            onChangeText={text => { this.setState({
                                storyTitle : text
                            }) }}
                            value={this.state.storyTitle}
                        />
                        <View style={{ height: 0.4, backgroundColor: '#888888' }} />
                        <TextInput
                            multiline={true}
                            placeholder={'내용을 입력해주세요'}
                            style={[styles.inputFont, {
                                backgroundColor: 'white',
                                padding: 10,
                                flex: 1,
                                textAlignVertical: 'top',
                            }]}
                            onChangeText={text => { this.setState({
                                storyContent : text
                            })}}
                            value={this.state.storyContent}
                        />
                        <View style={{ width: '100%', height: 55, backgroundColor: '#888888' }} />
                    </View>
                )}
            </View>
        );
    }
}


// export default function WriteStory({ navigation}) {

//     const route = useRoute();

//     const story = route.params.story;
//     const isModify = story != null;

//     console.log(story);

//     const [storyTitle, setStoryTitle] = useState(story ? story.title : null);
//     const [storyContent, setStoryContent] = useState(story ? story.content : null);
//     const [storyType, setStoryType] = useState(story ? story.type:  0);
//     const [isUploading, setIsUploading] = useState(false);


//     const { authStore } = useStores();


//     const save = () => {
//         setIsUploading(true);
//         uploadData();
//     }

//     const uploadData = async () => {
//         try {
//             const resource = {
//                 purposeId : route.params.purposeId,
//                 title : storyTitle,
//                 content : storyContent,
//                 type : storyType
//             }

//             console.log(resource);

//             let id = story.id;

//             if(!isModify){          
//                 const response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story`, JSON.stringify(resource))
//                         .auth(authStore.userToken.token)
//                         .submit();

//                 id = response.data.id;
//             }else{
//                 await Request.put(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${route.params.story.id}`, JSON.stringify(resource))
//                         .auth(authStore.userToken.token)
//                         .submit();
//             }

//             navigation.navigate('DetailStory', {
//                 id : id
//             })

//         } catch (e) {
//             console.log(e);
//             setIsUploading(false);
//         }

//     }

//     navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })

//     useEffect(() => {
//         navigation.setParams({
//             save : save
//         })        
//     }, [])


//     return (
//         <View style={{ flex: 1 }}>
//             {isUploading ? <Loader /> : (
//                 <View style={{flex: 1}}>
//                     <TextInput
//                         numberOfLines={1}
//                         placeholder={'제목을 입력해주세요'}
//                         style={[styles.inputFont, {
//                             backgroundColor: 'white',
//                             padding: 10,
//                             textAlignVertical: 'center',
//                         }]}
//                         onChangeText={text => {setStoryTitle(text)}}
//                         value={storyTitle}
//                     />
//                     <View style={{ height: 0.4, backgroundColor:'#888888'}} />
//                     <TextInput
//                         multiline={true}
//                         placeholder={'내용을 입력해주세요'}
//                         style={[styles.inputFont, {
//                             backgroundColor: 'white',
//                             padding: 10,
//                             flex: 1,
//                             textAlignVertical: 'top',
//                         }]}
//                         onChangeText={text => {setStoryContent(text)}}
//                         value={storyContent}
//                     />
//                     <View style={{width:'100%',height: 55, backgroundColor:'#888888'}}/>
//                 </View>
//             )}
//         </View>
//     );
// }

const styles = StyleSheet.create({
    inputFont: {
        fontSize: 15
    }
})