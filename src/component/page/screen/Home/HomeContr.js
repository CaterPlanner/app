import React, { Component } from 'react'
import {View, StyleSheet, Button, Dimensions, YellowBox} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import PlanCardView from './PlanCardView';
import PlanView from './PlanView'
import PageStateText from '../../../atom/text/PageStateText'

const fullWidth = Dimensions.get('window').width;

export default class HomeContr extends Component{
    constructor(props){
        super(props)

        this.state = {
            activeIndex : 0,
            endIndex : 4,
            views : [
             
                <PlanCardView navigation={this.props.navigation}/>,
                <PlanCardView navigation={this.props.navigation}/>, 
                <PlanCardView navigation={this.props.navigation}/>,
                <PlanCardView navigation={this.props.navigation}/>,

                    //일단 4개

            ]
        }

        this._next =  this._next.bind(this);
        this._previous = this._previous.bind(this);
    }

    _renderItem({item, index}){
        return(
            <View>
            {item}
            </View>
        )
    }

    _next(){
        this.carousel._snapToItem(this.state.activeIndex + 1)
    }

    _previous(){
        this.carousel._snapToItem(this.state.activeIndex - 1)
    }

    render(){

        return(
            <View style={{flex:1}}>
                
                
                <View style={styles.baseLay}>
                <View style={styles.in_SideLay}></View>
                <View style={styles.centerLay}>
               
                <Carousel 
                        //style={{flex : 1}}
                        ref = {ref => this.carousel = ref}
                        data = {this.state.views}
                        renderItem = {this._renderItem}
                        scrollEnabled = {true} //제스처라고 하길래 True함
                        sliderWidth={fullWidth}
                        itemWidth={fullWidth - 120}
                        onSnapToItem = {
                            index => this.setState({activeIndex: index})
                        }
                    />
                </View>
                <View style={styles.in_SideLay}></View>
                </View>


                <View style={styles.buttomContainer}>
                    <View style = {styles.indexNum}>
                    <PageStateText 
                    activeIndex={this.state.activeIndex + 1} 
                    endIndex={this.state.endIndex} 
                    />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttomContainer: {
        flex: 0.6,
        alignItems: 'center',
     // backgroundColor: 'green'
    },
    baseLay : {
        flex: 6,
     // backgroundColor:'yellow',   
        flexDirection: 'row'
    },

    in_SideLay:{
     //  backgroundColor:'blue',
        flex:1, 
     //   borderColor:'tomato',
     //   borderWidth:15
    },

    centerLay:{
        paddingTop: '20%',
      //  backgroundColor:'aqua',
        flex:12,
        justifyContent:"center",
        alignItems:"center",
        
    },

    indexNum : {
        alignItems : "center",
        backgroundColor : '#dfdfdf',
        justifyContent:"center",
        width:65,
        height:25,
        borderRadius:12

    }

})
