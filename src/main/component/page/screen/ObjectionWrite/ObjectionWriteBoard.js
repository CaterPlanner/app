import React, { Component } from 'react'
import {View, StyleSheet, Button, Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import GoalNameWrite from './ObjectionNameWrite'
import GoalDescriptionWrite from './ObjectionDescriptionWrite'
import GoalThumbnailWrite from './ObjectionThumbnailWrite'
import GoalDecimalDayWrite from './ObjectionDecimalDayWrite'
import GoalDetailPlansWrite from './ObjectionDetailPlansWrite'
import GoalOtherWrite from './ObjectionOtherWrite'
import GoalWriteDone from './ObjectionWriteDone'
import PageStateText from '../../../atom/text/PageStateText'
import Goal from '../../../../rest/model/Goal';
import Objection from '../../../../rest/model/Objection';

const fullWidth = Dimensions.get('window').width;

export default class ObjectionWriteBoard extends Component{

    constructor(props){
        super(props)

        this.state = {
            activeIndex : 0,
            endIndex : 7,
            objection : new Objection()
        }
        
        this.views = [
            <ObjectionNameWrite mainGoal={this.state.objection}/>,
            <ObjectionDescriptionWrite mainGoal={this.state.objection}/>,
            <ObjectionThumbnailWrite mainGoal={this.state.objection} />,
            <ObjectionDecimalDayWrite mainGoal={this.state.objection}/>,
            <ObjectionDetailPlansWrite mainGoal={this.state.objection} navigation={this.props.navigation}/>,
            <ObjectionOtherWrite mainGoal={this.state.objection} />,
            <ObjectionWriteDone mainGoal={this.state.objection} navigation={this.props.navigation}/>
        ]
    }

    _renderItem = ({item, index}) => {
        return(
            <View>
                {item}
            </View>
        )
    }

    _next = () => {
        this.carousel._snapToItem(this.state.activeIndex + 1)
    }

    _previous = () => {
        this.carousel._snapToItem(this.state.activeIndex - 1)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.topContainer}>
                    <PageStateText activeIndex={this.state.activeIndex + 1} endIndex={this.state.endIndex}/>
                </View>
                <View style={styles.viewContainer}>
                    <Carousel
                        style={{flex:1}}
                        ref = {ref => this.carousel = ref}
                        data = {this.views}
                        renderItem = {this._renderItem}
                        scrollEnabled = {false}
                        sliderWidth={fullWidth}
                        itemWidth={fullWidth}
                        onSnapToItem = {
                            index => this.setState({activeIndex: index})
                        }
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                    {this.state.activeIndex != 0 &&
                    <Button title="<" onPress={this._previous}  color="#83D74E"/> 
                    }
                    </View>
                    <View>
                    {this.state.activeIndex + 1 != this.state.endIndex &&
                    <Button title=">" onPress={this._next} color="#83D74E"/> 
                    }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 0.35,
        alignItems: 'center',
        backgroundColor: 'white',
        
        elevation:5,

        paddingTop:'3%'

    },
    viewContainer : {
        flex: 6
    },
    bottomContainer : {
        flex : 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },

    indexN:{
        fontSize : 20,
    },


})