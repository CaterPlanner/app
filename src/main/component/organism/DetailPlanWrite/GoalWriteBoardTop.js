import React from 'react'
import { View, ScrollView } from 'react-native'
import GoalIcon from '../../atom/button/GoalIcon'


const OUTER_MARGIN = 20;

const ICON_WIDTH_INTERVAL = 15;
const ICON_HEIGHT_INTERVAL = 10;
const ICON_WIDTH = 120;
const ICON_HEIGHT = 25;

export default function DetailPlanState({detailPlanTreeStore}){

    const data = detailPlanTreeStore.currentTopViewData;

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                    {
                        data.floorArray.map((floorObj, floorObjIndex) => {
                            <View style={{
                                marginTop : floorObjIndex == 0 ? OUTER_MARGIN : 0,
                                marginBottom : floorObjIndex == data.length - 1 ? OUTER_MARGIN : ICON_HEIGHT_INTERVAL}}
                            >
                                {
                                    floorObj.elements.map((element, elementIndex) => {
                                        const goal = detailPlanTreeStore.getDetailPlan(element.key);
                                        return(
                                            <View style={
                                                {
                                                    marginLeft : elementIndex != 0 ? ICON_WIDTH_INTERVAL : 
                                                    (() => {
                                                        if(element.pos == 0){
                                                            return OUTER_MARGIN;
                                                        }else{
                                                            return OUTER_MARGIN + (element.pos) * ICON_WIDTH + (element.pos - 1) * ICON_WIDTH_INTERVAL;
                                                        }
                                                    })(), 
                                                    marginRight: (elementIndex == floorObj.elements.length - 1 ? OUTER_MARGIN : ICON_WIDTH_INTERVAL)
                                                }
                                                }>
                                                 <GoalIcon text={goal.name} color={goal.color} 
                                                 width={(() => {
                                                    if(element.pos != data.maxPos){
                                                        let diff = data.maxPos - element.pos;
                                                        return (diff + 1) * ICON_WIDTH + diff * ICON_WIDTH_INTERVAL;
                                                    }else{
                                                        return ICON_WIDTH;
                                                    }                                                    
                                                 })()} 
                                                 height={ICON_HEIGHT}
                                                 onPress={() => {detailPlanTreeStore.changeActiveShowKey(detailPlan.key);}} 
                                                />
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        })
                    
                    }
                </ScrollView>
            </ScrollView>
        </View>
    )
}
