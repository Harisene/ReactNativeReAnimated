//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Animated, {Easing, Extrapolate} from 'react-native-reanimated';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const {
  event,
  Value,
  interpolate,
  cond,
  eq,
  set,
  Clock,
  block,
  clockRunning,
  startClock,
  timing,
  stopClock,
  debug,
  and,
  greaterOrEq
} = Animated;
// create a component

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class ButtonList extends Component {
  constructor(props) {
    super(props);

    this.gestureState = new Value(-1);
    this.opacity = new Value(1);
    this.secondOpacity = new Value(0);

    this.onHandlerChanged = event([
        {
          nativeEvent: ({state}) =>
            block([
              cond(
                eq(state, State.END),
                set(this.opacity, runTiming(new Clock(), 1, 0)),
              ),
            ]),
        },
          ]);   

          this.onHandlerChanged2 = event([
            {
              nativeEvent: ({state}) =>
                block([
                  cond(eq(state, State.END),
                    set(this.opacity, runTiming(new Clock(), 0, 1)),
                  ),
                ]),
            },
              ]);   

        this.secondOpacity = interpolate(this.opacity, {
            inputRange: [0, 1],
            outputRange: [1, 0]            
        })
  }

  render() {
    return (
      <View style={styles.container}>
        <PanGestureHandler onHandlerStateChange={this.onHandlerChanged}>
          <Animated.View
            style={{
              opacity: this.opacity,
              backgroundColor: 'red',
              height: 50,
              width: 50,
            }}
          />
        </PanGestureHandler>
        <PanGestureHandler onHandlerStateChange={this.onHandlerChanged2}>
          <Animated.View
            style={{  
              opacity: this.secondOpacity,           
              backgroundColor: 'blue',
              height: 50,
              width: 50,
            }}
          />
        </PanGestureHandler>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: 200,
    alignItems: 'center',
  },
});

//make this component available to the app
export default ButtonList;
