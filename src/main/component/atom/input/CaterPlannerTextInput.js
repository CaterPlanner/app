import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native'
import MyTextInput from './MyTextInput';


export default class CaterPlannerTextInput extends Component {
    constructor(props) {
        super(props);
    }

    focus = () => {
        this.textInput.focus();
    }

    componentDidMount() {
        if (this.props.ref != null) {
            this.props.ref(this.textInput);
        }
    }

    render() {
        return (
            <View>
                {this.props.label && (
                    <Text style={[{ marginBottom: 6 }, this.props.labelStyle]}>{this.props.label}</Text>)
                }
                <MyTextInput
                    ref={input => this.textInput = input}
                    underlineColorAndroid="transparent"
                    numberOfLines={this.props.numberOfLines}
                    multiline={this.props.multiline}
                    maxLength={this.props.maxLength}
                    containerMaxHeight={this.props.containerMaxHeight}
                    maxLine={this.props.maxLine}
                    blueOnSumbit={this.props.blueOnSumbit}
                    placeholder={this.props.placeHolder}
                    backgroundStyles={{
                        paddingVertical: 0,
                        paddingLeft: 0,
                        paddingBottom: 3,
                        borderBottomColor: '#7F7F7F', // Add this to specify bottom border color
                        borderBottomWidth: 0.7
                    }}
                    textStyles={{
                        fontSize: 15,
                    }}
                    onContentSizeChange
                    onSubmitEditing={this.props.onSubmitEditing}
                    onChange={({nativeEvent}) => {
                        let text = nativeEvent.text;

                        if(text.length != 0 && !(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9]/g).test(text)){
                            text = "";
                        }
                        this.props.onChangeText(text);
                    }}
                    value={this.props.value}
                />
                {this.props.maxLength && 
                <Text style={{
                    marginTop: 8,
                    fontSize: 12,
                    color : '#888888'
                }}>
                    {this.props.value.length}/{this.props.maxLength} 글자
                </Text>}
            </View>
        )
    }
}
