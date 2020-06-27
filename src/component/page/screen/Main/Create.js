import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Icon, Row} from 'native-base';

export default class Create extends Component {


    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='ios-flag' style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <View style={style.container}>
            


            <View style={style.Base_Up}>



            <View style={style.in_Up}>

            {/*
            이친구는 그냥 샘플 이미지 가져온거임 지워줘야됨 
            */}
            <Image source={require('../../../../../asset/DZC.gif')} style={{width:130, height:130, marginTop:'50%'}}></Image>

            </View>
            <View style={style.in_Down}>

            {/**
             * 이친구들 그냥 Text임 마찬가지
             */}
            <Text style={{fontSize:22, textAlign:'center', marginTop:10, color:'black', }}>
                목표를 추가해 볼까요?
            </Text>
            <Text style={{fontSize:14, textAlign:'center', marginTop:15, color:'black',  }}>
                
            버튼을 누르고 목표를 추가하여 다른 사용자들과 목표를 공유하세요


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
                    <Text style={{fontSize:25, textAlign:'center', marginTop:3,justifyContent:'center', color:'white', }}>추       가</Text>
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
        flex : 3,
     //   borderWidth:1,
        width:'100%',
        alignItems:'center',
    },
    
    Base_Down : {
        flex : 1,
     //   borderWidth:1,
        width:'100%',
        alignItems : 'center'
    },

    in_Up : {
     //   borderWidth : 1,
        borderColor: 'red',
        flex:3
    },

    in_Down:{
     //   borderWidth : 1,
        borderColor: 'orange',
        flex:1,
        width:'70%'
    },
    
    Button_sample : {
        width: 260,
        height: 40,
        backgroundColor : '#83D74E',    
        borderRadius : 40,
        marginTop:10
    }

});