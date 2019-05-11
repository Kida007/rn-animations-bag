import React from 'react';
import { View, PanResponder, Text, Animated, Easing } from 'react-native';


class DraggableBox extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();

    this._value = { x: 0, y: 0 };

    this.animatedValue.addListener(value => this._value = value);

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {

        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        });

        this.animatedValue.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (e, gestureState) => {
        this.animatedValue.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: 0.5, velocity: { x: gestureState.vx, y: gestureState.vy } }).start();
      },
    });
  }


  render() {
    const boxStyle = { height: 140, width: 140, backgroundColor: '#BD002E', borderRadius: 5, justifyContent: 'center', transform: this.animatedValue.getTranslateTransform() };

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Animated.View style={boxStyle} {...this.panResponder.panHandlers}>
          <Text style={{ fontWeight: '700', color: '#fff', alignSelf: 'center', fontSize: 16 }}>Drag Me</Text>
        </Animated.View>
      </View>
    );
  }
}


export default DraggableBox;
