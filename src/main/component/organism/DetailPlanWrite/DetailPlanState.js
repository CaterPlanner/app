import React from 'react'
import { View, ScrollView } from 'react-native'
import DetailPlanIcon from '../../atom/button/DetailPlanIcon'


const WIDTH_INTERVAL = 15;
const HEIGHT_INTERVAL = 10;

const ICON_WIDTH = 120;
const ICON_HEIGHT = 25;

export default function DetailPlanState({detailPlanTreeStore}){

    const data = detailPlanTreeStore.currentTopViewData;

    let views = [];
    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data.length; j++){
            
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                    {
                        // for()
                        // data.map((levelObj, levelObjIndex) => {
                        //     return (
                        //         <View style={{ marginLeft: WIDTH_INTERVAL, marginRight : (levelObjIndex == data.length - 1 ? WIDTH_INTERVAL : 0) }}>
                        //             {
                        //                 levelObj.elements.map((element, elementIndex) => {
                        //                     const detailPlan = detailPlanTreeStore.getDetailPlan(element.key);
                        //                     const DIFF_INTERVAL = (element.pos - (elementIndex == 0 ? 0 : levelObj.elements[elementIndex - 1].pos)) + (elementIndex == 0 ? 1 : 0);
                        //                     const DIFF_ICON_HEIGHT_INTERVAL = elementIndex == 0 ? DIFF_INTERVAL : DIFF_INTERVAL - 1;
                        //                     return (
                        //                         <View style={{ marginTop: DIFF_INTERVAL * HEIGHT_INTERVAL + DIFF_ICON_HEIGHT_INTERVAL * ICON_HEIGHT,
                        //                                         marginBottom : (elementIndex == levelObj.elements.length - 1 ? HEIGHT_INTERVAL : 0) }}>
                        //                             <DetailPlanIcon text={detailPlan.name} color={detailPlan.color} width={ICON_WIDTH} height={ICON_HEIGHT}
                        //                                 onPress={() => {detailPlanTreeStore.changeActiveShowKey(detailPlan.key);}} />
                        //                         </View>
                        //                     )
                        //                 })
                        //             }
                        //         </View>
                        //     )
                        // })
                    }
                </ScrollView>
            </ScrollView>
        </View>
    )
}
