<<<<<<< HEAD
import React, { Component } from 'react'
import {View, StyleSheet, Button, Dimensions, YellowBox, Text, Image} from 'react-native'
import Carousel from 'react-native-snap-carousel';
//import PlanCard from './PlanCard';
import PlanView from './PlanView.js'
import PageStateText from '../../../atom/text/PageStateText'
import Card from './Card'
import ActiveCard from './ActiveCard'
import { TouchableOpacity } from 'react-native-gesture-handler';

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified']);
YellowBox.ignoreWarnings(['Warnig: componentWillReceive']);

const fullWidth = Dimensions.get('window').width;


//진행률 값 
const progresValue = 30;
const defaultDCater = '../../../../../asset/DDC.gif'

//함정카드 발동
var actuationCard = true;

var tabText = '자세히 보기'
var tabColor = 'black'
var tabFonC = 'gray'

export default class PlanCardView extends Component{
    

    constructor(props){
        super(props)

        this.state = {
            activeIndex : 0,
            endIndex : 4,
        

            item : [{

                image:'https://www.aramamotoru.com/wp-content/uploads/2018/02/google-amp-icin-goruntu-boyut-gereksinimini-neredeyse-iki-katina-cikardi-1280x720.png',
                title:'하루 O시간 OO하기',
                date:'D - O',
            
                //함정카드 발동 
                progresValue:progresValue,

              }
            ],

          
        }

        this._next =  this._next.bind(this);
        this._previous = this._previous.bind(this);

        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    //
    _renderItem({item, index}){
        

            if(actuationCard == false){
                return(  

                    <View>
                        <Card image = {item.image} title = {item.title} date = {item.date}/>
                    </View>
                    )
            }else if(actuationCard == true){

            return(

                <View>
                <ActiveCard progresValue = {item.progresValue}></ActiveCard>
                </View>

            )
        }

    }

    _next(){
        this.carousel._snapToItem(this.state.activeIndex + 1)
    }

    _previous(){
        this.carousel._snapToItem(this.state.activeIndex - 1)
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

    //흔적
    _switch(){


        if(actuationCard == 0){
            actuationCard = true;
            console.log(actuationCard)

        }else if(actuationCard == 1){
            actuationCard = false;
             console.log(actuationCard)
             
        } 

        
    }//흔적

    render(){
        console.log(actuationCard)

        return(
            <View style={{flex:1 , backgroundColor:'white'}}>
                
                
                <View style={styles.baseLay}>
                <View style={styles.in_SideLay}></View>
                <View style={styles.centerLay}>
                
   
                <Image style={{width:100, height:93, marginBottom:0, }
                } source={require(defaultDCater)}
                >
                </Image>
                {/*https://reactnative.dev/img/tiny_logo.png */}    

                <Carousel 
                        //flex : 1, backgroundColor:'red', width:123, height:123
                        //style={{position:'absolute'}}
                        ref = {ref => this.carousel = ref}
                        data = {this.state.item}
                        renderItem = {this._renderItem}
                        scrollEnabled = {true} 
                        sliderWidth={fullWidth}
                        itemWidth={fullWidth - 120}
                        onSnapToItem = {
                        index => this.setState({activeIndex: index})}
                        hasParallaxImages = {true}
                        
                    />
                
                       
                    {/**'../../../../../asset/sample_Image/Sam.png' */}
           
                </View>
                <View style={styles.in_SideLay}></View>
                </View>

                <TouchableOpacity onPress = {
                    shit(this.forceUpdateHandler)
                    //()=>
                }>
                    <View style={{
                        backgroundColor : tabColor ,
                        width:'70.9%',
                        height:30,
                        
                        alignItems:'center',
                        alignSelf:'center',
                        justifyContent:'center',
                        borderBottomWidth:0.5,
                        borderBottomEndRadius: 20, borderBottomStartRadius:20,
                        borderColor:'black',
                        borderRightWidth : 0.5,
                        borderLeftWidth : 0.5, 
                        elevation:5,
                        marginBottom:'1%',
                        
                        }}>
                    <Text style={{color:tabFonC, fontWeight:'bold', fontSize:15}}>{tabText}</Text>
                    </View>
                </TouchableOpacity>

               
                <View style = {styles.indexNum}>
                    <PageStateText 
                    activeIndex={this.state.activeIndex + 1} 
                    endIndex={this.state.endIndex} 
                    />
                    
                </View>
                      
            </View>



        );
    }
=======
import React from 'react';
import {Image, View, Text, Button} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const PlanCardView = ({navigation}) => {
  return(
    <View style={{}}>

      <Image source={require('../../../../../asset/sample_Image/Sam.png')}
      style = {{width : '100%', height: 350,
      borderTopLeftRadius: 20, borderTopRightRadius:20,
      borderWidth:0.5,
      borderColor:'black',
      elevation:10
      }}></Image>

      <View 
      style = {{
        backgroundColor:'white', alignItems: 'center', paddingTop:'10%',
        width:"100%",
        height:"20%",
        borderRightWidth : 0.5,
        borderLeftWidth : 0.5, 
        
      }}>
      <Text
      
      style = {{fontSize:20,}}
      
      >Hello! I am PlanCardView :D</Text>
      </View>

      
        
        <View style={{
         backgroundColor: 'white',
         width:'100%',
         height:30,
         color: 'gray',
         alignItems:'center',
         justifyContent:'center',
         borderBottomWidth:0.5,
         borderBottomEndRadius: 20, borderBottomStartRadius:20,
         borderColor:'black',
         borderRightWidth : 0.5,
         borderLeftWidth : 0.5, 
         elevation:10
         }}>
      <TouchableOpacity onPress={() => navigation.navigate('PlanView')}>
           <Text style = {{color:'gray'}}> 자세히 보기 </Text>
           </TouchableOpacity>
         </View>
      


    </View>
  );
>>>>>>> a500801867648c1164b6fffd91e5463ff2d12090
}

function shit(forceUpdateHandler) {
    
    if(actuationCard == false){
        console.log('뒷면으로 뒤집기')
        actuationCard = true;
        tabText = '확인'
        tabFonC = 'white'
        tabColor = '#A8D954'
        console.log('뒷면 - Progress')

    }else if(actuationCard == true){
        console.log('앞면으로 뒤집기')
        actuationCard = false;
        tabText = '자세히 보기'
        tabFonC = 'gray'
        tabColor = 'white'
        
         console.log('앞면 - ImageCard')
         
    } 

    return(forceUpdateHandler);
    

}

const styles = StyleSheet.create({
    buttomContainer: {
        flex: 0.6,
        alignItems: 'center',
        backgroundColor: 'rgba(20,20,20,0)'
        
    },//fuck this

    baseLay : {
        flex: 6,
        backgroundColor:'white',   
        flexDirection: 'row'
    },

    in_SideLay:{
     //  backgroundColor:'blue',
        flex:1, 
     //   borderColor:'tomato',
     //   borderWidth:15
    },

    centerLay:{
        paddingTop: '7%',
      //  backgroundColor:'aqua',
        flex:12,
        justifyContent:"center",
        alignItems:"center",
        
    },

    indexNum : {

        marginTop:"4%",
        alignItems : "center",
        backgroundColor : '#dfdfdf',
        justifyContent:"center",
        width:65,
        height:25,
        borderRadius:12,
        alignSelf:'center',
        marginBottom:'5%'
        
    },
    moreCon:{
        
        
    }



})
