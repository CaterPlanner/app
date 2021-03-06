// import React, { Component } from 'react'
// import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native'
// import Carousel from 'react-native-snap-carousel';
// import PageStateText from '../../../atom/text/PageStateText'

// import PurposeService from '../../../../rest/service/PurposeService';
// import DecimalDayWidget from '../../../atom/icon/DecimalDayWidget';
// import { inject, observer } from 'mobx-react';
// import { PurposeWriteType, State } from '../../../../AppEnum';
// import ImageButton from '../../../atom/button/ImageButton';
// import { useNavigation } from '@react-navigation/native';
// import Purpose from '../../../../rest/model/Purpose';
// import GlobalConfig from '../../../../GlobalConfig';
// import useStores from '../../../../mobX/helper/useStores';
// import Request from '../../../../util/Request';
// import SplashScreen from 'react-native-splash-screen';
// import CaterPlannerRank from '../../../atom/icon/CaterPlannerRank';
// import UITutorial from '../tutorial/UITutorial'
// import AsyncStorage from '@react-native-community/async-storage';


// const fullWidth = Dimensions.get('window').width;

// function CardDecimalDayWidget({ purpose }) {

//     const decimalDay = purpose.leftDay;

//     let text;
//     let color;


//     switch (purpose.stat) {
//         case 0:
//             if(!purpose.isProcceedEnd){
//                 text = (decimalDay == 0 ? 'FinalDay' : 'D - ' + decimalDay);
//             }else{
//                 text = purpose.isSucceeseProceed ? '수행완료' : '수행실패'
//             }
//             break;
//         case 1:
//             text = '대기'
//             break;
//         case 2:         
//             text = '성공'
//             break;
//         case 3:
//             text = '실패'
//             break;
//     }

 

    

//     return (
//         <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }}>
//         {text}
//         </Text>
//     )
// }


// function EmptyCard({ onPress }) {
//     return (
//         <TouchableOpacity style={{
//             height: '100%', justifyContent: 'center', width: 300
//         }} onPress={onPress}>
//             <View style={[cardStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', elevation: 0 }]}>
//                 <View style={{ width: 110, height: 110, justifyContent: 'center', alignItems: 'center' }}>
//                     <Image
//                         resizeMode="stretch"
//                         style={{ flex: 1, height: undefined, width: '100%' }}
//                         source={require('../../../../../../asset/button/plus_button.png')}
//                     />
//                 </View>
//                 <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40 }}>
//                     새로운 목적을 추가해보세요
//                 </Text>
//             </View>
//         </TouchableOpacity>
//     )
// }

// function ActiveCard({ purpose, onPress, loadData }) {

//     const navigation = useNavigation();
//     const { authStore } = useStores();


//     const sendResult = async (stat) => {
//         try {

//             await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${purpose.id}/update`, JSON.stringify({
//                 stat: stat
//             }))
//                 .auth(await authStore.getToken())
//                 .submit();

//             await PurposeService.getInstance().delete(purpose.id);

//             loadData();

//         } catch (e) {
//             console.log(e);
//         }
//     }


//     return (
//         <TouchableOpacity style={{
//             height: '100%', justifyContent: 'center'
//         }} activeOpacity={1} onPress={onPress}>

//             <View style={[cardStyles.container, {elevation : purpose.isFailProceed || purpose.stat == State.WAIT ? 0 : 3}]}
//             >
//                 <View style={{
//                     flex: 1,
//                 }}>
//                     <View style={{ position: 'absolute', top: 12, right: 12, paddingBottom: 2,
//                     borderBottomWidth: 1, borderBottomColor: 'gray'
                   
//                 }}>
//                         <CardDecimalDayWidget purpose={purpose} />
//                     </View>
//                     <View style={{ flex: 1, justifyContent: 'center', 
//                     borderBottomWidth : 1, borderBottomColor: '#F3F3F3'
//                 }}>
//                         <Text
//                             adjustsFontSizeToFit
//                             numberOfLines={2}
//                             style={{
//                                 textAlign: 'center',
//                                 fontSize: 16,
//                             }}>
//                             {purpose.name}
//                         </Text>
//                     </View>
     
