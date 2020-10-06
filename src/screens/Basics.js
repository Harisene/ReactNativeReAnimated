import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {Easing} from 'react-native-reanimated';
import ButtonList from '../components/ButtonList';

const {
  event,
  Value,
  cond,
  eq,
  add,
  set,
  lessOrEq,
  call,
  and,
  max,
  min,
  divide,
  interpolate,
  
} = Animated;
const {width} = Dimensions.get('window');
// create a component
class Basics extends Component {
  constructor(props) {
    super(props);

    this.boxRef = React.createRef();
    this.gestureState = new Value(-1);
    this.dragX = new Value(0);
    this.transX = new Value(0);
    this.offSetX = new Value(width / 2 - 50);
    this.absoluteX = new Value(0);
    this.boxOpacity = new Value(1);
    //this.backgroundColor = new Value("#858a91");

    this.fontSize = new Value(50);

    this.onHandlerChanged = event([
      {
        nativeEvent: {
          state: this.gestureState,
          translationX: this.dragX,
          absoluteX: this.absoluteX,
        },
      },
    ]);

    this.addX = max(add(this.dragX, this.offSetX), 0);
    this.addX = min(this.addX, width - 100);
    this.transX = cond(
      eq(State.ACTIVE, this.gestureState),
      this.addX,
      set(this.offSetX, this.addX),
    );

    this.fontSize = set(this.fontSize, divide(this.transX,8))

    this.boxOpacity = interpolate(this.transX, {
        inputRange: [0, width - 100],
        outputRange: [0.3, 1]        
    })

    // this.backgroundColor = interpolate(this.transX, {
    //     inputRange: [0, width - 100],
    //     outputRange: ['#858a91', '#ffffff']    
    // })
   
  }

  render() {
    return (
      <Animated.View style={styles.container}>
      
      <ButtonList/>
        <PanGestureHandler
          onGestureEvent={this.onHandlerChanged}
          onHandlerStateChange={this.onHandlerChanged}>
          <Animated.View
            style={[styles.box, {backgroundColor: '#858a91', transform: [{translateX: this.transX}], opacity: this.boxOpacity}]}
          />
        </PanGestureHandler>

        <Animated.Text style={{textAlign: 'center', fontSize: this.fontSize}}>
          Hello Reanimated
        </Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    //alignItems: 'center',
  },

  box: {
    //backgroundColor: 'red',
    height: 100,
    width: 100,
  },
});

//make this component available to the app
export default Basics;
