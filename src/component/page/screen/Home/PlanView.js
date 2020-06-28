import React from 'react';
import {View, Text, Button} from 'react-native'


const PlanView = ({navigation}) => {
  return(
    <View>
      <Text>Hello! I am PlanView :D</Text>
      <Button
        title="Go to Details"
        
        onPress={() => navigation.navigate('PlanCardView')}
      />
    </View>
  );
}

export default PlanView;