//                 </View>
//                 <View style={{
//                     flex: 2.5,
//                     borderTopRightRadius: 5,
//                     borderTopLeftRadius: 5,
//                 }}>
//                     <Image
//                         source={{ uri: purpose.photoUrl }}
//                         style={{
//                             flex: 1, width: "100%", height: undefined, borderBottomRightRadius: 5,
//                             borderBottomLeftRadius: 5,
//                         }}
//                     />
//                         <View style={{ position: 'absolute', right: 8, top: -30}}>
//                             <CaterPlannerRank
//                                 purpose={purpose}
//                                 style={{
//                                     width: 60,
//                                     height: 60,
//                                 }}
//                             />
//                         </View>
//                 </View>
//                 {(purpose.stat == State.WAIT || purpose.isFailProceed) &&
//                     <View style={[cardStyles.container, { right: 0, heigth: '100%', width: '100%', margin: 0, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)' }]} />
//                 }


//                 {(purpose.stat == State.WAIT || purpose.isFailProceed) &&
//                     <View style={{ position: 'absolute', elevation: 10, left: 116, top: 70 }} >
//                         <ImageButton
//                             imageStyle={{
//                                 width: 80,
//                                 height: 100
//                             }}
//                             source={require('../../../../../../asset/button/start_button.png')}
//                             onPress={async () => {

//                                 navigation.navigate('CreateNavigation', {
//                                     screen: 'PurposeWriteBoard',
//                                     params: {
//                                         purpose: Purpose.clone(purpose),
//                                         type: PurposeWriteType.RETRY
//                                     }
//                                 })
//                             }}
//                         />
//                     </View>
//                 }

//                 {purpose.isSucceeseProceed &&
//                     <View style={{ position: 'absolute', elevation: 10, left: 116, top: 70 }} >
//                         <ImageButton
//                             imageStyle={{
//                                 width: 80,
//                                 height: 100
//                             }}
//                             source={require('../../../../../../asset/button/start_button.png')}
//                             onPress={() => {

//                                 Alert.alert(null, '목적 수행이 완료되었습니다',
//                                     [
//                                         {
//                                             text: '다음에 결정',
//                                             style: 'cancel',
//                                         },
//                                         {
//                                             text: "실패",
//                                             onPress: () => {
//                                                 sendResult(State.FAIL)
//                                             }
//                                         },
//                                         {
//                                             text: "성공",
//                                             onPress: () => {
//                                                 sendResult(State.SUCCEES)
//                                             }
//                                         }
//                                     ])
//                             }}
//                         />
//                     </View>
//                 }
//             </View>
//         </TouchableOpacity>
//     )
// }


// const cardStyles = StyleSheet.create({
//     container: {
//         borderTopRightRadius: 5,
//         borderTopLeftRadius: 5,
//         borderBottomStartRadius: 5,
//         borderBottomEndRadius: 5,
//         backgroundColor: '#ffffff',
//         height: 440,
//         margin: 3,
//     },
// })

// @inject(['appStore'])
// @observer
// export default class Home extends Component {


//     constructor(props) {
//         super(props)

//         this.state = {
//             activeIndex: 0,
//             isLoading: true
//         }

//         this.appStore = this.props.appStore;

//     }
//     //
//     _renderItem = ({ item, index }) => {
//         return (
//             <ActiveCard purpose={item} loadData={this._loadData}
//                 onPress={() => {
//                     this.props.navigation.push('LoadMyPurpose', {
//                         id: item.id,
//                         refreshHome: this._loadData
//                     })
//                 }} />
//             // <EmptyCard/>
//         )
//     }


//     _loadData = async () => {
//         try {
//             await PurposeService.getInstance().refresh();

//             const data = await PurposeService.getInstance().findPurposesForCard();


//             let hasSuccees = false;
//             let hasFailed = false;

//             if (data) {
//                 data.forEach((purpose) => {
//                     if (purpose.isFailProceed)
//                         hasFailed = true;
//                     if (purpose.isSucceeseProceed)
//                         hasSuccees = true;
//                 });

//                 if (hasSuccees)
//                     Alert.alert(null, '수행을 완료한 목적이 있습니다.')
//                 if (hasFailed)
//                     Alert.alert(null, '수행을 실패한 목적이 있습니다.');


                
//             }

//             await AsyncStorage.setItem("PURPOSE_COUNT" , (data ? data.length : 0).toString())

//             this.setState({
//                 activeIndex: 0,
//                 endIndex: data ? data.length : 0,
//                 data: data,
//                 isLoading: false
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     }


//     componentDidMount() {

//         this.props.navigation.addListener('focus', () => {
//             this.setState({
//                 isLoading: true
//             }, this._loadData);
//         });
//         setTimeout(() => {
//             SplashScreen.hide();
//         }, 500);

   

//     }

