import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, PixelRatio} from 'react-native';
import { inject } from 'mobx-react';
import Carousel from 'react-native-snap-carousel';
import PageStateIcon from '../../../atom/icon/PageStateIcon';
import ImageButton from '../../../atom/button/ImageButton';
import normalize from '../../../../util/noramlize';

const fullWidth = Dimensions.get('window').width;

export default class UITutorial extends Component{

    constructor(props){
        super(props);

        this.state = {
            activeIndex : 0
        }

        this.view = [
            {
                content: '추가 아이콘을 터치해\n목적을 만들어보세요',
                imageUrl : require('../../../../../../asset/image/start_page1.png')
            },
            {
                content: '목적을 위해 수행을 기록하세요',
                imageUrl : require('../../../../../../asset/image/start_page2.png')
            },
            {
                content: '생성한 목적에 대한\n정보를 확인할 수 있어요',
                imageUrl : require('../../../../../../asset/image/start_page3.png')
            },
            {
                content: '수행하면서 활동을 기록, 공유할 수 있고\n다른 사람의 목적은 따라 할 수 있어요',
                imageUrl : require('../../../../../../asset/image/start_page4.png')
            }
        ]

    }

    _renderItem = ({item}) => {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={styles.contentContainer}>
                    <Text
                        style={styles.content}
                    >{item.content}</Text>
                </View>
                <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={item.imageUrl}
                />
            </View>
        )
    }

    render(){
        return(
        <View style={{flex:1, backgroundColor: '#000000aa'}}>
            <ImageButton
                source={require('../../../../../../asset/button/exit_button.png')}
                backgroundStyle={{
                    alignSelf :'flex-end',
                }}
                imageStyle={styles.exitButton}
                onPress={this.props.finish}
            />
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
            <View style={styles.bottomButtonContainer}>

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
                                this.props.finish();
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
    image:{
        width:  normalize(240), height: normalize(460, 'height')
    },
    contentContainer: {
        paddingBottom: 10,
        height: normalize(58),
        // backgroundColor:'yellow',
        flexDirection:'row', alignItems:'flex-end'
    },
    content:{
        color : 'white',
        fontSize: 16 / PixelRatio.getFontScale(),
        textAlign: 'center'
    },
    bottomButtonContainer: {
        paddingHorizontal: 25,
        paddingVertical: normalize(30, 'height'), 
        width: '100%', 
        flexDirection: 'row' 
    },
    bottomTextButtonFont: {
        fontSize: 18, 
        textAlign: 'center',
        color : 'white'
    },
    exitButton:{
        width: 40,
                    height: 40,
                    margin : 8,
                    tintColor: 'white'
    }
})