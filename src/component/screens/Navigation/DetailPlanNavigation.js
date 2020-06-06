import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabsNavigation from './MainNavigation'
import DetailPlanWrite from '../DetailPlanWrite/DetailPlanWrite'
import PlanInsert from '../DetailPlanWrite/PlanInsert'

const CreateNavigation = createStackNavigator({
    
    DetailPlanWrite: {screen:DetailPlanWrite},
    PlanInsert:{screen:PlanInsert}
 

    
});

export default createAppContainer(CreateNavigation);