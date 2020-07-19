import React, { Component } from '../ObjectionWrite/node_modules/react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from '../ObjectionWrite/node_modules/react-native';
import {Icon, Row} from 'native-base';
import Header_Main from '../../../molecule/Header_Main'

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default class Create extends Component {


    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-flag' style={{ color: tintColor }} />
        )
    }
    render() {


        return (
            
            <View style={style.container}>
            {/* 
            얘를 네비게이션 그걸로 사용안하고 이걸로 한다고 하면
            얘를 재사용하는데가 많으니까 따로 만들어놓고 가져와야되는게 정석이지?
            */}

            <Header_Main/>
           

            <View style={style.Base_Up}>



            <View style={style.in_Up}>

            {/*
            이친구는 그냥 샘플 이미지 가져온거임 지워줘야됨 
            */}
            <Image source={require('../../../../../asset/DZC.gif')} style={{width:140, height:140, marginTop:'23%'}}></Image>
            </View>
            <View style={style.in_Down}>

            {/**
             * 이친구들 그냥 Text임 마찬가지
             */}
            <Text adjustsFontSizeToFit
              numberOfLines={1} style={{fontSize:20, textAlign:'center', marginTop:'10%', color:'black', }}>
                목표를 추가해 볼까요?
            </Text>
            <Text 
            adjustsFontSizeToFit
              numberOfLines={2}
            style={{fontSize:18, textAlign:'center', marginTop:'7%', color:'black',  }}>
                
                버튼을 누르고 목표를 추가하여 다른 사용자들과 목표를 공유해 봅시다!
            
            </Text>

            </View>



            </View>


            <View style={style.Base_Down}>

                {/** 얘는 버튼 atom 가져오면 없어져야됨
                 * 일단 버튼 대신 화면 표시하려고 넣은 친구
                 */}
                 
        <TouchableOpacity 
       
       onPress={() => this.props.navigation.navigate("CreateNavigation")}
       
       >
                <View style={style.Button_sample}>
                <Text style={{fontSize:25, textAlign:'center', marginTop:'0.5%', color:'white', }}>추         가</Text>
                </View>
        </TouchableOpacity>
            </View>


                

            </View>
        );
    }
}
 

const style = StyleSheet.create({



    container: {
        flex: 1,
        
       // alignItems: 'center',
       // justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },

    Base_Up : {
        flex : 2,
       // borderWidth:1,
        width:'100%',
        alignItems:'center',
    },
    
    Base_Down : {
        flex : 0.8,
       // borderWidth:1,
        width:'100%',
        alignItems : 'center'
    },

    in_Up : {
      //  borderWidth : 1,
        borderColor: 'red',
        flex:2
    },

    in_Down:{
     //   borderWidth : 1,
        borderColor: 'orange',
        flex:1,
        width:'70%',
        
    },
    
    Button_sample : {
        width: 260,
        height: 45,
        backgroundColor : '#55d517',    
        borderRadius : 40,
        marginTop:'5%',
        alignItems:'center',
        justifyContent:'center',
        
        

    }

});