//     componentWillUnmount() {
//         this.props.navigation.removeListener('focus');
//     }

//     render() {

//         return (
//             <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
//                 {!this.state.isLoading &&
//                     <View style={{ flex: 1 }}>
//                         <Modal
//                         transparent={true}
//                         visible={this.appStore.isStart}
//                 >
//                     <UITutorial
//                         finish={() => {
//                             this.appStore.setIsStart(false);
//                         }}
//                     />
//                 </Modal>
//                         <View style={{ flex: 11, justifyContent: 'center' }}>
//                             <View style={{ alignItems: 'center' }}>
//                                 {!this.state.data || this.state.data.length == 0 ?
//                                     <EmptyCard
//                                         onPress={() => {
//                                             this.props.navigation.navigate('CreateNavigation', {
//                                                 screen: 'PurposeWriteBoard',
//                                                 params: {
//                                                     type: PurposeWriteType.CREATE
//                                                 }
//                                             })
//                                         }}
//                                     /> :
//                                     <Carousel
//                                         ref={(ref) => { this.carousel = ref; }}
//                                         data={this.state.data}
//                                         renderItem={this._renderItem}
//                                         scrollEnabled={true}
//                                         sliderWidth={fullWidth}
//                                         itemWidth={300}
//                                         onSnapToItem={
//                                             index => this.setState({ activeIndex: index })}
//                                         hasParallaxImages={true}
//                                     />
//                                 }
//                             </View>
//                         </View>
//                         <View style={{ justifyContent: 'flex-start', flex: 1 }}>
//                             {this.state.data && this.state.data.length != 0 &&
//                                 <PageStateText
//                                     activeIndex={this.state.activeIndex + 1}
//                                     endIndex={this.state.endIndex}
//                                 />
//                             }
//                         </View>
//                     </View>}
//             </View>



//         );
//     }
// }



import React, { Component } from 'react'
import { View, Dimensions, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, PixelRatio } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PageStateText from '../../../atom/text/PageStateText'

import PurposeService from '../../../../rest/service/PurposeService';
import { inject, observer } from 'mobx-react';
import { PurposeWriteType, State } from '../../../../AppEnum';
import ImageButton from '../../../atom/button/ImageButton';
import { useNavigation } from '@react-navigation/native';
import Purpose from '../../../../rest/model/Purpose';
import GlobalConfig from '../../../../GlobalConfig';
import useStores from '../../../../mobX/helper/useStores';
import Request from '../../../../util/Request';
import SplashScreen from 'react-native-splash-screen';
import CaterPlannerRank from '../../../atom/icon/CaterPlannerRank';
import UITutorial from '../tutorial/UITutorial'
import AsyncStorage from '@react-native-community/async-storage';
import normalize from '../../../../util/noramlize';
import PageStateIcon from '../../../atom/icon/PageStateIcon';



const fullWidth = Dimensions.get('window').width;

function CardDecimalDayWidget({ purpose }) {

    const decimalDay = purpose.leftDay;

    let text;
    let color;


    switch (purpose.stat) {


        case 0:
            
            if (!purpose.isProcceedEnd) {
                text = (decimalDay == 0 ? 'FinalDay' : 'D - ' + decimalDay);
            } else {
                text = purpose.isSucceeseProceed ? '수행완료' : '수행실패'
            }
            break;
        case 1:
            text = '대기'
            break;
        case 2:
            text = '성공'
            break;
        case 3:
            text = '실패'
            break;
    }





    return (
        <Text style={{ color: '#25B046', fontSize: 12 / PixelRatio.getFontScale(), textAlign: 'center' }}>
            {text}
        </Text>
    )
}


