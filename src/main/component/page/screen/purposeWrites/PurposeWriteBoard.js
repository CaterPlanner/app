import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, BackHandler, YellowBox, ToastAndroid, PixelRatio, Modal, TouchableOpacity, Text } from 'react-native'
import { inject, observer } from 'mobx-react'

import Carousel from 'react-native-snap-carousel';
import PurposeNameWrite from './PurposeNameWrite';
import PurposeDescriptionWrite from './PurposeDescriptionWrite';
import PurposePhotoWrite from './PurposePhotoWrite';
import PurposeDetailPlansWrite from './PurposeDetailPlansWrite';
import PurposeWriteDone from './PurposeWriteDone';

import ImageButton from '../../../atom/button/ImageButton'
import Loader from '../../Loader';

import PurposeService from '../../../../rest/service/PurposeService';
import Request from '../../../../util/Request';
import { PurposeWriteType, ResultState } from '../../../../AppEnum';
import GlobalConfig from '../../../../GlobalConfig';
import Purpose from '../../../../rest/model/Purpose';
import { useFocusEffect } from '@react-navigation/native';
import CaterPlannerResult from '../../../organism/CaterPlannerResult';
import AsyncStorage from '@react-native-community/async-storage';

const fullWidth = Dimensions.get('window').width;

YellowBox.ignoreWarnings = ([
    'Possible Unhandled Promise Rejection'
  ])


function SceneBackPressHandler({focus, unFocus}){
    useFocusEffect(
        React.useCallback(() => {
            focus();

            return () => unFocus();
        }, [])
    );

    return null;
}


const scopeNames = ['전체공개', '비공개']


