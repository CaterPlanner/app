import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { inject } from 'mobx-react';
import Carousel from 'react-native-snap-carousel';
import PageStateIcon from '../../../atom/icon/PageStateIcon';

const fullWidth = Dimensions.get('window').width;

@inject(['appStore'])
export default class UITutorial extends Component{

    constructor(props){
        super(props);

        this.state = {
            activeIndex : 0
        }

        this.view = [
            'sdf',
            'sf',
            'sdf',
            'sdfsd'
        ]

        this.appStore = this.props.appStore;
    }

    _renderItem = ({item}) => {
        return (
            <View>
                <Text>{item}</Text>
            </View>
        )
    }

    render(){
        return(
        <View style={{flex:1, backgroundColor: '#000000aa'}}>
            <View style={{justifyContent: 'center' ,alignItems:'center', flex:1}}>
                <Carousel
                    style={{flex:1}}
                    ref={ref => this.carousel = ref}
                    data={this.view}
                    renderItem={this._renderItem}
                    scrollEnabled={false}
                    sliderWidth={fullWidth}
                    itemWidth={fullWidth}
                    onSnapToItem={
                        index => {
                            this.setState({
                                activeIndex : index
                            })
                        }
                    }
                />
            </View>
            <View style={{paddingHorizontal: 30 ,paddingVertical: 25, width: '100%', flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        {!this.isFirst &&
                            <TouchableOpacity onPress={() => {
                                if (!this.isFirst) {
                                    this.carousel._snapToItem(this.state.activeIndex - 1);
                                }
                            }}>
                                <Text style={[styles.bottomTextButtonFont]}>{'이전'}</Text>
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <PageStateIcon current={this.state.activeIndex} max={this.view.length} selectColor={'#1FBE2F'} unselectColor={'white'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            if (this.isLast) {
                                this.appStore.setIsStart(false);
                            } else {
                                this.carousel._snapToItem(this.state.activeIndex + 1);
                            }
                        }}>
                            <Text style={[styles.bottomTextButtonFont]}>{this.isLast ? '완료' : '다음'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>)
    }

    get isFirst() {
        return this.state.activeIndex == 0;
    }

    get isLast() {
        return this.state.activeIndex == this.view.length - 1;
    }
}

const styles = StyleSheet.create({
    bottomTextButtonFont: {
        fontSize: 18, textAlign: 'center', color : 'white'
    }
})