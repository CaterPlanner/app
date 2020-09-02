import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Button } from 'react-native'
import InfoBox from '../../../../molecule/InfoBox';
import ImageButton from '../../../../atom/button/ImageButton';
import DecimalDayWidget from '../../../../atom/icon/DecimalDayWidget';
import DetailPlanPaper from '../../../../atom/button/DatePlanPaper'

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Request from '../../../../../util/Request'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useNavigation } from '@react-navigation/native';
import EasyDate from '../../../../../util/EasyDate';
import {Model} from '../../../../../AppEnum';
import GlobalConfig from '../../../../../GlobalConfig';
import useStores from '../../../../../mobX/helper/useStores';
import PurposeService from '../../../../../rest/service/PurposeService';



function BottomBar({data}){

    const navigation = useNavigation();
    const [isCheer, setIsCheer] = useState(!data.canCheer);

    const {authStore} = useStores();

    //data.purpose.id

    return(
        <View style={bottomBarStyles.bar}>
            <ImageButton
                backgroundStyle=
                {[bottomBarStyles.leftSideElement, {
                    width:29,
                    height:26
                }]}
                imageStyle={{
                    width:29,
                    height:26
                }}
                source={require('../../../../../../../asset/button/comment_button.png')}
                onPress={() => {
                    navigation.navigate('CommentView', {
                        entity : Model.PURPOSE,
                        id : data.purpose.id
                    });
                }}
            />
            <ImageButton
                backgroundStyle=
                {[bottomBarStyles.leftSideElement, {
                    width:29,
                    height:26
                }]}
                imageStyle={{
                    width:29,
                    height:26
                }}
                source={require('../../../../../../../asset/button/comment_button.png')}
                onPress={() => {
                    Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${data.purpose.id}/${isCheer ? 'negative' : 'positive'}`)
                    .auth(authStore.userToken.token).submit()
                    .then(() => {
                        setIsCheer(!isCheer);
                    })
                    .catch(e => {
                        console.log(e);
                    }) 
                }}
            />
            <Button
                title="스토리 쓰기"
                onPress={() => {
                    navigation.navigate('WriteStory', {
                        purpose : data.purpose,
                        refreshPurpose : data.refreshPurpose
                    })
                }}
            />
        </View>
    )
}



const bottomBarStyles = StyleSheet.create({
    bar: {
        backgroundColor: 'white',
        height: 48,
        flexDirection: 'row',
        alignItems:'center',
        elevation: 5

    },
    leftSideElement:{
        marginLeft: 15
    }
})


function ActinFloatingButton() {

    let animation = new Animated.Value(1); //각 애니메이션에 대한 초기값
    let isOpen = false;

    const toggleMenu = () => {

        const toValue = isOpen ? 0 : 1;
        
        Animated.spring(animation, { //바운스 효과
            toValue ,
            friction: 7  //바운스 가중치
        }).start();

        isOpen = !isOpen;
    }


    const elementAnimation = (translateY) => ({
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, translateY] //inputRange 가 0일땐 0, 1일땐 translateY
                })
            }
        ]
    })


    return (
        <View style={{alignItems : 'center'}}>
            <TouchableWithoutFeedback>
                <Animated.View style={[floatingButtonStyles.elementButtonStyle, elementAnimation(-40), {backgroundColor: '#F2994A'}]}>
                    <View style={{borderRadius: 5, position: 'absolute', right : 70, backgroundColor:'white', width: 80, height: 25, alignItems:'center', justifyContent:'center', elevation : 5 }}>
                        <Text style={floatingButtonStyles.elementFontStyle}>
                            VLOG
                        </Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback >
                <Animated.View style={[floatingButtonStyles.elementButtonStyle, elementAnimation(-20), {backgroundColor:'#F2C94C'}]}>
                    <View style={{borderRadius: 5, position: 'absolute', right : 70, backgroundColor:'white', width: 80, height: 25, alignItems:'center', justifyContent:'center', elevation : 5 }}>
                        <Text style={floatingButtonStyles.elementFontStyle}>
                            도움요청
                        </Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[floatingButtonStyles.buttonStyle]}>
                    <Text >heldlo</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const floatingButtonStyles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#25B046',
        width: 60,
        height: 60,
        borderRadius: 60,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    elementButtonStyle: {
        width: 55,
        height: 55,
        borderRadius: 55,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    elementFontStyle:{
        textAlign:'center'
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
            <Text style={{ marginLeft: 30 }}>
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
        <View style={{ flexDirection: 'row', height: 500, width: '100%', backgroundColor: 'white' }}>
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

export default function DetailPurpose({ data }) {

    const [changeHeaderVisibility, setChangeHeaderVisibility] = useState(true);

    const purpose = data.purpose;
    const isOwner = data.isOwner;

    const {authStore} = useStores();

    const navigation = useNavigation();

    let _purposeContolMenuRef = null;


    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignSelf: 'flex-end' }}>
                <Menu
                    ref={ref => { _purposeContolMenuRef = ref }}>
                    <MenuItem onPress={() => {
                        _purposeContolMenuRef.hide();
                        navigation.navigate('CreateNavigation', {
                            screen: 'PurposeWriteBoard',
                            params: {
                                purpose: purpose 
                            }
                        })
                    }}>수정</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={() => {
                        _purposeContolMenuRef.hide();

                        Request.delete(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${purpose.id}`)
                        .auth(authStore.userToken.token)
                        .submit()
                        .then((response) => {
                            PurposeService.getInstance().delete(purpose.id)
                            .then(() => {
                                data.refreshHome();
                                navigation.goBack();
                            })
                            .catch(e => {
                                console.log(e);
                            })
                        
                        })
                        .catch(e => {
                            console.log(e);
                        })


                    }}>삭제</MenuItem>
                </Menu>
            </View>
            <ParallaxScrollView
                backgroundColor={'rgb(0,0,0,0)'}
                fadeOutForeground={true}
                backgroundScrollSpeed={20}
                onChangeHeaderVisibility={(a) => {
                    setChangeHeaderVisibility(a);
                }}
                renderFixedHeader={() => {
                    return (
                        <View>
                            {!changeHeaderVisibility &&
                                <View style={{ overflow: 'visible', backgroundColor: 'white', height: 48, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, elevation: 5 }}>
                                    <ImageButton
                                        backgroundStyle={{
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        imageStyle={{
                                            width: 22,
                                            height: 20
                                        }}
                                        onPress={navigation.goBack}
                                        source={require('../../../../../../../asset/button/arrow_button.png')}
                                    />
                                    {isOwner &&
                                        <ImageButton
                                            backgroundStyle={{
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            imageStyle={{
                                                width: 23,
                                                height: 25
                                            }}
                                            onPress={() => {
                                                _purposeContolMenuRef.show();
                                            }}
                                            source={require('../../../../../../../asset/button/plan_write_button.png')}
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
                                source={{ uri: purpose.photoUrl }}
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
                            {purpose.name}
                        </Text>
                        <View style={{ alignSelf: 'flex-start', marginBottom: 20 }}>
                            <DecimalDayWidget stat={purpose.stat} decimalDay={purpose.leftDay} />

                        </View>
                        <Text style={detailPurposeStyles.purposeDescriptionFont}>
                            {purpose.description}
                        </Text>
                        <View style={detailPurposeStyles.purposeProfileContainer}>
                            <View>
                                <Image
                                    style={{ height: 40, width: 40, borderRadius: 40 }}
                                    source={{ uri: 'https://itcm.co.kr/files/attach/images/813/931/364/e2717f5d0ac1131302ff3eaba78f99ed.jpg' }}
                                />
                            </View>
                            <Text style={detailPurposeStyles.purposeAuthorNameFont}>
                                사용자
                        </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <InfoBox
                            title={'진행 중인 목표'}
                            detailButtonPress={() => {
                                navigation.navigate('DetailPlanList', {
                                    data: data
                                })
                            }}
                            detailButtonHint={'더보기'}
                            child={(
                                <View style={{ backgroundColor: '#F8F8F8', height: 300, paddingHorizontal: 10, marginTop: 10 }}>
                                    {
                                        data.purpose.detailPlans.map((goal) => (
                                            <View style={detailPurposeStyles.paperContainer}>
                                                <DetailPlanPaper
                                                    color={goal.color}
                                                    name={goal.name}
                                                    value={goal.achieve}
                                                    disabled={true}
                                                />
                                            </View>
                                        ))
                                    }
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <InfoBox
                            title={'스토리 타임라인'}
                            detailButtonPress={() => {
                                navigation.navigate('PurposeStories', {
                                    purpose : purpose
                                })
                            }}
                            detailButtonHint={'자세히보기'}
                            child={(<StoryTimeLine stories={data.storyTags} />)}
                        />
                    </View>
                </View>
            </ParallaxScrollView>
            <View style={{ position: 'absolute', bottom: 40, right: 22 }}>
                <ActinFloatingButton/>
            </View>
            <BottomBar data={data}/>
        </View>
    )
}

const detailPurposeStyles = StyleSheet.create({
    thumbnailImageContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.33,
    },
    purposeInfoContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20
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