import React from 'react';
import {View, Text, Button} from 'react-native'


const PlanView = ({navigation}) => {
  return(
    <View>
      <Text>Hello! I am PlanView :D</Text>
      <Button
        title="Go to Details"
<<<<<<< HEAD
        
        onPress={() => navigation.navigate('PlanCardView')}
=======
        onPress={() => navigation.navigate('HomeContr')}
>>>>>>> a500801867648c1164b6fffd91e5463ff2d12090
      />
    </View>
  );
}

export default PlanView;