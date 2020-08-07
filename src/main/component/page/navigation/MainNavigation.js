import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Main/Home'
import SearchNavigation from './SearchNavigation'
import Make from '../screen/Main/Make'
import Story from '../screen/Main/Story'
import MyPage from '../screen/Main/MyPage'
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const SNSNavigation = () => {
  return(
    <Stack.Screen name= />
  )
}



const Tab = createBottomTabNavigator();
const MainNavigation = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case "Home":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_home.png') :
                require('../../../../../asset/icon/tab_icon_inactive_home.png')
              break;
            case "Search":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_search.png') :
                require('../../../../../asset/icon/tab_icon_inactive_search.png')
              break;
            case "Make":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_make.png') :
                require('../../../../../asset/icon/tab_icon_inactive_make.png')
              break;
            case "Story":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_story.png') :
                require('../../../../../asset/icon/tab_icon_inactive_story.png')
              break;
            case "MyPage":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_mypage.png') :
                require('../../../../../asset/icon/tab_icon_inactive_mypage.png')
              break;
          }

          return <Image source={iconSource} />
        },
      })}
      tabBarOptions={{
        iconStyle: { height: 35 },
        upperCaseLabel: false,
        showLabel: false,//탭의 이름을 표시함 
        showIcon: true,//아이콘 보이게 하는 친구임
        tabStyle: { borderBottomWidth: 0.01, },
        swipeEnabled: true,
        indicatorStyle: {
          display: 'none',
        },
        style: { backgroundColor: 'white', height: 50 },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Make" component={Make} />
      <Tab.Screen name="Story" component={Story} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}



export default MainNavigation;