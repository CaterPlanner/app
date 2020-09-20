import React, {Component} from 'react';
import {View, FlatList, PixelRatio} from 'react-native';
import DetailPlanCheckBox from '../../../atom/checkbox/DetailPlanCheckbox';
import PurposeService from '../../../../rest/service/PurposeService';
import { inject } from 'mobx-react';
import Loader from '../../Loader';
import CaterPlannerResult from '../../../organism/CaterPlannerResult';
import { ResultState } from '../../../../AppEnum';

@inject(['authStore'])
export default class BriefingGoalList extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            isLoading : false,
            goals : props.route.params.activeGoals,
            isTimeout : false
        }

        this.updateGoalIdStat = new Array(this.state.goals.length);

        this.props.navigation.setParams({
            save : this.save
        })

        this.checkCount = 0;

    }

    _briefing = async () => {
        
        //addBrieifng이 아닌 update로 변경
        try{

            let updateGoalList = [];
            this.updateGoalIdStat.map((r, index) => {
                if(r)
                    updateGoalList.push(this.state.goals[index]);
            });


            const updatedPurpose = await PurposeService.getInstance().update(this.props.route.params.purpose, 
                updateGoalList , await this.props.authStore.getToken());


            this.props.route.params.acceptData(updatedPurpose);

            this.props.navigation.goBack();

        }catch(e){
            console.log(e);
            this.setState({
                isLoading : false,
                isTimeout : true
            })


        }
    }

    save = () => {
        if(this.state.isLoading)
            return;

        this.props.navigation.setParams({
            showHeader : false
        })

        this.setState({
            isLoading : true
        }, this._briefing);
    }

    componentDidUpdate(){
        if(this.state.goals.length == 0){
            this.props.navigation.goBack();
        }
    }

    render(){

        return this.state.isLoading ? <Loader style={{flex:1}}/> : 
            this.state.isTimeout ? 
            <CaterPlannerResult
                state={ResultState.TIMEOUT}
                reRequest={() => {


                    this.setState({
                        isLoading : true,
                        isTimeout : false
                    }, this._briefing)
                }}
            /> :
            (
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20}}
                data={this.state.goals}
                renderItem={({item, index}) => (
                    <View style={{ marginTop: 12}}>
                        <DetailPlanCheckBox
                            color={item.color}
                            name={item.name}
                            acheive={item.achieve}
                            onChange={() => {
                                this.updateGoalIdStat[index] = !this.updateGoalIdStat[index];
                                const isChecked = this.updateGoalIdStat[index];


                                if(isChecked){
                                    this.checkCount++;
                                    item.briefingCount++;
                                }else{
                                    this.checkCount--;
                                    item.briefingCount--;
                                }

                                this.setState({
                                    goals : this.state.goals
                                }, () => {
                                    
                                    if(this.checkCount == 0){
                                        this.props.navigation.setParams({isCanSubmit : false})
                                    }else if(this.checkCount == 1){
                                        this.props.navigation.setParams({isCanSubmit : true})
                                    }
                                })

                            }}
                        />
                    </View>
                )}
            />)
    }



}
