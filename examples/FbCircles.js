import React from 'react';
import { SafeAreaView, View, Text, PanResponder, Animated, Easing } from 'react-native';


class Circle extends React.Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.ValueXY();
    this.opacity = new Animated.Value(1);

    this.Offset = { x: 0, y: 0 };

    this.animatedValue.addListener((value) => { this.Offset = value; });

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.animatedValue.setOffset(this.Offset);
      },
      onPanResponderMove: (e, gestureState) => {
        this.animatedValue.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.isDropArea(gestureState)) {
          Animated.timing(this.opacity, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
          }).start();
        } else {
          Animated.spring(this.animatedValue, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            duration: 300,
          }).start();
        }
      },
    });
  }

  isDropArea(gesture) {
    return gesture.moveY < 200;
  }

  render() {
    return (
      <Animated.View
        style={{ height: 55, width: 55, borderRadius: 27.5, backgroundColor: 'skyblue', transform: this.animatedValue.getTranslateTransform(), opacity: this.opacity, margin: 10 }}
        {...this.panResponder.panHandlers}
      />
    );
  }
}


// eslint-disable-next-line react/no-multi-comp
class FbCircles extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ padding: 10, height: 200, backgroundColor: '#273E6F' }}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontWeight: '700' }}> DROP IT HERE</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Circle />
              <Circle />
              <Circle />
            </View>

          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default FbCircles;
