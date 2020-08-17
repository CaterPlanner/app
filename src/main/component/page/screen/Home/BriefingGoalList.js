import React, {Component} from 'react';
import {View} from 'react-native';
import DetailPlanCheckBox from '../../../atom/checkbox/DetailPlanCheckbox';


export default class BriefingGoalList extends Component{

    render(){
        return(
            <View style={{flex : 1, alignItems : 'center', paddingHorizontal: 10}}>
            <DetailPlanCheckBox
                color={'red'}
                name={'hello'}
            />
        </View>
        )
    }

}


