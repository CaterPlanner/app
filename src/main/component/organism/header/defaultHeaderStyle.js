import React from 'react';
import ImageButton from '../../atom/button/ImageButton';

export default (navigation) => ({
   headerStyle:{
    height : 50
   },
   headerLeft: () => {
      return navigation && navigation.canGoBack() ? 
      (
          <ImageButton
              backgroundStyle={{
                  height: '100%',
                  marginLeft: 10
              }}
              imageStyle={{
                  width: 30,
                  height: 35,
                  tintColor: 'black'
              }}
              source={require('../../../../../asset/button/arrow_button.png')}
              onPress={() => { navigation.goBack(); }}
      />
      )
      : null
  },
});