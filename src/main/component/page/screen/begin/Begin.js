import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, StatusBar, StyleSheet, Alert } from 'react-native';
import { inject, observer } from 'mobx-react'

import Carousel from 'react-native-snap-carousel';
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
                content: '스스초 원하는 것을 이루기 위해\n목적을 만들어 실천해보세요'
            },
            {
                title: '성장을 기록하면서 한걸음씩',
                imageUrl: require('../../../../../../asset/image/begin_page2.png'),
                content: '자신의 목적을 위해 무엇을 했는지\n기록하며 나아가세요'
            },
            {   
                title:'성장의 진행을 한눈에',
                imageUrl: require('../../../../../../asset/image/begin_page3.png'),
                content:'성장하는 애벌레의 모습으로\n진행도를 확인 할 수 있어요'
            },
            {
                title: '다른 사람들과 목적을 공유',
                imageUrl: require('../../../../../../asset/image/begin_page4.png'),
                content: '다른 사람들과 자신의 목적들과\n목적을 위한 활동들을 공유해보세요'
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 55, fontSize: 22, fontWeight: 'bold', color: '#1FBE2F' }}>{item.title}</Text>
                <Image
                    resizeMode="stretch"
                    style={{ width: 280, height: 280, marginBottom: 55 }}
                    source={item.imageUrl}
                />
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#888888' }}>
                    {item.content}
                </Text>
            </View>
        )
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white'}}>
                <StatusBar hidden />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
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

                </View>
                <View style={{paddingHorizontal: 30 ,paddingVertical: 25, width: '100%', flexDirection: 'row' }}>

                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        {!this.isFirst &&
                            <TouchableOpacity onPress={() => {
                                if (!this.isFirst) {
                                    this.carousel._snapToItem(this.state.activeIndex - 1);
                                }
                            }}>
                                <Text style={[styles.bottomTextButtonFont, {color : '#888888'}]}>{'이전'}</Text>
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <PageStateIcon current={this.state.activeIndex} max={this.data.length} selectColor={'#1FBE2F'} unselectColor={'#B2E7BD'} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            if (this.isLast) {
                                this.appStore.setIsBegin(false);
                            } else {
                                this.carousel._snapToItem(this.state.activeIndex + 1);
                            }
                        }}>
                            <Text style={[styles.bottomTextButtonFont, {color: '#10A71F'}]}>{this.isLast ? '완료' : '다음'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    get isFirst() {
        return this.state.activeIndex == 0;
    }

    get isLast() {
        return this.state.activeIndex == this.data.length - 1;
    }

}



const styles = StyleSheet.create({
    bottomTextButtonFont: {
        fontSize: 18, textAlign: 'center'
    }
})