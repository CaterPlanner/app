import React from 'react'
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailPlanWriteNavigation from './DetailPlanWriteNavigation'
import PurposeWriteBoard from '../screen/purposeWrite/PurposeWriteBoard'
import SelectAlbum from '../screen/purposeWrite/SelectAlbum'
import SelectPhoto from '../screen/purposeWrite/SelectPhoto';

import defaultHeaderStyle from '../../organism/header/defaultHeaderStyle'
import useStores from '../../../mobX/helper/useStores';
import PurposeWriteDone from '../screen/purposeWrite/PurposeWriteDone';


const Stack = createStackNavigator();


const CreateNavigation = () => {
    return(
          <Stack.Navigator >
            <Stack.Screen options={{headerShown: false}} name="PurposeWriteBoard" component={PurposeWriteBoard}  />
            <Stack.Screen options={{headerShown: false}} name="PurposeWriteDone" component={PurposeWriteDone}/>
            <Stack.Screen options={{headerShown: false}} name="DetailPlanWriteNavigation" component={DetailPlanWriteNavigation} />
            <Stack.Screen options={{
                ...defaultHeaderStyle,
                headerTitle: ''
            }} name="SelectAlbum" component={SelectAlbum} />
            <Stack.Screen name="SelectPhoto" component={SelectPhoto} options={({route, navigation}) => ({
                ...defaultHeaderStyle,
                headerTitle : route.params.photoName,
                // headerRight : () => {
                //     // const enable = route.params.purposeWriteStore.isSelectPh
                    
                //     // const {purposeStore} = useStores();

                //     return <Button
                //         title="완료"
                //         // disabled={!purposeStore.isSelectPhoto}
                //         onPress={() => {
                //             navigation.navigator('DetailPlanNavigation');
                //         }}
                //     />
                // }
            })}/>
        </Stack.Navigator>
    )
    
}

export default CreateNavigation;