@inject(stores => ({
    purposeWriteStore : stores.purposeWriteStore,
    authStore : stores.authStore,
    appStore : stores.appStore
}))
@observer
export default class PurposeWriteBoard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isUploading: false,
            isScopeSelecting : false
        }


        this.views = [
            <PurposeNameWrite key={0} index={0} />,
            <PurposeDescriptionWrite key={1} index={1}/>,
            <PurposePhotoWrite key={2} index={2} />,
            <PurposeDetailPlansWrite key={3} index={3}/>,
        ]
        this.purposeWriteStore = this.props.purposeWriteStore
        this.appStore = this.props.appStore;
        this.authStore = this.props.authStore;


        this.purposeWriteStore.start(this.views.length, this.props.route.params ? this.props.route.params.purpose : null, this.props.route.params.type);
    }

    async componentWillMount(){
        if(this.purposeWriteStore.writeType == PurposeWriteType.CREATE || this.purposeWriteStore.writeType == PurposeWriteType.FOLLOW || this.purposeWriteStore.writeType == PurposeWriteType.RISE){
            const count = await AsyncStorage.getItem("PURPOSE_COUNT");

            if(count >= 5){
            ToastAndroid.show('수행/대기 목적은 최대 5개까지 입니다.', ToastAndroid.LONG);
            this.props.navigation.goBack();
            }
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            item
        );
    }

    _uploadData = async () => {
        const result = this.purposeWriteStore.purpose;
        let response = null;


        try {
            switch (this.purposeWriteStore.writeType) {
                case PurposeWriteType.CREATE:
                case PurposeWriteType.FOLLOW:


                    response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    }, 60000)
                        .auth(await this.authStore.getToken())
                        .submit();

                    if(result.detailPlans.length != 0){
                        result.detailPlans.forEach((goal) => {
                            goal.purposeId = response.data.id;
                        })
                    }

                    await PurposeService.getInstance().create(
                        new Purpose(response.data.id, result.name, result.description, response.data.photoUrl, result.disclosureScope, result.startDate, result.endDate, result.stat),
                        result.detailPlans.length != 0 ? result.detailPlans : null
                    );
                    
                    

                    this.props.navigation.navigate('PurposeWriteDone', {
                        id : response.id
                    })


                    break;

                case PurposeWriteType.MODIFY:
      
                    response = await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.purposeWriteStore.purpose.id}`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    }, 60000)
                        .auth(await this.authStore.getToken())
                        .submit();

                    result.photoUrl = response.data.photoUrl;

                    await PurposeService.getInstance().modify(result.id, result);

                    this.props.navigation.navigate('HomeNavigation', {
                        screen : 'LoadMyPurpose',
                        params : {
                            id : result.id
                        }
                    });

                    break;

                case PurposeWriteType.GROUND_MODIFY:
                case PurposeWriteType.RETRY:
               
           
                    result.detailPlans.forEach((goal) => {
                        goal.purposeId = result.id;
                    })

                    response = await Request.put(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.purposeWriteStore.purpose.id}`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    }, 60000)
                        .auth(await this.authStore.getToken())
                        .submit();

                    result.photoUrl = response.data.photoUrl;

                    await PurposeService.getInstance().groundModify(result.id, result)

                    this.props.navigation.navigate('HomeNavigation');

                    break;


                case PurposeWriteType.RISE:

                    result.detailPlans.forEach((goal) => {
                        goal.purposeId = result.id;
                    })

                    response = await Request.put(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.purposeWriteStore.purpose.id}`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    }, 60000)
                        .auth(await this.authStore.getToken())
                        .submit();

                    result.photoUrl = response.data.photoUrl;

                    await PurposeService.getInstance().create(
                        result,
                        result.detailPlans.length != 0 ? result.detailPlans : null
                    );

                    this.props.navigation.navigate('HomeNavigation');

                    break;
            }



        } catch (e) {
            console.log(e);
            this.setState({
                isUploading : false,
                isTimeout : true,
            })
        }finally{
            this.backHandler.remove();
        }
    }

 
    

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <SceneBackPressHandler
                    focus={() =>{
                        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                            
                            if (this.purposeWriteStore.activeIndex != 0 && !this.state.isUploading) {
                                this.purposeWriteStore.previous(this.carousel);
                            } else {
                                return false;
                            }
                            return true;
                        })
                    }}
                    unFocus={() => {
                        this.backHandler.remove();
                    }}
                />
                {this.state.isUploading ? <Loader /> : 
                    this.state.isTimeout ? 
                    <CaterPlannerResult
                        state={ResultState.TIMEOUT}
                        reRequest={() => {
                            this.setState({
                                isUploading : true,
                                isTimeout : false
                            }, this._uploadData)
                        }}
                    /> :
                    (
                    <View style={{ flex: 1 }}>
                        <View style={styles.topContainer}>
                            {/* <PageStateText activeIndex={this.state.activeIndex + 1} endIndex={this.state.endIndex}/> */}
                            {this.purposeWriteStore.hasPrevious ?
                                <ImageButton
                                    source={
                                        require('../../../../../../asset/button/arrow_button.png')
                                    }

                                    backgroundStyle={{
                                        marginLeft: 7,
                                        width: 40, height: '100%'
                                        
                                    }}
                                    imageStyle={{
                                        width: 32,
                                        height: 37,
                                        tintColor: 'black'
                                    }}
                                    onPress={() => { this.purposeWriteStore.previous(this.carousel); }}
                                />
                                :
                                <ImageButton
                                    source={require('../../../../../../asset/button/exit_button.png')}
                                    backgroundStyle={{ 
                                        marginLeft: 7,
                                        width: 40, height: 40 }}
                                    imageStyle={{ width: 28, height: 28,tintColor: 'black' }}
                                    onPress={this.props.navigation.goBack}
                                />
                            }
                        </View>
                        <Modal
                            transparent={true}
                            visible={this.state.isScopeSelecting}
                        >
                            <TouchableOpacity style={{
                                backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end'
                            }}
                            onPress={() => {
                                this.setState({
                                    isScopeSelecting : false
                                })
                            }}
                            >
                                <View style={{ backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 15, borderTopRightRadius: 10,
                                borderTopLeftRadius: 10 }}>
                                    {
                                        scopeNames.map((scopeName, index) => {
                                            return (
                                                <TouchableOpacity style={{ paddingVertical: 10 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            isScopeSelecting : false
                                                        })
                                                        this.purposeWriteStore.purpose.disclosureScope = index;
                                                    }}
                                                >
                                                    <Text>{scopeName}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </TouchableOpacity>
                        </Modal>


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
                        <View style={{ position: 'absolute', 
                                top: Dimensions.get('window').height - (65 + PixelRatio.getPixelSizeForLayoutSize(9)), justifyContent:'space-between', alignItems:'center', flexDirection:'row', width: '100%', paddingHorizontal: 20}}>
                             <View>
                             {this.purposeWriteStore.activeIndex == 0 && 
                             <TouchableOpacity style={{ backgroundColor: 'white', height: 26, width: 90, justifyContent: 'center', borderRadius: 8, elevation: 2 }}
                                onPress={() => {
                                    this.setState({
                                        isScopeSelecting : true
                                    })
                                }}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    {scopeNames[this.purposeWriteStore.purpose.disclosureScope]}
                                </Text>
                            </TouchableOpacity>}
                            </View>

                            <ImageButton
                                backgroundStyle={{ backgroundColor: this.purposeWriteStore.isPermitNextScene ? '#25B046' : '#F1F1F1', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                                imageStyle={[
                                    (!this.purposeWriteStore.isLast ?
                                        { width: 42, height: 38, tintColor: 'black' } :
                                        {width: 35, height: 28, tintColor: 'black' }),
                                    { tintColor: this.purposeWriteStore.isPermitNextScene ? 'white': '#888888' }
                                ]}
                                source={
                                    !this.purposeWriteStore.isLast ?
                                        require('../../../../../../asset/button/next_button.png') :
                                        require('../../../../../../asset/button/check_button.png')
                                }
                                disabled={!this.purposeWriteStore.isPermitNextScene}
                                onPress={() => { 
                                    if(this.purposeWriteStore.isLast){
                                        this.setState({
                                            isUploading : true
                                        });
                                        this._uploadData();
                                    }else{
                                        this.purposeWriteStore.next(this.carousel);
                                    }}}
                            />
                        </View>
                
                        {/* <View style={{ position: 'absolute', bottom: 45, width: '100%', alignItmes: 'flex-end' }}>
                            <View style={{ alginSelf: 'center' }}>
                                <PageStateText activeIndex={this.purposeWriteStore.activeIndex + 1} endIndex={this.purposeWriteStore.endIndex} />
                            </View>
                        </View> */}
                    </View>
                )}
            </View>
        );
    }


}
/*
*/
const styles = StyleSheet.create({
    topContainer: {
        height : 53,
        alignItems: 'flex-start',
        justifyContent: 'center',

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