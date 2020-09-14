import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, BackHandler, YellowBox, KeyboardAvoidingView } from 'react-native'
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
import { PurposeWriteType } from '../../../../AppEnum';
import GlobalConfig from '../../../../GlobalConfig';
import Purpose from '../../../../rest/model/Purpose';
import NotificationManager from '../../../../util/NotificationManager';
import { useFocusEffect } from '@react-navigation/native';

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
            isUploading: false
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

    _renderItem = ({ item, index }) => {
        return (
            item
        );
    }

    _uploadData = async () => {
        const result = this.purposeWriteStore.purpose;
        let response = null;


        console.log(this.purposeWriteStore.activeIndex)

        try {
            switch (this.purposeWriteStore.writeType) {
                case PurposeWriteType.CREATE:
                case PurposeWriteType.FOLLOW:


                    response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
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
                    })
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
                        goal.briefingCount = 0;
                        goal.lastBriefingDate = null;
                        goal.purposeId = result.id;
                    })

                    response = await Request.put(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.purposeWriteStore.purpose.id}`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(await this.authStore.getToken())
                        .submit();

                    result.photoUrl = response.data.photoUrl;

                    await PurposeService.getInstance().groundModify(result.id, result)

                    this.props.navigation.navigate('HomeNavigation');

                    break;
            }

            this.backHandler.remove();
            this._newBriefingAlarm();


        } catch (e) {
            console.log(e);
            this.setState({
                isUploading : false
            }, () => this.carousel._snapToItem(this.purposeWriteStore.activeIndex))
        }
    }

    _newBriefingAlarm = async () => {
        for(goal of this.purposeWriteStore.purpose.detailPlans){
            if(goal.isNowBriefing){
                NotificationManager.briefingAlarmShow();
                return;
            }
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
                {this.state.isUploading ? <Loader /> : (
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
                                        width: 40, height: 40
                                        
                                    }}
                                    imageStyle={{
                                        width: 30,
                                        height: 35,
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
                        <View style={{ position: 'absolute', top: Dimensions.get('window').height - 115, right: 22}}>
                            <ImageButton
                                backgroundStyle={{ backgroundColor: this.purposeWriteStore.isPermitNextScene ? '#2CBD4F' : '#F1F1F1', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                                imageStyle={[
                                    (!this.purposeWriteStore.isLast ?
                                        { width: 42, height: 38, tintColor: 'black' } :
                                        {width: 35, height: 28, tintColor: 'black' }),
                                    { tintColor: this.purposeWriteStore.isPermitNextScene ? undefined : '#888888' }
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
        height : 50,
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