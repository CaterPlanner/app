import React from '../ObjectionWrite/node_modules/react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from '../../navigation/HomeNavigation'

const Stack = createStackNavigator();


const Home = () => {
    return(
       <HomeNavigation/>
    );
}

export default Home;