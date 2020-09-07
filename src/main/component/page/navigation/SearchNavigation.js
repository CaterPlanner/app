import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PublicNavigation from './PublicNavigation'
import Search from '../screen/search/Search';
import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle';

const Stack = createStackNavigator();

const SearchNavigation = () => {
  return(
    <Stack.Navigator>
        <Stack.Screen options={({ navigation }) => ({
                ...defaultHeaderStyle,
                title: '목적 검색',
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            })} name="Search" component={Search}/>
        <Stack.Screen options={{ headerShown: false }} name="PublicNavigation" component={PublicNavigation} />
    </Stack.Navigator>
  );
}

export default SearchNavigation;
