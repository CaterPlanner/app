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
            <Image source={require('../../../../asset/sample_Image/SampleImage.png')} style={{width:130, height:130, marginTop:'50%'}}></Image>

            </View>
            <View style={style.in_Down}>

            {/**
             * 이친구들 그냥 Text임 마찬가지
             */}
            <Text style={{fontSize:22, textAlign:'center', marginTop:10, color:'black', }}>
                화면 확인용 윗부분 텍스트
            </Text>
            <Text style={{fontSize:20, textAlign:'center', marginTop:15, color:'black',  }}>
                
                화면 확인용 아랫부분 텍스트 여긴 텍스트가 더 길다야

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
                    <Text style={{fontSize:20, textAlign:'center', marginTop:10, color:'white', }}>임시 확인용 버튼 형태 View</Text>
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
        borderWidth:1,
        width:'100%',
        alignItems:'center',
    },
    
    Base_Down : {
        flex : 1,
        borderWidth:1,
        width:'100%',
        alignItems : 'center'
    },

    in_Up : {
        borderWidth : 1,
        borderColor: 'red',
        flex:3
    },

    in_Down:{
        borderWidth : 1,
        borderColor: 'orange',
        flex:1,
        width:'70%'
    },
    
    Button_sample : {
        width: 260,
        height: 50,
        backgroundColor : '#55d517',    
        borderRadius : 40,
        marginTop:10
    }


});