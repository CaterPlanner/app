import React, { Component } from 'react'
import { View, StyleSheet, Button, Dimensions, YellowBox, Text, Image, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PageStateText from '../../../atom/text/PageStateText'
import Card from './Card'
import MainHeader from '../../../molecule/header/MainHeader'

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
            <MainHeader navigation={this.props.navigation}/>
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


const styles = StyleSheet.create({



    buttomContainer: {
        flex: 0.6,
        alignItems: 'center',
        backgroundColor: 'rgba(20,20,20,0)'

    },//fuck this

    baseLay: {
        flex: 6,
        backgroundColor: 'white',
        flexDirection: 'row'
    },

    in_SideLay: {
        //  backgroundColor:'blue',
        flex: 1,
        //   borderColor:'tomato',
        //   borderWidth:15
    },

    centerLay: {
        paddingTop: '7%',
        //  backgroundColor:'aqua',
        flex: 12,
        justifyContent: "center",
        alignItems: "center",

    },

    indexNum: {

        marginTop: "4%",
        alignItems: "center",
        backgroundColor: '#dfdfdf',
        justifyContent: "center",
        width: 65,
        height: 25,
        borderRadius: 12,
        alignSelf: 'center',
        marginBottom: '5%'

    },
    moreCon: {


    }



})