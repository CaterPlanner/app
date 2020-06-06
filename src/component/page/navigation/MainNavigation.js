import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home'
import Search from '../screen/Search'
import Create from '../screen/Create'
import Stories from '../screen/Stories'
import Record from '../screen/Record'


const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Stories" component={Stories} />
      <Tab.Screen name="Record" component={Record} />
    </Tab.Navigator>
  );
}



export default MainNavigation;



