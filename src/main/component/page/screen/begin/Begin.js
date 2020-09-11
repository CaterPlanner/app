import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, StatusBar, StyleSheet, Alert } from 'react-native';
import { inject, observer } from 'mobx-react'

import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import RoundButton from '../../../atom/button/RoundButton';
import PageStateIcon from '../../../atom/icon/PageStateIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';


const fullWidth = Dimensions.get('window').width;


@inject(['appStore'])
@observer
export default class Begin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        }

        this.appStore = this.props.appStore;

        this.data = [
            {
                title: '내가 원하는 목적에 도전',
                imageUrl: require('../../../../../../asset/image/begin_page1.png'),
                content: '당신이 머물고 살거나 얻고자 하는 것들을\n찾을 수 있는 길을 개척할 수 있어요.'
            },
            {
                title: '다른 사람들과 목적을 공유',
                imageUrl: require('../../../../../../asset/image/begin_page2.png'),
                content: '다른 사람들의 피드백을 통해서\n좀 더 수월하게 목적을 달성할 수 있어요'
            },
            {
                title: '귀여운 애벌레들과 매일 목표를 달성',
                imageUrl: require('../../../../../../asset/image/normal_caterpillar.gif'),
                content: '마스코트 애벌레의 응원과 함께\n목적을 이룰 수 있도록 도와 드릴게요'
            }
        ];
    }

    componentWillMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.activeIndex != 0) {
                this.carousel._snapToItem(this.state.activeIndex - 1);
            } else {
                return false;
            }
            return true;
        })
    }

    _renderItem = ({ item }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 55, fontSize: 22, fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
                <View style={{ marginBottom: 55, width: 200, height: 200, borderRadius: 200, backgroundColor: '#B2E7BD', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        resizeMode="stretch"
                        style={{ width: 180, height: 180 }}
                        source={item.imageUrl}
                    />
                </View>
                <Text style={{ fontSize: 16, textAlign: 'center', color: 'white' }}>
                    {item.content}
                </Text>
            </View>
        )
    }



    render() {
        return (
            <LinearGradient colors={['#B0DF5C', '#5EDF8C']} style={{ flex: 1 }}>
                <StatusBar hidden />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 80, marginHorizontal: 40 }}>
                    <Carousel
                        style={{ flex: 1 }}
                        ref={ref => this.carousel = ref}
                        data={this.data}
                        renderItem={this._renderItem}
                        scrollEnabled={false}
                        sliderWidth={fullWidth}
                        itemWidth={fullWidth}
                        onSnapToItem={
                            index => {
                                this.setState({
                                    activeIndex: index
                                })
                            }
                        }
                    />
                    <View style={{ paddingVertical: 25, position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row' }}>

                        <View style={{flex:1, alignItems:'flex-start'}}>
                            {!this.isFirst && 
                            <TouchableOpacity onPress={() => {
                                if (!this.isFirst) {
                                    this.carousel._snapToItem(this.state.activeIndex - 1);
                                }
                            }}>
                                <Text style={styles.bottomTextButtonFont}>{this.isFirst ? '건너뛰기' : '이전'}</Text>
                            </TouchableOpacity>}
                        </View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <PageStateIcon current={this.state.activeIndex} max={3} selectColor={'#FFFFFF'} unselectColor={'#B2E7BD'} />
                        </View>
                        <View style={{ flex:1, alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => {
                                if (this.isLast) {
                                    this.appStore.setIsBegin(false);
                                } else {
                                    this.carousel._snapToItem(this.state.activeIndex + 1);
                                }
                            }}>
                                <Text style={styles.bottomTextButtonFont}>{this.isLast ? '완료' : '다음'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <RoundButton
                        text={this.state.activeIndex == 2 ? '시 작 하 기' : '다 음 으 로'}
                        color={'#B2E7BD'}
                        width={250}
                        height={30}
                        textStyle={{ textAlign: 'center', color: 'white', fontSize: 20 }}
                        onPress={() => {
                            if(this.state.activeIndex == 2){ //final
                                this.appStore.setIsBegin(false);
                            }else{
                                this.carousel._snapToItem(this.state.activeIndex + 1);
                            }
                        }}
                    /> */}
                </View>
            </LinearGradient>
        )
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    get isFirst() {
        return this.state.activeIndex == 0;
    }

    get isLast() {
        return this.state.activeIndex == 2;
    }

}



const styles = StyleSheet.create({
    bottomTextButtonFont: {
        fontSize: 18, textAlign: 'center', color: 'white'
    }
})