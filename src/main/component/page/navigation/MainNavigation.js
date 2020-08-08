import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from './HomeNavigation'
import SearchNavigation from './SearchNavigation'
import Make from '../screen/main/Make'
import StoryNavigation from './StoryNavigation'
import MyProfile from '../screen/main/MyProfile'



const Tab = createBottomTabNavigator();
const MainNavigation = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case "HomeNavigation":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_home.png') :
                require('../../../../../asset/icon/tab_icon_inactive_home.png')
              break;
            case "SearchNavigation":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_search.png') :
                require('../../../../../asset/icon/tab_icon_inactive_search.png')
              break;
            case "Make":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_make.png') :
                require('../../../../../asset/icon/tab_icon_inactive_make.png')
              break;
            case "StoryNavigation":
              iconSource = focused ?
                require('../../../../../asset/icon/tab_icon_active_story.png') :
                require('../../../../../asset/icon/tab_icon_inactive_story.png')
              break;
            case "MyProfile":
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
      <Tab.Screen name="HomeNavigation" component={HomeNavigation} />
      <Tab.Screen name="SearchNavigation" component={SearchNavigation} />
      <Tab.Screen name="Make" component={Make} />
      <Tab.Screen name="StoryNavigation" component={StoryNavigation} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
}



export default MainNavigation;