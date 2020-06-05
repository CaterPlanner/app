import {  createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabsNavigation from './MainNavigation'
import GoalWrite from '../CreateGoal/GoalWrite'
import DetailPlanNavigation from './DetailPlanNavigation'
import ChoiceImage from '../CreateGoal/ChoiceImage'
import ChoiceGroup from '../CreateGoal/ChoiceGroup'

const CreateNavigation = createStackNavigator({
    
    GoalWrite: {screen:GoalWrite},
    DetailPlanNavigation:{screen:DetailPlanNavigation},
    ChoiceImage:{screen:ChoiceImage},
    ChoiceGroup:{screen:ChoiceGroup}

    
});

export default createAppContainer(CreateNavigation);