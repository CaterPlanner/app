import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native'
import { inject, observer } from 'mobx-react'

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
@observer
export default class PurposeWriteBoard extends Component {

    constructor(props) {
        super(props)


        this.views = [
            <PurposeNameWrite next={this._next} />,
            <PurposeDescriptionWrite next={this._next} />,
            <PurposeThumbnailWrite navigation={this.props.navigation} />,
            <PurposeDecimalDayWrite />,
            <PurposeDetailPlansWrite navigation={this.props.navigation} />,
        ]

        this.purposeWriteStore = this.props.purposeWriteStore
        this.purposeWriteStore.start(this.views.length);
    }

    _renderItem = ({ item, index }) => {
        return (
            item
        );
    }

    _next = () => {

        if (this.purposeWriteStore.hasNext) {
            this.purposeWriteStore.next(this.carousel);
        }
    }

    _previous = () => {
        if (this.purposeWriteStore.hasPrevious) {
            this.purposeWriteStore.previous(this.carousel);
        }
    }

    componentWillMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.purposeWriteStore.activeIndex != 0) {
                this._previous();
            } else {
                return false;
            }
            return true;
        })
    }

    render() {
        if(this.purposeWriteStore.isFinish)
            this.backHandler.remove();

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {this.purposeWriteStore.isFinish ? <PurposeWriteDone navigation={this.props.navigation} /> : (
                    <View style={{ flex: 1 }}>
                        <View style={styles.topContainer}>
                            {/* <PageStateText activeIndex={this.state.activeIndex + 1} endIndex={this.state.endIndex}/> */}
                            {this.purposeWriteStore.hasPrevious ?
                                <ImageButton
                                    source={
                                        require('../../../../../../asset/button/arrow_button.png')
                                    }

                                    backgroundStyle={{ width: 40, height: 40 }}
                                    imageStyle={{ width: 25, height: 22 }}
                                    onPress={this._previous}
                                />
                                :
                                <ImageButton
                                    source={require('../../../../../../asset/button/exit_button.png')}
                                    backgroundStyle={{ width: 40, height: 40 }}
                                    imageStyle={{ width: 22, height: 22 }}
                                    onPress={this.props.navigation.goBack}
                                />
                            }
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
                            />
                        </View>
                        <View style={{ position: 'absolute', bottom: 30, right: 22 }}>
                            <ImageButton
                                backgroundStyle={{ backgroundColor: this.purposeWriteStore.isPermitNextScene ? '#25B046' : '#F1F1F1', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                                imageStyle={[
                                    (!this.purposeWriteStore.isLast ? 
                                    {width: 18, height: 28, marginLeft: 5} :
                                    {width: 40, height: 40}),
                                    {tintColor: this.purposeWriteStore.isPermitNextScene ? undefined : '#888888'}
                                ]}
                                source={
                                    !this.purposeWriteStore.isLast ?
                                        require('../../../../../../asset/button/next_button.png') :
                                        require('../../../../../../asset/button/check_button.png')
                                }
                                disabled={!this.purposeWriteStore.isPermitNextScene}
                                onPress={this._next}
                            />
                        </View>
                        {/* <View style={{ position: 'absolute', bottom: 45, width: '100%', alignItmes: 'flex-end' }}>
                            <View style={{ alginSelf: 'center' }}>
                                <PageStateText activeIndex={this.purposeWriteStore.activeIndex + 1} endIndex={this.purposeWriteStore.endIndex} />
                            </View>
                        </View> */}
                    </View>)}
            </View>
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
}
/*
*/
const styles = StyleSheet.create({
    topContainer: {
        flex: 0.52,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 7.5

    },
    viewContainer: {
        flex: 5.21
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },

    indexN: {
        fontSize: 20,
    },


})