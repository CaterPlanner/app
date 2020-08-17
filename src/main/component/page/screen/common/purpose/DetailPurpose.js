import React from 'react';
import { View, Image, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import InfoBox from '../../../../molecule/InfoBox';
import DetailPlanPaper from '../../../../atom/button/DatePlanPaper'
import EasyDate from '../../../../../util/EasyDate';


function StoryBox({ type, text }) {
    return (
        <View style={{flexDirection : 'row', alignItems:'center', paddingVertical : 10}}>
            <View style={{position : 'absolute', left: -15, width:30, height:30, borderRadius: 30, backgroundColor:'#E5E5E5', justifyContent: 'center', alignItems:'center'}}>
                <Image
                     source={require('../../../../../../../asset/icon/story_vlog_icon.png')}
                     resizeMode="stretch"
                     style={{width : 20, height: 20}}
                />
            </View>
            <Text style={{marginLeft : 30}}>
                {text}
            </Text>
        </View>
    )
}

function StoryTag({date }) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical : 5}}>
            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, width :30, height: 1, marginRight: 8}}/>
            <Text>{date.toStringDateByView()}</Text>
        </View>
    )
}

function StoryTimeLine({ stories }) {

    let beforeDate = null;

    return (
        <View style={{ flexDirection : 'row', height: 500, width: '100%', backgroundColor: 'white' }}>
            <View style={{ marginLeft: 29, height: '100%', width: 1, backgroundColor: 'black'}} />
            <View style={{marginTop : 5}}>
                {
                    stories.map((story) => {
                        let dateChange = false;
                        if(beforeDate != null)
                        console.log(beforeDate.toStringDateByView() + '   ' + story.createDate.toStringDateByView() +  "  " + beforeDate.equalsDate(story.createDate));
                        if(beforeDate === null || !beforeDate.equalsDate(story.createDate)){
                            beforeDate = story.createDate;
                            dateChange = true;
                        }
                        return(
                            <View>
                                {dateChange && <StoryTag date={story.createDate}/>}
                                <StoryBox text={story.title}/>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default function DetailPurpose({ purpose }) {

    purpose = {
        name: '해상 라이프가드 되기',
        description: '바다의 구조자가 되기 위한 노력을 할것입니다. 왜냐하면 동해물과 백두산이 마르고 닳도록',
        storiesHeader: [
            {
                id: 0,
                title: '역시 수업듣는게 제일 싫닼ㅋㅋㅋ',
                type: 0,
                createDate: new EasyDate('2020-08-12')
            },
            {
                id: 1,
                title: '아 달리기 완전 숨차 버리죠 ㅋㅋㅋ',
                type: 0,
                createDate: new EasyDate('2020-08-12')
            },
            {
                id: 2,
                title: '히히히',
                type: 0,
                createDate: new EasyDate('2020-08-11')
            },
            {
                id: 3,
                title: '히히히',
                type: 0,
                createDate: new EasyDate('2020-08-10')
            }
        ]
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={detailPurposeStyles.thumbnailImageContainer}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Sans_undertale.jpg/220px-Sans_undertale.jpg' }}
                    resizeMode="stretch"
                    style={{ flex: 1, width: "100%", height: undefined }}
                />
            </View>
            <View style={detailPurposeStyles.purposeInfoContainer}>
                <Text style={detailPurposeStyles.purposeNameFont}>
                    {purpose.name}
                </Text>
                <Text>
                    {purpose.description}
                </Text>
            </View>
            <View style={{ marginTop: 5 }}>
                <InfoBox
                    title={'진행 중인 목표'}
                    detailButtonPress={() => {
                        console.log('go to 진행 중인 목표 더보기')
                    }}
                    detailButtonHint={'더보기'}
                    child={(
                        <View style={{ backgroundColor: '#F8F8F8', height: 300, paddingHorizontal: 10, marginTop: 5 }}>
                            <View style={detailPurposeStyles.paperContainer}>
                                <DetailPlanPaper
                                    color={'#F8C2C2'}
                                    name={'라이프가드 자격증 공부'}
                                    value={90}
                                    disabled={true}
                                />
                            </View>
                            <View style={detailPurposeStyles.paperContainer}>
                                <DetailPlanPaper
                                    color={'#F8C2C2'}
                                    name={'라이프가드 자격증 공부'}
                                    value={90}
                                    disabled={true}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={{ marginTop: 5 }}>
                <InfoBox
                    title={'스토리 타임라인'}
                    detailButtonPress={() => {
                        console.log('go to 진행 중인 목표 더보기')
                    }}
                    detailButtonHint={'자세히보기'}
                    child={(<StoryTimeLine stories={purpose.storiesHeader} />)}
                />
            </View>
        </ScrollView>
    )
}

const detailPurposeStyles = StyleSheet.create({
    thumbnailImageContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.33,
        backgroundColor: 'red'
    },
    purposeInfoContainer: {
        width: '100%',
        backgroundColor: 'white'
    },
    purposeNameFont: {
        fontSize: 20,
        textAlign: 'left',
        paddingTop: 30,
        fontWeight: 'bold',
        paddingBottom: 8
    },
    paperContainer: {
        marginBottom: 5
    }

})