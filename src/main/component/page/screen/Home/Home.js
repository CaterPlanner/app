import React, { Component } from 'react'
import { View, StyleSheet, Button, Dimensions, YellowBox, Text, Image, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PageStateText from '../../../atom/text/PageStateText'
import Card from './Card'
import MainHeader from '../../../organism/header/MainHeader'

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified']);
YellowBox.ignoreWarnings(['Warnig: componentWillReceive']);

const fullWidth = Dimensions.get('window').width;
const progresValue = 30;



export default class Home extends Component {


    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0,
            endIndex: 4,
            item: [{
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Sans_undertale.jpg/220px-Sans_undertale.jpg',
                title: '하루 O시간 OO하기',
                date: 'D - O',
                //함정카드 발동 
                progresValue: progresValue,

            },
            {
                image: 'https://www.aramamotoru.com/wp-content/uploads/2018/02/google-amp-icin-goruntu-boyut-gereksinimini-neredeyse-iki-katina-cikardi-1280x720.png',
                title: '하루 O시간 OO하기',
                date: 'D - O',
                //함정카드 발동 
                progresValue: progresValue,

            }
            ]
        }
    }
    //
    _renderItem = ({ item, index }) => {
        return (
            <Card image={item.image} title={item.title} date={item.date} />
        )
    }


    componentDidMount() {

    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 11, justifyContent : 'center'}}>
                        <View>
                            <Carousel
                                ref={(ref) => { this.carousel = ref; }}
                                data={this.state.item}
                                renderItem={this._renderItem}
                                scrollEnabled={true}
                                sliderWidth={fullWidth}
                                itemWidth={fullWidth - 95}
                                onSnapToItem={
                                    index => this.setState({ activeIndex: index })}
                                hasParallaxImages={true}
                            />
                        </View>
                    </View>
                    <View style={{justifyContent : 'flex-start', flex: 1}}>
                        <PageStateText
                            activeIndex={this.state.activeIndex + 1}
                            endIndex={this.state.endIndex}
                        />
                    </View>
                </View>
            </View>



        );
    }
}


