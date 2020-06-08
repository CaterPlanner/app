import React from 'react';
import {View, Text, Image } from 'react-native'


const recommend = () => {
    return(
        <View>
            <Image style={{width:50, height:50}} source={{uri:'https://wp.technologyreview.com/wp-content/uploads/2019/07/gettyimages-932729844arxivbrain-10.jpg'}}></Image>
            <Text>Rec</Text>
        </View>
    )
}

export default recommend;