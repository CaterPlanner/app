import React, { Component } from "react";
import { View, FlatList, ScrollView, Text, Dimensions} from 'react-native'
import ImageButton from '../../../atom/button/ImageButton'
import DetailPlanPaper from '../../../atom/button/DatePlanPaper'
import { inject, observer } from 'mobx-react'



@inject(['detailPlanWriteStore'])
@observer
export default class DetailPlanWriteBoard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isGraph: false
        }

        //init
        this.props.navigation.setParams({
            isGraph: this.state.isGraph,
            changeShow: this._changeShow
        });

        this.detailPlanWriteStore = this.props.detailPlanWriteStore;
        this.detailPlanWriteStore.init(this.props.route.params.startDate, this.props.route.params.endDate, this.props.route.params.goals);
    }

    _changeShow = () => {
        this.props.navigation.setParams({
            isGraph: !this.state.isGraph,
            saveDetailPlans: this._saveDetailPlans
        })
        this.setState({
            isGraph: !this.state.isGraph
        })
    }

    _saveDetailPlans = () => {
        this.props.route.params.setPurposeDetailPlans(this.detailPlanWriteStore.goals);
    }

    render() {

        const entryWidth = Dimensions.get('window').width;
        const iconHeight = 50;
        const bottomMargin = 5;


        return (
            <View style={{ flex: 1 }}>
                {this.state.isGraph ?
                    (
                        <View style={{flexDirection : 'column',padding: 10, flex: 1}}>
                            {
                                this.detailPlanWriteStore.graphData.map((element) => {
                                    return (<View
                                        style={{
                                            marginLeft: entryWidth * element.leftMarginRatio, width: entryWidth * element.iconWidthRatio < 10 ? 10 : entryWidth * element.iconWidthRatio,
                                            height: iconHeight, marginBottom: bottomMargin, backgroundColor: element.color, justifyContent: 'center'
                                        }}
                                    >
                                        <Text numberOfLines={1} style={{ fontSize: 40, textAlign: 'left', paddingLeft: 10 }}>{element.name}</Text>
                                    </View>)
                                })
                            }
                        </View>)
                    :
                    (
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.detailPlanWriteStore.goals}
                            renderItem={({ item }) => (
                                <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
                                    <DetailPlanPaper
                                        color={item.color}
                                        name={item.name}
                                        onPress={() => {
                                            this.props.navigation.navigate('GoalWrite', {
                                                goal: this.detailPlanWriteStore.getGoal(item.id)
                                            })
                                        }}
                                    />
                                </View>
                            )}
                        />
                    )
                }
                <View style={{ position: 'absolute', bottom: 30, right: 22 }}>
                    <ImageButton
                        backgroundStyle={{ backgroundColor: '#25B046', width: 60, height: 60, borderRadius: 60, elevation: 5 }}
                        imageStyle={{ width: 31, height: 34, marginLeft: 5 }}
                        source={require('../../../../../../asset/button/plan_write_button.png')}
                        onPress={() => {
                            this.props.navigation.navigate('GoalWrite');
                        }}
                    />
                </View>
            </View>
        )
    }
}

