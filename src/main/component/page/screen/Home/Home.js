import React, { Component } from 'react'
import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PageStateText from '../../../atom/text/PageStateText'

import PurposeService from '../../../../rest/service/PurposeService';
import DecimalDayWidget from '../../../atom/icon/DecimalDayWidget';




const fullWidth = Dimensions.get('window').width;
const progresValue = 30;


function EmptyCard({onPress}){
    return(
        <TouchableOpacity style={{
            height: '100%', justifyContent: 'center'
        }} onPress={onPress}>
            <View style={[cardStyles.container, {justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0.8)' , elevation: 0}]}>
                <View style={{width: 100, height: 110, justifyContent: 'center', alignItems:'center'}}>
                    <Image
                        resizeMode="stretch"
                        style={{flex:1, height:undefined, width:'100%'}}
                        source={require('../../../../../../asset/button/plan_insert_button.png')}
                    />
                </View>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginTop : 40}}>
                    새로운 목적을 추가해봐요
                </Text>
            </View>
        </TouchableOpacity>
    )
}

function ActiveCard({ purpose, onPress }) {
    return (
        <TouchableOpacity style={{
            height: '100%', justifyContent: 'center'
        }} activeOpacity={1} onPress={onPress}>
            <View style={cardStyles.container}
            >
                <View style={{
                    flex: 2,
                    borderWidth: 5,
                    borderColor: 'white',
                    borderTopRightRadius: 45,
                    borderTopLeftRadius: 45,
                }}>
                    <Image
                        source={{ uri: purpose.photoUrl }}
                        style={{
                            flex: 1, width: "100%", height: undefined, borderTopRightRadius: 40,
                            borderTopLeftRadius: 40,
                        }}
                    />
                    <View style={{ position: 'absolute', top: -40, width: '100%', alignItems:'center'}}>
                        <Image
                            resizeMode="stretch"
                            style={{ width: '90%', height: 80, tintColor: '#585858' }}
                            source={require('../../../../../../asset/image/card_header.png')}
                        />
                    </View>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={{
                                alignSelf: 'center',
                                fontSize: 20
                            }}>
                            {purpose.name}
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <DecimalDayWidget stat={purpose.stat} decimalDay={purpose.leftDay}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const cardStyles = StyleSheet.create({
    container : {
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        backgroundColor: '#ffffff',
        elevation: 3,
        height: 380,
        margin: 3,
    }
})


export default class Home extends Component {


    constructor(props) {
        super(props)


        this.state = {
            activeIndex: 0
        }
    }
    //
    _renderItem = ({ item, index }) => {
        return (
            <ActiveCard purpose={item} id={item.id} image={item.photoUrl} title={item.name} date={item.leftDay}
                onPress={() => {this.props.navigation.navigate('PublicNavigation' , {
                    screen: 'LoadMyPurpose',
                    params : {
                        id: item.id,
                        refreshHome: this._loadData
                    }
                })}}/>
            // <EmptyCard/>
        )
    }

    _loadData = async () => {
        try{
            const data = await PurposeService.getInstance().findPurposesForCard();
            this.setState({
                activeIndex : 0,
                endIndex : data.length,
                data : data
            });
        }catch(e){
            console.log(e);
        }
    }


    componentDidMount() {
        this._loadData();
    }

    render() {
        console.log('hello')
        return (
            <View style={{ flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 11, justifyContent : 'center'}}>
                        <View>
                            <Carousel
                                ref={(ref) => { this.carousel = ref; }}
                                data={this.state.data}
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


