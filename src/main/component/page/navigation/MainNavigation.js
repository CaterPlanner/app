import React from '../screen/ObjectionWrite/node_modules/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Main/Home'
import SearchNavigation from '../navigation/SearchNavigation'
import Create from '../screen/Main/Create'
import Stories from '../screen/Main/Stories'
import Record from '../screen/Main/Record'

//TestScreen
import PullTest from '../screen/TesterScreen/PullTest';
import StoryCardTest from '../screen/TesterScreen/StoryCardTest'
import StoryCardActive from '../screen/TesterScreen/StoryCardActive'

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
 
  
  return (

<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //일단 저거 아이콘 가져와지는게
            //안되서 Label True하고 Icon false함
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

        

        tabBarOptions={{
          iconStyle: { height: 35 },
          activeTintColor: '#ffffff', //선택 되었을 때의 색상
          inactiveTintColor: '#55d517',//선택되지 않았을 때의 색상
          upperCaseLabel: false,
          showLabel: true,//탭의 이름을 표시함 
          showIcon: false,//아이콘 보이게 하는 친구임
          tabStyle : { borderBottomWidth : 0.01, },
          
          swipeEnabled: true,
         activeBackgroundColor: '#83D74E',
         indicatorStyle: {
         display: 'none',
        },
          
          style : { backgroundColor:'white', height:50},
        }}
        options={{ headerShown: false }}
      >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Create" component={Create}  />
      <Tab.Screen name="Stories" component={StoryCardActive} />
      {/**<Tab.Screen name="Stories" component={PullTest} /> */}
      <Tab.Screen name="Record" component={Record} />
      </Tab.Navigator>
  );
}



export default MainNavigation;