import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native'
import { inject, observer } from 'mobx-react'

import Carousel from 'react-native-snap-carousel';
import PurposeNameWrite from './PurposeNameWrite';
import PurposeDescriptionWrite from './PurposeDescriptionWrite';
import PurposePhotoWrite from './PurposePhotoWrite';
import PurposeDetailPlansWrite from './PurposeDetailPlansWrite';
import PurposeWriteDone from './PurposeWriteDone';

import ImageButton from '../../../atom/button/ImageButton'
import PageStateText from '../../../atom/text/PageStateText'
import Loader from '../../Loader';

import PurposeService from '../../../../rest/service/PurposeService';
import Request from '../../../../util/Request';
import { PurposeWriteType } from '../../../../mobX/store/PurposeWriteStore';
import GlobalConfig from '../../../../GlobalConfig';

const fullWidth = Dimensions.get('window').width;

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
            <PurposeNameWrite />,
            <PurposeDescriptionWrite />,
            <PurposePhotoWrite />,
            <PurposeDetailPlansWrite />,
        ]
        this.purposeWriteStore = this.props.purposeWriteStore
        this.appStore = this.props.appStore;
        this.authStore = this.props.authStore;


        this.purposeWriteStore.start(this.views.length, this.props.route.params ? this.props.route.params.purpose : null);
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

                    response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(authStore.userToken.token)
                        .submit();

                    await PurposeService.getInstance().create(
                        new Purpose(response.data.id, result.name, result.description, response.data.photoUrl, result.disclosureScope, result.startDate, result.endDate, result.stat),
                        result.detailPlans ?
                            result.detailPlans.forEach((goal) => {
                                goal.purposeId = response.data.id;
                                goal.briefingCount = 0;
                            }) : null
                    );


                    break;

                case PurposeWriteType.MODIFY:

                    response = await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${this.purposeWriteStore.purpose.id}`, this.purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(this.authStore.userToken.token)
                        .submit();

                    result.photoUrl = response.photoUrl;

                    await PurposeService.getInstance().modify(result.id, result);

                    break;

                case PurposeWriteType.GROUND_MODIFY:

                    response = await Request.put(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/purpose/' + purposeWriteStore.purpose.id, purposeWriteStore.resultFormData, {
                        'Content-Type': 'multipart/form-data'
                    })
                        .auth(this.authStore.userToken.token)
                        .submit();

                    result.photoUrl = response.photoUrl;

                    await PurposeService.getInstance().groundModify(result.id, result);

                    break;
            }

            if (result.stat == 0)
                this.appStore.onScheduler();

            this.backHandler.remove();

            if(this.purposeWriteStore.writeType == PurposeWriteType.CREATE){
                this.props.navigation.navigate('PurposeWriteDone')
            }else{
                this.props.navigation.goBack();
            }

        } catch (e) {
            console.log(e);
            this.setState({
                isUploading : false
            })
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

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {this.state.isUploading ? <Loader /> : (
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
                                    onPress={() => { this.purposeWriteStore.previous(this.carousel); }}
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
                                        { width: 18, height: 28, marginLeft: 5 } :
                                        { width: 40, height: 40 }),
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