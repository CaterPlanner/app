import React, { Component } from 'react'
import { View, StyleSheet, Button, Dimensions, YellowBox, Text, Image, TouchableOpacity } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PlanView from './PlanView.js'
import PageStateText from '../../../atom/text/PageStateText'
import Card from './Card'
import ActiveCard from './ActiveCard'
import Header_Main from '../../../molecule/Header_Main.js';

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified']);
YellowBox.ignoreWarnings(['Warnig: componentWillReceive']);

const fullWidth = Dimensions.get('window').width;


//진행률 값 
const progresValue = 30;
const defaultDCater = '../../../../../asset/DDC.gif'

//함정카드 발동
var actuationCard = true;

var tabText = '자세히 보기'
var tabColor = 'black'
var tabFonC = 'gray'

export default class PlanCardView extends Component {


    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0,
            endIndex: 4,
            item: [{
                image: 'https://www.aramamotoru.com/wp-content/uploads/2018/02/google-amp-icin-goruntu-boyut-gereksinimini-neredeyse-iki-katina-cikardi-1280x720.png',
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
                <View>
                    
                    <Card image={item.image} title={item.title} date={item.date} /> 

                    {/*
                    <ActiveCard progresValue={item.progresValue}></ActiveCard>
                    */}

                    
                </View>
            )

    }

    _next = () => {
        this.carousel._snapToItem(this.state.activeIndex + 1)
    }

    _previous = () => {
        this.carousel._snapToItem(this.state.activeIndex - 1)
    }

    forceUpdateHandler = () => {
        this.forceUpdate();
    };


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <Header_Main></Header_Main>

                <View style={styles.baseLay}>
                    <View style={styles.in_SideLay}></View>
                    <View style={styles.centerLay}>


                        <Image style={{ width: 100, height: 93, marginBottom: 0, }
                        } source={require(defaultDCater)}/>

                        <Carousel
                            ref={(ref) => {this.carousel = ref;}}
                            data={this.state.item}
                            renderItem={this._renderItem}
                            scrollEnabled={true}
                            sliderWidth={fullWidth}
                            itemWidth={fullWidth - 120}
                            onSnapToItem={
                                index => this.setState({ activeIndex: index })}
                            hasParallaxImages={true}
                        />

                    </View>
                    <View style={styles.in_SideLay}></View>
                </View>

              


                <View style={styles.indexNum}>
                    <PageStateText
                        activeIndex={this.state.activeIndex + 1}
                        endIndex={this.state.endIndex}
                    />

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