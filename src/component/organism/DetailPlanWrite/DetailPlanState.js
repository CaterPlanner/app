import React from 'react'
import { View, ScrollView } from 'react-native'
import DetailPlanIcon from '../../atom/button/DetailPlanIcon'
import { observer } from 'mobx-react';
import useStores from '../../../mobX/helper/useStores'

const WIDTH_INTERVAL = 15;
const HEIGHT_INTERVAL = 10;

const ICON_WIDTH = 120;
const ICON_HEIGHT = 25;

const DetailPlanState = observer(() => {
    const { detailPlanStore } = useStores();
    const data = detailPlanStore.currentTopViewData;
    console.log("START");
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                    {
                        data.map((levelObj, levelObjIndex) => {
                            return (
                                <View style={{ marginLeft: WIDTH_INTERVAL, marginRight : (levelObjIndex == data.length - 1 ? WIDTH_INTERVAL : 0) }}>
                                    {
                                        levelObj.elements.map((element, elementIndex) => {
                                            const detailPlan = detailPlanStore.getDetailPlan(element.key);
                                            const DIFF_INTERVAL = (element.pos - (elementIndex == 0 ? 0 : levelObj.elements[elementIndex - 1].pos)) + (elementIndex == 0 ? 1 : 0);
                                            const DIFF_ICON_HEIGHT_INTERVAL = elementIndex == 0 ? DIFF_INTERVAL : DIFF_INTERVAL - 1;
                                            return (
                                                <View style={{ marginTop: DIFF_INTERVAL * HEIGHT_INTERVAL + DIFF_ICON_HEIGHT_INTERVAL * ICON_HEIGHT,
                                                                marginBottom : (elementIndex == levelObj.elements.length - 1 ? HEIGHT_INTERVAL : 0) }}>
                                                    <DetailPlanIcon text={detailPlan.name} color={detailPlan.color} width={ICON_WIDTH} height={ICON_HEIGHT}
                                                        onClick={() => detailPlanStore.changeActiveShowKey(detailPlan.key)} />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </ScrollView>
        </View>
    )
});

export default DetailPlanState;