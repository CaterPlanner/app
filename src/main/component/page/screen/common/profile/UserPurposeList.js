import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Request from '../../../../../util/Request';
import GlobalConfig from '../../../../../GlobalConfig';
import Loader from '../../../Loader';
import { inject } from 'mobx-react';
import PurposePaper from '../../../../atom/button/PurposePaper';

@inject(['authStore'])
export default class UserPurposeList extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading : true
        }

        this.authStore = this.props.authStore;
    }

    _loadData = async () => {
        try{
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/${this.props.route.params.id}/purposes`)
            .auth(await this.authStore.getToken())
            .submit();
        
            this.setState({
                isLoading : false,
                data: response.data
            })
        }catch(e){
            console.log(e);
            this.props.navigation.goBack();
        }
    }

    componentDidMount(){
        this._loadData();
    }

    render(){
        return(
            <View style={{flex: 1}}>
                {this.state.isLoading ? <Loader/> : (
                    <View style={{paddingRight: 10, paddingLeft: 2, paddingVertical: 10}}>
                    {this.state.data.map((purpose) => (
                        <View style={{ paddingVertical: 5}}>
                            <PurposePaper
                                imageUri={purpose.photoUrl}
                                name={purpose.name}
                                checkedBriefing={false}
                                onPress={() => {
                                    this.props.navigation.push('LoadUserPurpose', {
                                        id : purpose.id
                                    })
                                }}
                            />
                        </View>
                    ))}
                </View>
                )}
            </View>
        )
    }
}
