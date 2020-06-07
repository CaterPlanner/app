import React from 'react';
import {View, Text, Button} from 'react-native'


const PlanCardView = ({navigation}) => {
  return(
    <View>
      <Text>Hello! I am PlanCardView :D</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('PlanView')}
      />
    </View>
  );
}

export default PlanCardView;