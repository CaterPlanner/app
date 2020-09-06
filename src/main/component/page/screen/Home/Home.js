import React, { Component } from 'react'
import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PageStateText from '../../../atom/text/PageStateText'

import PurposeService from '../../../../rest/service/PurposeService';
import DecimalDayWidget from '../../../atom/icon/DecimalDayWidget';
import { inject } from 'mobx-react';
import { PurposeWriteType, State } from '../../../../AppEnum';
import ImageButton from '../../../atom/button/ImageButton';
import { useNavigation } from '@react-navigation/native';
import Purpose from '../../../../rest/model/Purpose';
import GlobalConfig from '../../../../GlobalConfig';
import useStores from '../../../../mobX/helper/useStores';
import EasyDate from '../../../../util/EasyDate';
import Request from '../../../../util/Request';

import {
    useFocusEffect,
} from '@react-navigation/native';


const fullWidth = Dimensions.get('window').width;


function EmptyCard({ onPress }) {
    return (
        <TouchableOpacity style={{
            height: '100%', justifyContent: 'center', width: 316
        }} onPress={onPress}>
            <View style={[cardStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', elevation: 0 }]}>
                <View style={{ width: 100, height: 110, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        resizeMode="stretch"
                        style={{ flex: 1, height: undefined, width: '100%' }}
                        source={require('../../../../../../asset/button/plan_insert_button.png')}
                    />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40 }}>
                    새로운 목적을 추가해보세요
                </Text>
            </View>
        </TouchableOpacity>
    )
}

function ActiveCard({ purpose, onPress, loadData }) {

    const navigation = useNavigation();
    const { authStore } = useStores();


    const sendResult = async (stat) => {
        try {

            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${purpose.id}/update`, JSON.stringify({
                stat: stat
            }))
                .auth(await authStore.getToken())
                .submit();

            await PurposeService.getInstance().delete(purpose.id);

            loadData();

        } catch (e) {
            console.log(e);
        }
    }


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
                        <DecimalDayWidget purpose={purpose} />
                    </View>
                </View>

                {(purpose.stat == State.WAIT || purpose.isFailProceed) &&
                    <View style={[cardStyles.container, { right: 0, heigth: '100%', width: '100%', margin: 0, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)' }]} />
                }


                <View style={{ position: 'absolute', top: -40, width: '100%', alignItems: 'center', elevation: 10 }}>
                    <Image
                        resizeMode="stretch"
                        style={{ width: '90%', height: 80, tintColor: '#585858' }}
                        source={require('../../../../../../asset/image/card_header.png')}
                    />
                </View>

                {(purpose.stat == State.WAIT || purpose.isFailProceed) &&
                    <View style={{ position: 'absolute', elevation: 10, left: 126, top: 70 }} >
                        <ImageButton
                            imageStyle={{
                                width: 80,
                                height: 100
                            }}
                            source={require('../../../../../../asset/button/start_button.png')}
                            onPress={async () => {

                                navigation.navigate('CreateNavigation', {
                                    screen: 'PurposeWriteBoard',
                                    params: {
                                        purpose: Purpose.clone(purpose),
                                        type: PurposeWriteType.RETRY
                                    }
                                })
                            }}
                        />
                    </View>
                }

                {purpose.isSucceeseProceed &&
                    <View style={{ position: 'absolute', elevation: 10, left: 126, top: 70 }} >
                        <ImageButton
                            imageStyle={{
                                width: 80,
                                height: 100
                            }}
                            source={require('../../../../../../asset/button/start_button.png')}
                            onPress={() => {

                                Alert.alert(null, '목적 수행이 완료되었습니다',
                                    [
                                        {
                                            text: '다음에 결정',
                                            style: 'cancel',
                                        },
                                        {
                                            text: "실패",
                                            onPress: () => {
                                                sendResult(State.FAIL)
                                            }
                                        },
                                        {
                                            text: "성공",
                                            onPress: () => {
                                                sendResult(State.SUCCEES)
                                            }
                                        }
                                    ])
                            }}
                        />
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}


const cardStyles = StyleSheet.create({
    container: {
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        backgroundColor: '#ffffff',
        elevation: 3,
        height: 380,
        margin: 3,
    },
})

function DummyUseFocus({ loadData }) {
    useFocusEffect(
        React.useCallback(() => {
            loadData();
            return;
        }, [])
    );

    return null;
}

@inject(['appStore'])
export default class Home extends Component {


    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0
        }

        this.appStore = this.props.appStore;

    }
    //
    _renderItem = ({ item, index }) => {
        return (
            <ActiveCard purpose={item} loadData={this._loadData}
                onPress={() => {
                    this.props.navigation.navigate('PublicNavigation', {
                        screen: 'LoadMyPurpose',
                        params: {
                            id: item.id,
                            refreshHome: this._loadData
                        }
                    })
                }} />
            // <EmptyCard/>
        )
    }


    _loadData = async () => {
        try {

            await PurposeService.getInstance().refresh();

            const data = await PurposeService.getInstance().findPurposesForCard();


            let hasSuccees = false;
            let hasFailed = false;

            if (data) {
                data.forEach((purpose) => {
                    if (purpose.isFailProceed)
                        hasFailed = true;
                    if (purpose.isSucceeseProceed)
                        hasSuccees = true;
                });

                if (hasSuccees)
                    Alert.alert(null, '수행을 완료한 목적이 있습니다.')
                if (hasFailed)
                    Alert.alert(null, '수행을 실패한 목적이 있습니다.');



                for (purpose of data) {
                    if (purpose.stat == 0) {
                        this.appStore.onScheduler();
                        break;
                    }
                }
            }

            this.setState({
                activeIndex: 0,
                endIndex: data ? data.length : 0,
                data: data
            });
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        this._loadData();


    }

    render() {
        console.log(fullWidth - 95);
        return (
            <View style={{ flex: 1 }}>
                <DummyUseFocus loadData={this._loadData} />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 11, justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            {!this.state.data || this.state.data.length == 0 ?
                                <EmptyCard
                                    onPress={() => {
                                        this.props.navigation.navigate('CreateNavigation', {
                                            screen: 'PurposeWriteBoard',
                                            params: {
                                                type: PurposeWriteType.CREATE
                                            }
                                        })
                                    }}
                                /> :
                                <Carousel
                                    ref={(ref) => { this.carousel = ref; }}
                                    data={this.state.data}
                                    renderItem={this._renderItem}
                                    scrollEnabled={true}
                                    sliderWidth={fullWidth}
                                    itemWidth={316}
                                    onSnapToItem={
                                        index => this.setState({ activeIndex: index })}
                                    hasParallaxImages={true}
                                />
                            }
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flex: 1 }}>
                        {this.state.data && this.state.data.length != 0 &&
                            <PageStateText
                                activeIndex={this.state.activeIndex + 1}
                                endIndex={this.state.endIndex}
                            />
                        }
                    </View>
                </View>
            </View>



        );
    }
}


