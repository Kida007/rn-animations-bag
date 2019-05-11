import React from "react";
import { View, Text, PanResponder, Animated } from "react-native";

class DB extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY({ x: 0, y: 0 });
    this.value = { x: 0, y: 0 };

    this.animatedValue.addListener(value => (this.value = value));

    this.panresponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.animatedValue.setOffset({
          x: this.value.x,
          y: this.value.y
        });

        console.log(this.animatedValue);

        this.animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        this.animatedValue.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        });
      }
    });
  }

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        {...this.panresponder.panHandlers}
      >
        <Animated.View
          style={{
            height: 100,
            width: 100,
            borderRadius: 5,
            backgroundColor: "#273E6F",
            alignItems: "center",
            justifyContent: "center",
            transform: this.animatedValue.getTranslateTransform()
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>Drag me !</Text>
        </Animated.View>
      </View>
    );
  }
}

export default DB;
