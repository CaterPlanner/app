import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabsNavigation from './MainNavigation'
import PlanCrardView from '../PlanCardView'
import PlanView from '../PlanView'


const CreateNavigation = createStackNavigator({
    
    PlanView: {screen:PlanView},
    PlanCardView:{screen:PlanCardView}

    
});

export default createAppContainer(CreateNavigation);