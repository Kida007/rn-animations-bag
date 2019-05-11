import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const width = 270;
const height = 110;
const borderRadius = height / 2;
const padding = 7;
const buttonRadius = borderRadius - padding;
const svgButtonRadius = 96 / 2;
const stopage = width - 2 * padding - 2 * svgButtonRadius;

import SvgUri from "react-native-svg-uri";
import Animated from "react-native-reanimated";

const {
  Value,
  block,
  set,
  Clock,
  eq,
  spring,
  clockRunning,
  cond,
  startClock,
  debug,
  stopClock,
  interpolate
} = Animated;

const runTiming = (translation, activeDest, inactiveDest, status) => {
  const clock = new Clock();

  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: translation,
    time: new Value(0)
  };

  const config = {
    damping: 10,
    mass: 0.3,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001
  };

  const activeConfig = { ...config, toValue: activeDest };
  const inactiveConfig = { ...config, toValue: inactiveDest };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      startClock(clock)
    ]),
    cond(
      eq(status, true),
      [spring(clock, state, activeConfig)],
      [spring(clock, state, inactiveConfig)]
    ),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
};

class SexyScrollable extends React.Component {
  state = { night: false };

  constructor(props) {
    super(props);
    this.night = new Animated.Value(false);
    this.animationControl = runTiming(new Value(0), 1, 0, this.night);

    this.translateX = interpolate(this.animationControl, {
      inputRange: [0, 1],
      outputRange: [0, stopage]
    });

    this.opacity1 = interpolate(this.animationControl, {
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
  }

  ontoggle = () => {
    this.setState({ night: !this.state.night }, () =>
      this.night.setValue(this.state.night)
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginBottom: 50,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <TouchableOpacity
          style={styles.scrollable}
          activeOpacity={1}
          onPress={this.ontoggle}
        >
          <Animated.View
            style={{ transform: [{ translateX: this.translateX }] }}
          >
            <Animated.View style={{ opacity: this.opacity1 }}>
              <SvgUri
                width={2 * buttonRadius}
                height={2 * buttonRadius}
                source={require("./data/sun.svg")}
              />
            </Animated.View>

            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                opacity: this.animationControl
              }}
            >
              <SvgUri
                width={2 * buttonRadius}
                height={2 * buttonRadius}
                source={require("./data/astronomy.svg")}
              />
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = {
  scrollable: {
    height,
    width,
    borderRadius,
    padding,
    backgroundColor: "#F8F9FA"
  }
};

export default SexyScrollable;
