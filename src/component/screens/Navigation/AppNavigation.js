
import MainNavigation from './MainNavigation'
import CreateNavigation from './CreateNavigation'
import ServerNotification from '../ServerNotification'
import Setting from '../Setting'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

// const AppNavigation = createStackNavigator({
    
//     // MainNavigation: {screen:MainNavigation},
//     // CreateNavigation: {screen:CreateNavigation},
//     ServerNotification:{screen: ServerNotification},
//     //Setting:{screen:Setting}

    
// });

function AppNavigation(){
    return(
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
        <Stack.Screen name="CreateNavigation" component={CreateNavigation} />
        <Stack.Screen name="ServerNotification" component={ServerNotification} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
      </NavigationContainer>
    )
}

//export default createAppContainer(AppNavigation);
export default AppNavigation;