import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from './HomeNavigation'
import SearchNavigation from './SearchNavigation'
import StoryNavigation from './StoryNavigation'
import Make from '../screen/main/Make'
import PublicNavigation from './PublicNavigation'
import { TabActions } from '@react-navigation/native';
import { cos } from 'react-native-reanimated';
import { PurposeWriteType } from '../../../AppEnum';

const Tab = createBottomTabNavigator();

const moveTab = (navigation, name) => {

  // if(navigation.canGoBack())
  //   navigation.popToTop();

  const jumptoAction = TabActions.jumpTo(name);
  navigation.dispatch(jumptoAction);
}




const MainNavigation = () => {

  return (

    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
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
            case "PublicNavigation":
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
        listeners={({ navigation }) => ({
          tabPress : e => {
            e.preventDefault();
            moveTab(navigation, "HomeNavigation");
          }
        })}
      />
      <Tab.Screen name="SearchNavigation" component={SearchNavigation}
        listeners={({ navigation }) => ({
          tabPress : e => {
            e.preventDefault();
            moveTab(navigation, "SearchNavigation");
          }
        })}
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
        listeners={({ navigation }) => ({
          tabPress : e => {
            e.preventDefault();
            moveTab(navigation, "StoryNavigation");
          }
        })}
      />
      <Tab.Screen name="PublicNavigation" component={PublicNavigation}
        listeners={({ navigation }) => ({
          tabPress : e => {
            e.preventDefault();
            moveTab(navigation, "PublicNavigation");
          }
        })}
      />
    </Tab.Navigator>
  );
}



export default MainNavigation;