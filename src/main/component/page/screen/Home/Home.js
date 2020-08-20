import React, { Component } from 'react'
import { View, Dimensions, YellowBox} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PageStateText from '../../../atom/text/PageStateText'
import Card from './Card'

import { inject } from 'mobx-react';

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified']);
YellowBox.ignoreWarnings(['Warnig: componentWillReceive']);

const fullWidth = Dimensions.get('window').width;
const progresValue = 30;

@inject(['purposeService'])
export default class Home extends Component {


    constructor(props) {
        super(props)

        this.purposeService = this.props.purposeService;


        this.state = {
            activeIndex: 0
        }
    }
    //
    _renderItem = ({ item, index }) => {
        console.log(item.leftDay);
        return (
            <Card id={item.id} image={item.imageUrl} title={item.name} date={item.leftDay}
                onPress={() => {this.props.navigation.navigate('DetailPurpose')}}
            />
        )
    }


    componentDidMount() {
        this.purposeService.findPurposesForCard()
        .then((data) => {
            this.setState({
                endIndex : data.length,
                data : data
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    render() {
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


