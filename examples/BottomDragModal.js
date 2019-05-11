import React from "react";
import {
  Text,
  PanResponder,
  Animated,
  Dimensions,
  View,
  Easing,
  SafeAreaView
} from "react-native";

const height = Dimensions.get("window").height;

class BottomDragModal extends React.Component {
  state = { prev: height - 80 };

  componentWillMount() {
    this.animatedValue = new Animated.Value(height - 80);
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.vy < -0.5)
          Animated.timing(this.animatedValue, {
            toValue: height - 320,
            duration: 200,
            easing: Easing.linear
          }).start();
        else if (gestureState.vy > 0.5)
          Animated.timing(this.animatedValue, {
            toValue: height - 80,
            duration: 200,
            easing: Easing.linear
          }).start();
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ prev: this.animatedValue._value });
      }
    });
  }

  render() {
    const Bstyle = {
      height: 300,
      backgroundColor: "#273E6F",
      borderRadius: 10,
      transform: [{ translateY: this.animatedValue }]
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <Animated.View style={Bstyle} {...this.panResponder.panHandlers}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  height: 7,
                  width: 40,
                  backgroundColor: "#DEDEDF",
                  borderRadius: 5
                }}
              />
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

export default BottomDragModal;
