import React, { Component } from 'react'
import {View, StyleSheet, Button, Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import GoalNameWrite from './GoalNameWrite'
import GoalDescriptionWrite from './GoalDescriptionWrite'
import GoalThumbnailWrite from './GoalThumbnailWrite'
import GoalDecimalDayWrite from './GoalDecimalDayWrite'
import GoalDetailPlanWrite from './GoalDetailPlanWrite'
import GoalOtherWrite from './GoalOtherWrite'
import GoalWriteDone from './GoalWriteDone'
import PageStateText from '../../../atom/text/PageStateText'

const fullWidth = Dimensions.get('window').width;


export default class GoalWriteBoard extends Component{
    constructor(props){
        super(props)

        this.state = {
            activeIndex : 0,
            endIndex : 6,
            views : [
                <GoalNameWrite/>,
                <GoalDescriptionWrite/>,
                <GoalThumbnailWrite/>,
                <GoalDecimalDayWrite/>,
                <GoalDetailPlanWrite navigation={this.props.navigation}/>,
                <GoalOtherWrite/>,
                <GoalWriteDone/>
            ]
        }

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
                        data = {this.state.views}
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