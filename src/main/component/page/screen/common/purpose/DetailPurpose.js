import React, { useState, Component } from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Alert } from 'react-native'
import InfoBox from '../../../../molecule/InfoBox';
import ImageButton from '../../../../atom/button/ImageButton';
import DecimalDayWidget from '../../../../atom/icon/DecimalDayWidget';
import DetailPlanStat from '../../../../atom/button/DetailPlanStat'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Request from '../../../../../util/Request'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useNavigation } from '@react-navigation/native';
import EasyDate from '../../../../../util/EasyDate';
import { Model, State, ResultState } from '../../../../../AppEnum';
import GlobalConfig from '../../../../../GlobalConfig';
import useStores from '../../../../../mobX/helper/useStores';
import PurposeService from '../../../../../rest/service/PurposeService';
import ProfileWidget from '../../../../molecule/ProfileWidget';
import { PurposeWriteType } from '../../../../../AppEnum';
import Purpose from '../../../../../rest/model/Purpose';
import MyPrgoressBar from '../../../../atom/progressBar/MyProgressBar';
import { inject } from 'mobx-react';
import CaterPlannerRank from '../../../../atom/icon/CaterPlannerRank';

import SafeOverFlowText from '../../../../atom/text/SafeOverFlowText';
import CaterPlannerResult from '../../../../organism/CaterPlannerResult';

