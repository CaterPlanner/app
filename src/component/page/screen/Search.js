import React, { Component } from 'react';
import {View, Text} from 'react-native'


const Search = () => {
  return(
    <View>
      <Text>Hello! I am Search :D</Text>
    </View>
  );
}

export default Search;

// import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
// import {Icon} from 'native-base';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import { createAppContainer } from 'react-navigation';
// import ImageType from '../SearchTabs/ImageType';
// import SliderType from '../SearchTabs/SliderType'

// //우선 일단은 레이아웃은 잡아 놨지만, 실질적으로는 사용할때
// //organism넣어서 사용할거라서 느낌만 잡는 걸로 레이아웃 넣었음
// //(삽질)
// const AppTabNavigator = createMaterialTopTabNavigator({
//     '추천 목표' : {screen :  ImageType},
//     '최신 목표' : {screen :  SliderType},
//     '인기 목표' : {screen :  SliderType},
//      '카테고리' : {screen :  ImageType},
// },{
//     animationEnabled: true,
//     swipeEnabled: false,
//     tabBarPosition: "top",
//     tabBarOptions: {
//       style: {

//         backgroundColor:"#FFFFFF",
//         ...Platform.select({
//           ios:{
//             backgroundColor:"#FFFFFF"
//           }
//         })
//       },
//       iconStyle: { height: 0 },
//       activeTintColor: 'black',
//       inactiveTintColor: '#808080',
//       upperCaseLabel: false,
//       showLabel: true,
//       elevation:0
//     }
//   });

//   const AppTabContainet=createAppContainer(AppTabNavigator);

// export default class Search extends Component {

//     render() {
//         return (
//             <AppTabContainet/>
            
            
//         );
//     }
// }
 
// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderBottomColor:'#72e206', 
//         borderBottomWidth:0.1,
//         elevation:0
        
//     },
      

// });