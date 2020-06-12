import React, { Component } from 'react'
import {View, Text} from 'react-native'
import PlanIcon from '../../../atom/button/PlanIcon'
import Stack from '../../../../util/Stack';

export default class DetailPlanState extends Component{

    constructor(props){
        super(props);  

        console.log(this._arragePlanAsNextLevel());
    }
    
    _addLevelToLevelArray(array, level){
        array = [
            ...array,
            {
                level : level,
                floor : 0,
                elements : []
            }
        ]
        return array;
    }
    _arragePlanAsNextLevel = () =>{
        const children = this.props.children;
        let levelArray = [];
        const stack = new Stack();

        stack.push(children);
        while(stack.isEmpty()){
            let element = stack.pop();
            let level;
            let successors;
            
            if(element.key){
                level = element.key.length + 1 / 2;
                if(!levelArray[level - 1]){
                    levelArray = this._addLevelToLevelArray(levelArray, level);
                }

                levelArray[level - 1].successors = [
                    ...levelArray[level - 1].successors,
                    {
                        key: element.key,
                        top: (levelArray[level - 1].floor + 1) * 200
                    }
                ]
                
                levelArray[level - 1].floor++;

                successors = element.successors;
            }else{ //ROOT
                successors = element;
            }

            for(let i = successors.length - 1; i >= 0; i--){
                stack.push(successors[i]);
            }

            if(!element.successors.length && !level){ //ROOT가 아니고 successor가 없는 경우
                if(!levelArray[level])
                    levelArray = this._addLevelToLevelArray(levelArray, level + 1);
                levelArray[level].floor++;
            }
        }     
        return levelArray;
    }

    _renderDetilPlansIcon = () => {

        return this._arragePlanAsNextLevel().map((level) => {
            return (
                <View>
                    {level.elements.map((detailPlanIcon) => {
                        return detailPlanIcon;
                    })}
                </View>
            )
        })
    }

    render(){
        
        return(
            <ScrollVew horizontal={true} style={{flex:1}}>
                {this._renderDetilPlansIcon}
            </ScrollVew>
        );
    }
}