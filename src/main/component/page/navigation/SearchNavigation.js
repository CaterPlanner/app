import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PublicNavigation from './PublicNavigation'
import Search from '../screen/search/Search';
import BeforeSearch from '../screen/search/BeforeSearch';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';

const Stack = createStackNavigator();

const SearchNavigation = ({navigation, route}) => {

  if(route.state && route.state.index > 0){
    navigation.setOptions({tabBarVisible: false})
}else{
    navigation.setOptions({tabBarVisible: true})
}

  return(
    <Stack.Navigator screenOptions={{
      animationEnabled : false
  }}> 
        <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle(),
                title: '탐색',
                headerTitleAlign:'left',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="BeforeSearch" component={BeforeSearch}/>
        {/* <Stack.Screen options={{ headerShown: false }} name="PublicNavigation" component={PublicNavigation} /> */}
        {PublicNavigation.get()}
    </Stack.Navigator>
  );
}

export default SearchNavigation;
