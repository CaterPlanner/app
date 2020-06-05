import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base'; 
import Home from '../Home'
import Search from '../Search'
import Create from '../Create'
import TestTab4 from '../TestTabs/TestTab4'
import TestTab5 from '../TestTabs/TestTab5'
//import { createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';

export default MainNavigation = createBottomTabNavigator({
  Home: {screen:Home},
  Search: {screen:Search},
  Create: {screen: Create},
  Stories: {screen:TestTab4},
  Record: {screen:TestTab5},
},{
  navigationOptions: {
    headerShown: true,
  }
})
