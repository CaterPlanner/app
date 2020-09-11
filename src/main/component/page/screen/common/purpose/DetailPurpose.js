import React, { useState, useEffect, Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Alert, Modal, TouchableOpacity } from 'react-native'
import InfoBox from '../../../../molecule/InfoBox';
import ImageButton from '../../../../atom/button/ImageButton';
import DecimalDayWidget from '../../../../atom/icon/DecimalDayWidget';
import DetailPlanStat from '../../../../atom/button/DetailPlanStat'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Request from '../../../../../util/Request'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useNavigation } from '@react-navigation/native';
import EasyDate from '../../../../../util/EasyDate';
import { Model, State } from '../../../../../AppEnum';
import GlobalConfig from '../../../../../GlobalConfig';
import useStores from '../../../../../mobX/helper/useStores';
import PurposeService from '../../../../../rest/service/PurposeService';
import ProfileWidget from '../../../../molecule/ProfileWidget';
import { PurposeWriteType } from '../../../../../AppEnum';
import Purpose from '../../../../../rest/model/Purpose';
import MyPrgoressBar from '../../../../atom/progressBar/MyProgressBar';
import { inject } from 'mobx-react';


function BottomBar({ data }) {

    const navigation = useNavigation();
    const [isCheer, setIsCheer] = useState(!data.canCheer);

    const { authStore } = useStores();

    //data.purpose.id

    const toggleCheer = async () => {
        try {

            data.setCheersCount(!isCheer ? ++data.cheersCount : --data.cheersCount)
            setIsCheer(!isCheer);

            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${data.purpose.id}/cheer/${isCheer ? 'negative' : 'positive'}`)
                .auth(await authStore.getToken())
                .submit();

        } catch (e) {
            console.log(e);
            // data.setCheersCount(!isCheer ? ++data.cheersCount : --data.cheersCount)
            // setIsCheer(!isCheer);
        }
    }

    return (
        <View style={{ elevation: 5, backgroundColor: 'white', paddingVertical: 15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ImageButton
                backgroundStyle={{
                    marginLeft: 20
                }}
                imageStyle={{ width: 27, height: 25, tintColor: isCheer ? 'red' : undefined }}
                source={require('../../../../../../../asset/button/heart_button.png')}
                onPress={toggleCheer}
            />

            <ImageButton
                backgroundStyle={{
                    marginLeft: 20
                }}
                imageStyle={{ width: 27, height: 25, tintColor: '#9D9D9D' }}
                source={require('../../../../../../../asset/button/comment_button.png')}
                onPress={() => {
                    navigation.push('CommnetView', {
                        entity: Model.PURPOSE,
                        id: data.purpose.id
                    })
                }}
            />


        </View>
    )
}


class ActionFloatingButton extends Component {

    constructor(props) {
        super(props);

        this.animation = new Animated.Value(0);

        this.state = {
            isOpen: false
        }


        // this.navigation = useNavigation();

    }

    _toggleMenu = async () => {

        const toValue = this.state.isOpen ? 0 : 1;

        Animated.spring(this.animation, { //바운스 효과
            toValue,
            useNativeDriver: true,
            friction: 7  //바운스 가중치
        }).start();

        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    _elementAnimation = (translateY) => ({
        transform: [
            { scale: this.animation },
            {
                translateY: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, translateY] //inputRange 가 0일땐 0, 1일땐 translateY
                })
            }
        ]
    })

    render() {

        const visitorAction = [
            {
                name: '따라하기',
                color: '#3CAE14',
                action: () => {
                    this.props.navigation.navigate('CreateNavigation', {
                        screen: 'PurposeWriteBoard',
                        params: {
                            purpose: Purpose.clone(this.props.data.purpose),
                            type: PurposeWriteType.FOLLOW
                        }
                    })
                },
                icon: require('../../../../../../../asset/button/purpose_follow_button.png')
            }
        ]

        const ownerAction = [
            {
                name: '스토리 쓰기',
                color: '#3CAE14',
                action: () => {
                    this.props.navigation.navigate('WriteStory', {
                        purpose: this.props.data.purpose
                    })
                },
                icon: require('../../../../../../../asset/button/write_story_button.png')
            }
        ]

        const currentAction = this.props.data.isOwner ? ownerAction : visitorAction;
        return (
            <View style={{ alignItems: 'center' }}>
                {
                    currentAction.map((e, index) => (
                        <TouchableWithoutFeedback onPressIn={e.action}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Animated.View style={[floatingButtonStyles.elementButtonStyle, this._elementAnimation(-20 * (index + 1)), { backgroundColor: e.color }]}>
                                <Image
                                    style={floatingButtonStyles.subIcon}
                                    source={e.icon}
                                />
                                <View style={{ borderRadius: 5, position: 'absolute', right: 70, backgroundColor: 'white', width: 80, height: 25, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
                                    <Text style={floatingButtonStyles.elementFontStyle}>
                                        {e.name}
                                    </Text>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    ))
                }
                <TouchableWithoutFeedback style={{ alignItems: 'center', justifyContent: 'center' }} onPress={this._toggleMenu} >
                    <Animated.View style={[floatingButtonStyles.buttonStyle]}>
                        <Image
                            style={floatingButtonStyles.actionIcon}
                            source={require('../../../../../../../asset/button/purpose_action_button.png')}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )

    }



}

// 

const floatingButtonStyles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#25B046',
        width: 60,
        height: 60,
        borderRadius: 60,
        // elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    elementButtonStyle: {
        width: 55,
        height: 55,
        borderRadius: 55,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    elementFontStyle: {
        textAlign: 'center'
    },
    actionIcon: {
        width: 35,
        height: 35,
        tintColor: 'white'
    },
    subIcon: {
        width: 30,
        height: 30,
        tintColor: 'white'
    }
})

function StoryBox({ type, text }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <View style={{ position: 'absolute', left: -15, width: 30, height: 30, borderRadius: 30, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../../../../../../asset/icon/story_vlog_icon.png')}
                    resizeMode="stretch"
                    style={{ width: 20, height: 20 }}
                />
            </View>
            <Text 
            numberOfLines={1}
            style={{ marginLeft: 30, width: '83%' }} >
                {text}
            </Text>
        </View>
    )
}

function StoryTag({ date }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: 30, height: 1, marginRight: 8 }} />
            <Text>{date.toString()}</Text>
        </View>
    )
}

function StoryTimeLine({ stories }) {

    let beforeDate = null;

    return (
        <View style={{ flexDirection: 'row', paddingBottom: 10, width: '100%', backgroundColor: 'white', paddingBottom: 30 }}>
            <View style={{ marginLeft: 29, height: '100%', width: 1, backgroundColor: 'black' }} />
            <View style={{ marginTop: 5 }}>
                {
                    stories.map((story) => {
                        let dateChange = false;
                        story.createDate = new EasyDate(story.createDate);
                        if (beforeDate === null || !beforeDate.equalsDate(story.createDate)) {
                            beforeDate = story.createDate;
                            dateChange = true;
                        }
                        return (
                            <View>
                                {dateChange && <StoryTag date={story.createDate} />}
                                <StoryBox text={story.title} />
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

@inject(['authStore'])
export default class DetailPurpose extends Component {

    constructor(props) {
        super(props);



        this.authStore = props.authStore;
        this.navigation = this.props.navigation;

        this.props.data.setCheersCount = this._setCheersCount;


        this.state = {
            headerVisible: true,
            data: props.data
        }


    }

    _setCheersCount = async (value) => {
        this.state.data.purpose.cheersCount = value;
        this.setState({
            data: this.state.data
        })
    }

    _modifyPurpose = async () => {
        this.navigation.navigate('CreateNavigation', {
            screen: 'PurposeWriteBoard',
            params: {
                purpose: Purpose.clone(this.state.data.purpose),
                type: PurposeWriteType.MODIFY
            }
        })
    }

    _retryPurpose = async () => {
        this.navigation.navigate('CreateNavigation', {
            screen: 'PurposeWriteBoard',
            params: {
                purpose: Purpose.clone(this.state.data.purpose),
                type: PurposeWriteType.RETRY
            }
        })
    }

    _deletePurpose = async () => {
        try {
            await Request.delete(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.state.data.purpose.id}`)
                .auth(await this.authStore.getToken())
                .submit();

            await PurposeService.getInstance().delete(this.state.data.purpose.id);
            this.navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    _giveUpPurpose = async () => {
        try {
            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.state.data.purpose.id}/update`, JSON.stringify({
                stat: State.FAIL
            }))
                .auth(await this.authStore.getToken())
                .submit();

            await PurposeService.getInstance().delete(this.state.data.purpose.id);
            this.state.data.purpose.stat = State.FAIL;

            this.setState({
                data: this.state.data
            })

        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                data: this.state.data
            })
        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Menu
                        ref={ref => { this._purposeContolMenuRef = ref }}>
                        {!this.state.data.purpose.isFinish &&
                            <MenuItem onPress={() => {
                                this._purposeContolMenuRef.hide();
                                this._modifyPurpose();
                            }}>수정</MenuItem>}
                        {this.state.data.purpose.stat == State.PROCEED && !this.state.data.purpose.isSucceeseProceed &&
                            <View>
                                <MenuDivider />
                                <MenuItem onPress={() => {
                                    this._purposeContolMenuRef.hide();
                                    Alert.alert(
                                        '',
                                        '정말로 포기하시겠습니까?',
                                        [
                                            {
                                                text: '취소',
                                                style: 'cancel'
                                            },
                                            {
                                                text: '확인',
                                                onPress: this._giveUpPurpose
                                            }
                                        ]
                                    );
                                }} >포기하기</MenuItem>
                            </View>
                        }
                        {this.state.data.purpose.stat == State.FAIL &&
                            <View>
                                <MenuDivider />
                                <MenuItem onPress={() => {
                                    this._purposeContolMenuRef.hide();
                                    this._retryPurpose();
                                }} >다시하기</MenuItem>
                            </View>
                        }
                        <MenuDivider />
                        <MenuItem onPress={() => {
                            this._purposeContolMenuRef.hide();
                            Alert.alert(
                                '',
                                '목적을 정말 삭제하시겠습니까?',
                                [
                                    {
                                        text: '취소',
                                        style: 'cancel'
                                    },
                                    {
                                        text: '확인',
                                        onPress: this._deletePurpose
                                    }
                                ]
                            );




                        }}>삭제</MenuItem>
                    </Menu>
                </View>
                <ParallaxScrollView
                    backgroundColor={'rgb(0,0,0,0)'}
                    fadeOutForeground={true}
                    backgroundScrollSpeed={20}
                    // onChangeHeaderVisibility={(a) => {
                    //     setHeaderVisible(a);
                    // }}
                    renderFixedHeader={() => {
                        return (
                            <View>
                                {this.state.headerVisible &&
                                    <View style={{ overflow: 'visible', backgroundColor: 'white', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, elevation: 5 }}>
                                        <ImageButton
                                            backgroundStyle={{
                                                marginLeft: 0,
                                                height: '100%'
                                            }}
                                            imageStyle={{
                                                width: 21,
                                                height: 17
                                            }}
                                            source={require('../../../../../../../asset/button/arrow_button.png')}
                                            onPress={() => { this.navigation.goBack(); }} />
                                        {this.state.data.isOwner &&
                                            <ImageButton
                                                backgroundStyle={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 20,
                                                    height: 30
                                                }}
                                                imageStyle={{
                                                    width: 6,
                                                    height: 25
                                                }}
                                                onPress={() => {
                                                    this._purposeContolMenuRef.show();
                                                }}
                                                source={require('../../../../../../../asset/button/more_button.png')}
                                            />}
                                    </View>

                                }
                            </View>
                        )
                    }}
                    stickyHeaderHeight={50}
                    parallaxHeaderHeight={Dimensions.get('window').height * 0.33}
                    backgroundSpeed={10}
                    renderBackground={() => {
                        return (
                            <View style={detailPurposeStyles.thumbnailImageContainer}>
                                <Image
                                    source={{ uri: this.state.data.purpose.photoUrl }}
                                    resizeMode="stretch"
                                    style={{ flex: 1, width: "100%", height: undefined }}
                                />
                            </View>
                        )
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                        <View style={detailPurposeStyles.purposeInfoContainer}>
                            <Text style={detailPurposeStyles.purposeNameFont}>
                                {this.state.data.purpose.name}
                            </Text>
                            <View 
                            style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
                                <DecimalDayWidget purpose={this.state.data.purpose} />

                            </View>
                            <Text 
                            style={detailPurposeStyles.purposeDescriptionFont}>
                                {this.state.data.purpose.description}
                            </Text>
                            <View style={{ paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                >
                                    <Text style={{
                                        fontSize: 14,
                                        textAlign: 'right',
                                        paddingVertical: 8
                                    }}>
                                        달성률
                            </Text>
                                    <Text style={{
                                        fontSize: 14,
                                        textAlign: 'right',
                                        paddingVertical: 8
                                    }}>
                                        {!this.state.data.purpose.achieve || this.state.data.purpose.achieve == 0 ? 0 : this.state.data.purpose.achieve}%
                            </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <MyPrgoressBar
                                        width={Dimensions.get('window').width - 40}
                                        height={7}
                                        animated={true}
                                        barColor={'red'}
                                        value={this.state.data.purpose.achieve}
                                    />
                                </View>
                            </View>
                            <View style={detailPurposeStyles.purposeProfileContainer}>
                                <ProfileWidget
                                    user={this.state.data.author}
                                    fontStyle={{ alignSelf: 'flex-end', marginBottom: 5 }}
                                />
                            </View>
                            <View style={{ paddingVertical: 10, backgroundColor: 'white', width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>
                                    응원 {this.state.data.cheersCount}
                                </Text>
                                <Text style={{
                                    fontSize: 15, marginLeft: 15,
                                    fontWeight: 'bold'
                                }}>
                                    댓글 {this.state.data.commentCount}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <InfoBox
                                title={'진행 중인 목표'}
                                detailButtonPress={() => {
                                    this.navigation.navigate('DetailPlanList', {
                                        data: this.state.data
                                    })
                                }}
                                detailButtonHint={'더보기'}
                                child={(
                                    <View style={{ backgroundColor: '#F8F8F8', height: 300, paddingHorizontal: 10, marginTop: 10 }}>
                                        {
                                            this.state.data.purpose.detailPlans.map((goal) => {
                                                if (goal.isProcceedEnd)
                                                    return;

                                                return (<View style={detailPurposeStyles.paperContainer}>
                                                    <DetailPlanStat
                                                        goal={goal}
                                                        onPress={() => {
                                                            this.navigation.navigate('DetailGoal', {
                                                                goal: goal
                                                            })
                                                        }}
                                                    />
                                                </View>)
                                            })
                                        }
                                    </View>
                                )}
                            />
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <InfoBox
                                title={'스토리 타임라인'}
                                detailButtonPress={() => {
                                    this.navigation.push('PurposeStories', {
                                        purpose: this.state.data.purpose
                                    })
                                }}
                                detailButtonHint={'자세히보기'}
                                child={(<StoryTimeLine stories={this.state.data.storyTags} />)}
                            />
                        </View>
                    </View>
                </ParallaxScrollView>
                <BottomBar data={this.state.data} />
                <View style={{ elevation: 5, position: 'absolute', bottom: 15, right: 20 }}>
                    <ActionFloatingButton data={this.state.data} navigation={this.navigation} />
                </View>
            </View>
        )
    }
}


const detailPurposeStyles = StyleSheet.create({
    thumbnailImageContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.33,
    },
    purposeInfoContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 15
    },
    purposeNameFont: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 30,
        fontWeight: 'bold',
        marginBottom: 15
    },
    purposeDescriptionFont: {
        height: 60
    },
    purposeProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15
    },
    paperContainer: {
        marginBottom: 5
    },
    purposeAuthorNameFont: {
        fontSize: 13,
        marginLeft: 8
    }

})