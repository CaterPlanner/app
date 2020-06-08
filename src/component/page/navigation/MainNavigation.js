import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Main/Home'
import SearchNavigation from '../navigation/SearchNavigation'
import Create from '../screen/Main/Create'
import Stories from '../screen/Main/Stories'
import Record from '../screen/Main/Record'


const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator  options={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Create" component={Create}  />
      <Tab.Screen name="Stories" component={Stories} />
      <Tab.Screen name="Record" component={Record} />
    </Tab.Navigator>
  );
}



export default MainNavigation;