function EmptyCard({ onPress }) {
    return (
        <TouchableOpacity style={{
            height: '100%', justifyContent: 'center', width: PixelRatio.getPixelSizeForLayoutSize(110)
        }} onPress={onPress}>
            <View style={[cardStyles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', elevation: 0 }]}>
                <View style={{ width: PixelRatio.getPixelSizeForLayoutSize(30), height: PixelRatio.getPixelSizeForLayoutSize(30), justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        resizeMode="stretch"
                        style={{ flex: 1, height: undefined, width: '100%', tintColor: '#292929' }}
                        source={require('../../../../../../asset/button/plus_button.png')}
                    />
                </View>
                <Text style={{ fontSize: 20 / PixelRatio.getFontScale(), fontWeight: 'bold', marginTop: PixelRatio.getPixelSizeForLayoutSize(15) }}>
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
                justifyContent: 'center',
            }} activeOpacity={1} onPress={onPress}>

                <View style={[cardStyles.container, { elevation: purpose.isFailProceed || purpose.stat == State.WAIT ? 0 : 3 }]}
                >
                    <View style={{
                        flex: 1,
                    }}>

                        <Image
                            source={{ uri: purpose.photoUrl }}
                            style={{
                                flex: 1, width: "100%", height: undefined, borderTopRightRadius: 5,borderTopLeftRadius: 5,
                            }}
                        />
                        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'flex-start', paddingBottom: 15, paddingHorizontal: 15}}>
                        <View
                                style={{borderTopLeftRadius:20, borderTopRightRadius:20, position:'absolute', top:-20, left:0, height: 20, width: normalize(290), backgroundColor:'white'}}
                            />
                            <View style={{ position: 'absolute', right: 8, top: -50}}>
                            <CaterPlannerRank
                                purpose={purpose}
                                style={{
                                    width: 60,
                                    height: 60,
                                            }}
                                />
                            </View>
                            {/* <Text style={{fontSize: 12, color: 'gray'}}> 
                                목적
                            </Text> */}
                            <Text 
                                numberOfLines={2}
                                style={{
                                    textAlign: 'center',
                                    fontSize: 25,
                                    marginBottom: normalize(10, 'height')
                                }}>
                                {purpose.name}
                            </Text>
                            <View style={{flex:1}}/>
                            <CardDecimalDayWidget purpose={purpose} />
                        </View>

                        {(purpose.stat == State.WAIT || purpose.isFailProceed) &&
                            <View style={[cardStyles.container, { right: 0, heigth: '100%', width: '100%', margin: 0, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)' }]} />
                        }


                        {(purpose.stat == State.WAIT || purpose.isFailProceed) &&
                            <View style={cardStyles.actionButtonContainer} >
                                <ImageButton
                                    imageStyle={cardStyles.actionButton}
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
                            <View style={cardStyles.actionButtonContainer} >
                                <ImageButton
                                    imageStyle={cardStyles.actionButton}
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
                    </View></View>
            </TouchableOpacity>
           
    )
}


const cardStyles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#ffffff',
        height: normalize(400, 'height')
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10
    },
    caterpillarRankContainer: {
        position: 'absolute', right: 5, top: -35
    },
    decimalDayContianer: {

    },
    actionButtonContainer: {
        position: 'absolute', elevation: 10, left: normalize(140) - (80 / 3), top: normalize(200, 'height') - (100 / 2)
    },
    actionButton: {
        width: 80,
        height: 100
    }
})

@inject(['appStore'])
@observer
export default class Home extends Component {


    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0,
            isLoading: true
        }

        this.appStore = this.props.appStore;

    }
    //
    _renderItem = ({ item, index }) => {
        return (
            <ActiveCard purpose={item} loadData={this._loadData}
                onPress={() => {
                    this.props.navigation.push('LoadMyPurpose', {
                        id: item.id,
                        refreshHome: this._loadData
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



            }

            await AsyncStorage.setItem("PURPOSE_COUNT", (data ? data.length : 0).toString())

            this.setState({
                activeIndex: 0,
                endIndex: data ? data.length : 0,
                data: data,
                isLoading: false
            });
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {

        this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading: true
            }, this._loadData);
        });
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);


    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <Modal
                    transparent={true}
                    visible={this.appStore.isStart}
                >
                    <UITutorial 
                        finish={() => {
                            this.appStore.setIsStart(false);
                         }}
                    />
                </Modal>
                {!this.state.isLoading &&
                    <View style={{flex : 1, justifyContent:'flex-start'}}>
                        <View style={{ paddingVertical: normalize(40, 'height') }}>
                            {this.state.data && this.state.data.length > 1 &&
                                <PageStateIcon
                                    current={this.state.activeIndex}
                                    max={this.state.endIndex}
                                    selectColor={'#00B412'}
                                    unselectColor={'#888888'}
                                    iconStyle={{
                                        width: 4.5,
                                        height: 4.5
                                    }}
                                />
                            }
                        </View>
                        <View style={{height : normalize(402, 'height'), justifyContent: 'center', alignItems: 'center'}}>
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
                                itemWidth={normalize(290)}
                                onSnapToItem={
                                    index => this.setState({ activeIndex: index })}
                                hasParallaxImages={true}
                            />
                        }
                        </View>
                    </View>}
            </View>



        );
    }
}



