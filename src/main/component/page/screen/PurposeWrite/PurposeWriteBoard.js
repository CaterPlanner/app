import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native'
import {inject, observable} from 'mobx-react'
import Carousel from 'react-native-snap-carousel';
import PurposeNameWrite from './PurposeNameWrite';
import PurposeDescriptionWrite from './PurposeDescriptionWrite';
import PurposeThumbnailWrite from './PurposeThumbnailWrite';
import PurposeDecimalDayWrite from './PurposeDecimalDayWrite';
import PurposeDetailPlansWrite from './PurposeDetailPlansWrite';
import PurposeOtherWrite from './PurposeOtherWrite';
import PurposeWriteDone from './PurposeWriteDone';

import ImageButton from '../../../atom/button/ImageButton'

import PageStateText from '../../../atom/text/PageStateText'

const fullWidth = Dimensions.get('window').width;

@inject(['purposeWriteStore'])
@observable
export default class PurposeWriteBoard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeIndex : 0,
            endIndex : 7,
            purpose : {}
        }

        this.purposeWriteStore = this.props.purposeWriteStore
        this.purposeWriteStore.start();

        this.views = [
            <PurposeNameWrite purpose={this.state.purpose} />,
            <PurposeDescriptionWrite purpose={this.state.purpose} />,
            <PurposeThumbnailWrite purpose={this.state.purpose} />,
            <PurposeDecimalDayWrite purpose={this.state.purpose} />,
            <PurposeDetailPlansWrite purpose={this.state.purpose} navigation={this.props.navigation} />,
            <PurposeOtherWrite purpose={this.state.purpose} />,
            <PurposeWriteDone purpose={this.state.purpose} navigation={this.props.navigation} />
        ]
    }

    _renderItem = ({ item, index }) => {
        return (
            item
        );
    }

    _next = () => {
        if(this.purposeWriteStore.permitNextScene){
        this.carousel._snapToItem(this.state.activeIndex + 1)
    }

    _previous = () => {
        this.carousel._snapToItem(this.state.activeIndex - 1)
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.activeIndex != 0) {
                this._previous();
                return true;
            } else {
                return false;
            }
        })
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.topContainer}>
                    {/* <PageStateText activeIndex={this.state.activeIndex + 1} endIndex={this.state.endIndex}/> */}
                    <ImageButton
                        text="X"
                        width={35}
                        height={35}
                        onPress={this._previous}
                    />
                </View>
                <View style={styles.viewContainer}>
                    <Carousel
                        style={{ flex: 1 }}
                        ref={ref => this.carousel = ref}
                        data={this.views}
                        renderItem={this._renderItem}
                        scrollEnabled={false}
                        sliderWidth={fullWidth}
                        itemWidth={fullWidth}
                        onSnapToItem = {
                            index => this.setState({activeIndex: index})
                        }
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{ width: "30%" }}>
                    </View>
                    <View style={{ width: "40%", alignItems: 'center' }}>
                        <PageStateText activeIndex={this.state.activeIndex + 1} endIndex={this.state.endIndex} />
                    </View>
                    <View style={{ width: "30%", alignItems: 'flex-end', paddingRight: 12 }}>
                        {this.state.activeIndex + 1 != this.state.endIndex &&
                            <ImageButton
                                text=">"
                                width={60}
                                height={60}
                                onPress={this._next}
                                
                            />
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'gray',
        paddingLeft: 15

    },
    viewContainer: {
        flex: 6,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: 'yellow'
    },

    indexN: {
        fontSize: 20,
    },


})