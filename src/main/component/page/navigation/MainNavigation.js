import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from './HomeNavigation'
import SearchNavigation from './SearchNavigation'
import StoryNavigation from './StoryNavigation'
import Make from '../screen/mains/Make'
import { PurposeWriteType } from '../../../AppEnum';
import ProfileNavigation from './ProfileNavigation';

const Tab = createBottomTabNavigator();

const moveTab = (navigation, name) => {
     
  console.log(navigation);

  if(navigation.canGoBack()){
    navigation.popToTop();
   }
  //   navigation.navigate(name)


    console.log('ddd');
}




const MainNavigation = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case "HomeNavigation":
              iconSource = require('../../../../../asset/icon/tab_icon_home.png');
              break;
            case "SearchNavigation":
              iconSource = require('../../../../../asset/icon/tab_icon_search.png');
              break;
            case "Make":
              iconSource = require('../../../../../asset/icon/tab_icon_make.png');
              break;
            case "StoryNavigation":
              iconSource = require('../../../../../asset/icon/tab_icon_story.png');
              break;
            case "ProfileNavigation":
              iconSource = require('../../../../../asset/icon/tab_icon_profile.png');
              break;
          }

          return <Image source={iconSource} resizeMode="stretch" style={{ tintColor: focused ? '#25B046' : undefined, width: '90%', height: '100%' }} />
        },
      })}
      tabBarOptions={{
        iconStyle: { height: 40 },
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
      <Tab.Screen name="HomeNavigation" component={HomeNavigation}
        
      />
      <Tab.Screen name="SearchNavigation" component={SearchNavigation}
       
      />
      <Tab.Screen name="Make" component={Make}
        listeners={({ navigation }) => ({
          tabPress: e => {
            navigation.navigate('CreateNavigation', {
              screen: 'PurposeWriteBoard',
              params: {
                  type : PurposeWriteType.CREATE
              }
          })
            e.preventDefault();
          },
        })} />
      <Tab.Screen name="StoryNavigation" component={StoryNavigation}
        
      />
      <Tab.Screen name="ProfileNavigation" component={ProfileNavigation}
        
      />
    </Tab.Navigator>
  );
}



export default MainNavigation;