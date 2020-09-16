import React, { Component } from 'react';
import { TextInput, Platform, View, ScrollView } from 'react-native';



export default class MyTextInput extends Component {

//numberOfLines

    constructor(props) {
        super(props);

        // const textStyles = this.props.textStyles ? this.props.textStyles : {};
        // const backgroundStyles = this.props.backgroundStyles ? this.props.backgrondStyles : {};

        const {textStyles = {} , backgroundStyles = {}} = this.props;

        const fontSize = this.props.textStyles && this.props.textStyles.fontSize ? this.props.textStyles.fontSize : 15;

        this.state = {
            textLine : 0,
            textHeight: 0
        }

        this.lineHeight = textStyles.lineHeight ? textStyles.lineHeight : fontSize + 2 * 2;
        this.viewHeight = backgroundStyles.height ? backgroundStyles.height : 30;
        this.containerMaxHeight = this.props.containerMaxHeight ? this.props.containerMaxHeight : 200;
        this.maxLine = this.props.maxLine ? this.props.maxLine : 5;

    
    }

    _getViewHeight = () => {
        const viewHeight = Math.max(this.state.textHeight, this.viewHeight);
        // console.log(viewHeight + ", " + this.state.textHeight);
        return viewHeight > this.containerMaxHeight ? this.containerMaxHeight : viewHeight;
    }


    shouldComponentUpdate(nextProps, nextStates){
        if(nextStates.textLine > this.maxLine || Math.abs(nextStates.textLine - this.state.textLine) > 1){
            return false;
        }else{
            return true;
        }
    }

    componentDidMount() {
        if (this.props.ref != null) {
            this.props.ref(this.textInput);
        }
    }

    focus(){
        this.textInput.focus();
    }

    render() {
        console.log(this.state.textHeight)
        return (
            <View style={[{justifyContent: 'center'},this.props.backgroundStyles, {
                overWrite: 'hidden',
                height : this._getViewHeight()}]}
                >
                <TextInput
                    ref={input => this.textInput = input}
                    pointerEvents="none"
                    style={[this.props.textStyles, { paddingVertical:0, paddingHorizontal: 0, lineHeight: this.lineHeight}]}
                    multiline={this.props.multiline}
                    value={this.props.value}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    numberOfLines={this.props.numberOfLines}
                    returnKeyType={this.props.returnKeyType}
                    onSubmitEditing={this.props.onSubmitEditing}
                    blueOnSumbit={this.props.blueOnSumbit}
                    onChangeText={(text) => {
                        if(this.props.onChangeText)
                        this.props.onChangeText(text)
                    }}
                    onContentSizeChange={({ nativeEvent }) => {

                        const height = nativeEvent.contentSize.height;
                        let textLine = Math.ceil(height / (this.lineHeight));

                        if(this.state.textHeight != height && this.state.textLine == textLine){
                            const dif =  Math.ceil(Math.abs(height - this.state.textHeight) / this.lineHeight);
                            textLine = textLine + (this.state.textHeight < height ? +dif : -dif);
                        }


                        this.setState({
                            textHeight: height,
                            textLine: textLine
                        })
                    }}
                    onChange={(e)=>{
                        if(this.props.onChange)
                        this.props.onChange(e);
                    }}
                    underlineColorAndroid='transparent'
                />
            </View>
        )
    }


}