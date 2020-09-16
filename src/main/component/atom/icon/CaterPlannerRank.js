import React from 'react';
import {View, Image} from 'react-native';
import { State } from '../../../AppEnum';

export default function CaterPlannerRank({purpose, style}){
    
    let resource;
    if(purpose.stat == State.SUCCEES){
        resource = require('../../../../../asset/icon/caterpillar-5rank.png')
    }else if(purpose.stat == State.WAIT){
        resource = require('../../../../../asset/icon/caterpillar-0rank.png');
    }else if(purpose.achieve >= 0 && purpose.achieve < 10){
        resource = require('../../../../../asset/icon/caterpillar-1rank.png');
    }else if(purpose.achieve >= 10 && purpose.achieve < 40){
        resource = require('../../../../../asset/icon/caterpillar-2rank.png');
    }else if(purpose.achieve >= 40 && purpose.achieve < 70){
        resource = require('../../../../../asset/icon/caterpillar-3rank.png');
    }else if(purpose.achieve >= 70 && purpose.achieve <= 100){
        resource = require('../../../../../asset/icon/caterpillar-4rank.png');
    }
    
    return <Image
    resizeMode="stretch"
        style={style}
        source={resource}
    />
}