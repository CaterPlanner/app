import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Modal, Text, TouchableOpacity,ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import GlobalConfig from '../../../../../GlobalConfig';
import Loader from '../../../Loader';
import { useRoute } from '@react-navigation/native';
import Request from '../../../../../util/Request';
import { inject } from 'mobx-react';
import { Scope } from '../../../../../AppEnum';

const scopeNames = ['전체공개', '비공개']

@inject(['authStore'])
export default class WriteStory extends Component {

    constructor(props) {
        super(props);


        this.story = props.route.params.story;
        this.isModify = this.story != null;

        this.purpose = this.props.route.params.purpose;


        this.state = {
            isUploading: false,
            isScopeSelecting: false,
            storyTitle: this.story ? this.story.title : null,
            storyContent: this.story ? this.story.content : null,
            storyType: this.story ? this.story.type : 0,
            storyDisclosureScope: this.story ? this.story.disclosureScope : (this.purpose.disclosureScope == Scope.PRIVATE ? Scope.PRIVATE : Scope.PUBLIC)
        }

        this.authStore = this.props.authStore;
        // console.log(this.props.navigation.dangerouslyGetParent())
        // this.props.navigation.dangerouslyGetParent().setOptions({ tabBarVisible: false })

        this.props.navigation.setParams({
            save: this._uploadData
        })
    }

    componentDidMount(){
    }


    _uploadData = async () => {
        try {

            this.props.navigation.setParams({
                showHeader : false
            })

            this.setState({
                isUploading: true
            });

            const resource = {
                purposeId: this.purpose.id,
                title: this.state.storyTitle,
                content: this.state.storyContent,
                type: this.state.storyType,
                disclosureScope: this.state.storyDisclosureScope
            }


            let id = this.isModify ? this.this.story.id : null;

            if (!this.isModify) {
                const response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story`, JSON.stringify(resource))
                    .auth(await this.authStore.getToken())
                    .submit();

                id = response.data.id;
            } else {
                await Request.put(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story/${id}`, JSON.stringify(resource))
                    .auth(await this.authStore.getToken())
                    .submit();
            }

            this.props.navigation.pop();
            this.props.navigation.push('MainNavigation', {
                screen : 'HomeNavigation',
                params: {
                    screen : 'DetailStory',
                    params : {
                        id: id
                    }
                }
            })


        } catch (e) {
            console.log(e);
            this.setState({
                isUploading: false
            })

            this.props.navigation.setParams({
                showHeader : true
            })
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.isUploading ? <Loader /> : (
                    <View style={{ flex: 1 }}>
                        <Modal
                            transparent={true}
                            visible={this.state.isScopeSelecting}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end'
                            }}
                            activeOpacity={1}
                            onPress={() => {
                                this.setState({
                                    isScopeSelecting: false
                                })
                            }}
                            >
                                <View style={{
                                    backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10
                                }}>
                                    {
                                        scopeNames.map((scopeName, index) => {
                                            return (
                                                <TouchableOpacity style={{ paddingVertical: 10 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            storyDisclosureScope: index,
                                                            isScopeSelecting: false
                                                        })
                                                    }}
                                                >
                                                    <Text>{scopeName}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </TouchableOpacity>
                        </Modal>
                        <TextInput
                            numberOfLines={1}
                            maxLength={32}
                            placeholder={'제목을 입력해주세요 (최대 32자)'}
                            style={[styles.inputFont, {
                                backgroundColor: 'white',
                                padding: 10,
                                textAlignVertical: 'center',
                            }]}
                            onChange={({nativeEvent}) => {
                                let text = nativeEvent.text;
        
                                if(text.length != 0 && !(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g).test(text)){
                                    text = "";
                                }
                                this.setState({
                                    storyTitle: text
                                })
                            }}
                            value={this.state.storyTitle}
                        />
                        <View style={{ height: 0.4, backgroundColor: '#888888' }} />
                        <TextInput
                            multiline={true}
                            maxLength={100}
                            placeholder={'내용을 입력해주세요 (최대 100자)'}
                            style={[styles.inputFont, {
                                backgroundColor: 'white',
                                padding: 10,
                                flex: 1,
                                textAlignVertical: 'top',
                            }]}
                            onChange={({nativeEvent}) => {
                                let text = nativeEvent.text;
        
                                if(text.length != 0 && !(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g).test(text)){
                                    text = "";
                                }
                                this.setState({
                                    storyContent: text
                                })
                            }}
                            value={this.state.storyContent}
                        />
                        <View style={{ width: '100%', height: 55, backgroundColor: '#888888', justifyContent:'center' }}>
                            <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 5, backgroundColor: 'white', height: 26, width: 90, justifyContent: 'center', borderRadius: 8, elevation: 2 }}
                                onPress={() => {
                                    if(this.purpose.disclosureScope == Scope.PRIVATE){
                                        ToastAndroid.showWithGravity('비공개된 목적은 변경할 수 없습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                                        return;
                                    }
                                    this.setState({
                                        isScopeSelecting: true
                                    })
                                }}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    {scopeNames[this.state.storyDisclosureScope]}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputFont: {
        fontSize: 15
    }
})