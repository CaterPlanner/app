import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native'


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
                <TextInput
                    ref={input => this.textInput = input}
                    underlineColorAndroid="transparent"
                    numberOfLines={this.props.numberOfLines}
                    multiline={this.props.multiline}
                    maxLength={this.props.maxLength}
                    blueOnSumbit={this.props.blueOnSumbit}
                    returnKeyType={"next"}
                    placeholder={this.props.placeHolder}
                    style={{
                        fontSize: 15,
                        paddingVertical: 0,
                        paddingLeft: 0,
                        paddingBottom: 3,
                        borderBottomColor: '#7F7F7F', // Add this to specify bottom border color
                        borderBottomWidth: 0.7
                    }}
                    onSubmitEditing={this.props.onSubmitEditing}
                    onChange={({nativeEvent}) => {
                        let text = nativeEvent.text;

                        if(text.length != 0 && !(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z]/g).test(text)){
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