function BottomBar({ data, setCheersCount }) {

    const navigation = useNavigation();
    const [isCheer, setIsCheer] = useState(!data.canCheer);

    const { authStore } = useStores();

    //data.purpose.id

    const toggleCheer = async () => {
        try {

            setCheersCount(!isCheer ? ++data.cheersCount : --data.cheersCount)
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
        <View style={{ elevation: 5, backgroundColor: 'white', paddingVertical: 13, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <ImageButton
                backgroundStyle={{
                    marginLeft: 18,

                }}
                imageStyle={{ width: 28, height: 30, tintColor: isCheer ? 'red' : undefined }}
                source={require('../../../../../../../asset/button/heart_button.png')}
                onPress={toggleCheer}
            />

            <ImageButton
                backgroundStyle={{
                    marginLeft: 20,
                }}
                imageStyle={{ width: 27, height: 29, tintColor: 'black' }}
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
                iconStyle: {
                    height: 32,
                    width: 28
                },
                action: () => {
                    this.props.navigation.navigate('WriteStory', {
                        purpose: this.props.data.purpose
                    })
                },
                icon: require('../../../../../../../asset/icon/story_icon.png')
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
                                    resizeMode="stretch"
                                    style={[floatingButtonStyles.subIcon, e.iconStyle]}
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
        <View style={{ height: 60, width: Dimensions.get('window').width, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ position: 'absolute', left: 40, height: '100%', width: 1, backgroundColor: '#C4C4C4' }} />
            <View style={{ marginLeft: 25, width: 30, height: 30, borderRadius: 30, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../../../../../../asset/icon/story_icon.png')}
                    resizeMode="stretch"
                    style={{ width: 20, height: 20 }}
                />
            </View>
            <Text
                numberOfLines={1}
                style={{ marginLeft: 15, width: '83%', textAlign: 'left' }} >
                {text}
            </Text>
        </View>
    )
}

function StoryTag({ date }) {
    return (
        <View style={{ height: 35, justifyContent: 'center', marginVertical: 8 }}>
            <View style={{ position: 'absolute', left: 10, width: 65, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 30, borderWidth: 1, borderColor: '#9E9E9E', paddingVertical: 5 }}>
                <Text
                    style={{
                        color: '#9E9E9E',
                        fontSize: 10
                    }}
                >{date.toStringFormat('.')}</Text>
            </View>
        </View>
    )
}

function StoryTimeLine({ stories }) {

    let beforeDate = null;


    return (
        <View style={{ flexDirection: 'row', paddingBottom: 10, width: '100%' }}>
            <View style={{ position: 'absolute', left: 40, height: '100%', width: 1, backgroundColor: '#C4C4C4' }} />
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
                                <View>
                                    {dateChange && <StoryTag date={story.createDate} />}
                                </View>
                                <View>
                                    <StoryBox text={story.title} />
                                </View>
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


        this.state = {
            headerVisible: true,
        }

    }


    _setCheersCount = async (value) => {
        this.props.data.purpose.cheersCount = value;
        this.props.refresh();
    }

    _modifyPurpose = async () => {
        this.navigation.navigate('CreateNavigation', {
            screen: 'PurposeWriteBoard',
            params: {
                purpose: Purpose.clone(this.props.data.purpose),
                type: PurposeWriteType.MODIFY
            }
        })
    }

    _risePurpose = async () => {
        this.navigation.navigate('CreateNavigation', {
            screen: 'PurposeWriteBoard',
            params: {
                purpose: Purpose.clone(this.props.data.purpose),
                type: PurposeWriteType.RISE
            }
        })
    }

    _deletePurpose = async () => {
        try {
            await Request.delete(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.props.data.purpose.id}`)
                .auth(await this.authStore.getToken())
                .submit();

            await PurposeService.getInstance().delete(this.props.data.purpose.id);
            this.navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    _giveUpPurpose = async () => {
        try {
            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.props.data.purpose.id}/update`, JSON.stringify({
                stat: State.FAIL
            }))
                .auth(await this.authStore.getToken())
                .submit();

            await PurposeService.getInstance().delete(this.props.data.purpose.id);
            this.props.data.purpose.stat = State.FAIL;

            this.props.refresh();

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Menu
                        ref={ref => { this._purposeContolMenuRef = ref }}>
                        {!this.props.data.purpose.isFinish &&
                            <MenuItem onPress={() => {
                                this._purposeContolMenuRef.hide();
                                this._modifyPurpose();
                            }}>수정</MenuItem>}
                        {this.props.data.purpose.stat == State.PROCEED && !this.props.data.purpose.isSucceeseProceed &&
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
                        {this.props.data.purpose.stat == State.FAIL &&
                            <View>
                                <MenuDivider />
                                <MenuItem onPress={() => {
                                    this._purposeContolMenuRef.hide();
                                    this._risePurpose();
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
                                    <View style={{ overflow: 'visible', backgroundColor: 'white', height: 53, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, elevation: 5 }}>
                                        <ImageButton
                                            backgroundStyle={{
                                                height: '100%',
                                            }}
                                            imageStyle={{
                                                width: 32,
                                                height: 37,
                                                tintColor: 'black'
                                            }}
                                            source={require('../../../../../../../asset/button/arrow_button.png')}
                                            onPress={() => { this.navigation.goBack(); }} />
                                        {this.props.data.isOwner &&
                                            <ImageButton
                                                backgroundStyle={{
                                                    height: '100%'
                                                }}
                                                imageStyle={{
                                                    width: 30,
                                                    height: 30,
                                                }}
                                                onPress={() => {
                                                    this._purposeContolMenuRef.show();
                                                }}
                                                source={require('../../../../../../../asset/button/more_button2.png')}
                                            />}
                                    </View>

                                }
                            </View>
                        )
                    }}
                    stickyHeaderHeight={53}
                    parallaxHeaderHeight={Dimensions.get('window').height * 0.33}
                    backgroundSpeed={10}
                    renderBackground={() => {
                        return (
                            <View style={detailPurposeStyles.thumbnailImageContainer}>
                                <Image
                                    source={{ uri: this.props.data.purpose.photoUrl }}
                                    resizeMode="stretch"
                                    style={{ flex: 1, width: "100%", height: undefined }}
                                />
                            </View>
                        )
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                        <View style={detailPurposeStyles.purposeInfoContainer}>
                            <View style={{ position: 'absolute', right: 15, top: -40 }}>
                                <CaterPlannerRank
                                    purpose={this.props.data.purpose}
                                    style={{
                                        width: 70,
                                        height: 70
                                    }}
                                />
                            </View>
                            <Text style={detailPurposeStyles.purposeNameFont}>
                                {this.props.data.purpose.name}
                            </Text>
                            <View
                                style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
                                <DecimalDayWidget purpose={this.props.data.purpose} />

                            </View>
                            {/* <Text 
                            style={detailPurposeStyles.purposeDescriptionFont}
                            >
                                {this.props.data.purpose.description}
                            </Text> */}
                            <SafeOverFlowText
                                backgroundStyle={{ marginBottom: 10 }}
                                fontStyle={detailPurposeStyles.purposeDescriptionFont}
                                text={this.props.data.purpose.description}
                                minNumberOfLines={4}
                            />
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
                                        {!this.props.data.purpose.achieve || this.props.data.purpose.achieve == 0 ? 0 : this.props.data.purpose.achieve}%
                            </Text>
                                </View>
                                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                    <MyPrgoressBar
                                        width={Dimensions.get('window').width - 40}
                                        height={7}
                                        animated={true}
                                        barColor={'#00B412'}
                                        value={this.props.data.purpose.achieve}
                                    />
                                </View>
                            </View>
                            <View style={detailPurposeStyles.purposeProfileContainer}>
                                <ProfileWidget
                                    user={this.props.data.author}
                                    fontStyle={{ alignSelf: 'flex-end', fontSize: 12, marginBottom: 4 }}
                                />
                            </View>
                            <View style={{ paddingVertical: 10, backgroundColor: 'white', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: 'gray',
                                    }}
                                >
                                    since {new EasyDate(this.props.data.createDate).toStringFormat('.')}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        응원 {this.props.data.cheersCount}
                                    </Text>
                                    <Text style={{
                                        fontSize: 15, marginLeft: 15,
                                        fontWeight: 'bold'
                                    }}>
                                        댓글 {this.props.data.commentCount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <InfoBox
                                title={'진행중 수행 목표'}
                                detailButtonPress={() => {
                                    this.navigation.navigate('DetailPlanList', {
                                        data: this.props.data
                                    })
                                }}
                                detailButtonHint={'더보기'}
                            >
                                {(() => {

                                    const activeGoals = this.props.data.purpose.detailPlans.filter(g => !g.isProcceedEnd);

                                    console.log(activeGoals.length);

                                    return (
                                        <View style={{ height: 300, width: '100%' }}>
                                            {activeGoals.length == 0 ?
                                                <CaterPlannerResult
                                                    backgroundStyle={{ flex: 1 }}
                                                    text="현재 진행 중인 수행 목표가 없습니다."
                                                    state={ResultState.NOTHING}
                                                /> :
                                                <ScrollView style={{ backgroundColor: '#F8F8F8', flex: 1 }}
                                                    horizontal
                                                    contentContainerStyle={{ marginTop: 10, justifyContent: 'center' }}
                                                    persistentScrollbar={true}
                                                >
                                                    {

                                                        (() => {
                                                            let views = [];
                                                            for (let i = 0; i < activeGoals.length; i += 4) {
                                                                views.push(activeGoals.slice(i, i + 4));
                                                            }

                                                            return views.map((elements) => {
                                                                return (<View style={{ paddingHorizontal: 10, }}>
                                                                    {elements.map((goal) => {
                                                                        return (
                                                                            <View style={detailPurposeStyles.paperContainer}>
                                                                                <DetailPlanStat
                                                                                    goal={goal}
                                                                                    onPress={() => {
                                                                                        this.navigation.navigate('DetailGoal', {
                                                                                            goal: goal
                                                                                        })
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                        )
                                                                    })}
                                                                </View>)
                                                            })


                                                        })()

                                                    }
                                                </ScrollView>}
                                        </View>
                                    )
                                })()}
                            </InfoBox>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <InfoBox
                                title={'스토리 타임라인'}
                                detailButtonPress={() => {
                                    this.navigation.push('PurposeStories', {
                                        purpose: this.props.data.purpose
                                    })
                                }}
                                detailButtonHint={'모두 보기'}
                            >
                                {this.props.data.storyTags.length == 0 ?
                                    <CaterPlannerResult
                                        backgroundStyle={{
                                            height: 300
                                        }}
                                        text={'내용이 없습니다.'}
                                        state={ResultState.NOTHING}
                                    />
                                    :
                                    <StoryTimeLine stories={this.props.data.storyTags} />}
                            </InfoBox>
                        </View>
                    </View>
                </ParallaxScrollView>
                <BottomBar data={this.props.data} setCheersCount={this._setCheersCount} />
                <View style={{ elevation: 5, position: 'absolute', bottom: 15, right: 20 }}>
                    <ActionFloatingButton data={this.props.data} navigation={this.navigation} />
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
    },
    purposeProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    paperContainer: {
        marginBottom: 5
    },
    purposeAuthorNameFont: {
        fontSize: 13,
        marginLeft: 8
    }

})