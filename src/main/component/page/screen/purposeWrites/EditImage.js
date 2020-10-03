import React, {Component} from 'react';
import {StyleSheet, View, Text, PanResponder, Animated, Dimensions} from 'react-native';
import normalize from '../../../../util/noramlize';



const Box = {
    width : normalize(120, 'height'),
    height: normalize(120, 'height')
}

export default class EditImage extends Component{

    constructor(props){
        super(props);

        this.pan = new Animated.ValueXY();

        
      
    }


    _selectBoxValid = () => {

        if(this.pan.y > 200)
            return false; 
        

        return true;
    }

    componentWillMount(){

        console.log("MAX!!!!!!!!!!!")
        console.log('width : ' + Dimensions.get('window').width + "  height: " + Dimensions.get('window').height)

        this.pan.addListener((value) => {
            console.log(value)
        })

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: () => {
                this.pan.setOffset({
                    x: this.pan.x._value,
                    y: this.pan.y._value
                })   
            },
            onPanResponderMove : (e,gestureState) => {
                console.log(this.pan.getLayout())
                console.log(this.pan.getLayout().top > 200)

                if(this.pan.getLayout().top > 200){
                    return;
                }else{
                    Animated.event([
                        null, 
                        {dx: this.pan.x, dy: this.pan.y},
                ], {useNativeDriver: false})(e,gestureState)
                }
                
            },
            onPanResponderRelease : () => {
                this.pan.flattenOffset();
            }
        });

    }

    render() {

        return (
            <View style={styles.container}>
              <Text style={styles.titleText}>Drag this box!</Text>
              <Animated.View
                style={{
                  transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
                }}
                {...this.panResponder.panHandlers}
              >
                <View style={styles.box} />
              </Animated.View>
            </View>
          );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titleText: {
      fontSize: 14,
      lineHeight: 24,
      fontWeight: "bold"
    },
    box: {
      height: Box.height,
      width: Box.width,
      backgroundColor: "blue",
      borderRadius: 5
    }
  });