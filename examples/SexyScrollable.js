import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text
} from "react-native";

const width = 270;
const height = 110;
const borderRadius = height / 2;
const padding = 7;
const buttonRadius = borderRadius - padding;
const svgButtonRadius = 96 / 2;
const stopage = width - 2 * padding - 2 * svgButtonRadius;

import SvgUri from "react-native-svg-uri";
import Animated, { Easing } from "react-native-reanimated";

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
  interpolate,
  timing,
  sqrt,
  sub,
  multiply,
  pow
} = Animated;

const runSpring = (translation, activeDest, inactiveDest, status) => {
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

function runTiming(value, activeDest, inactiveDest, status) {
  const clock = new Clock();

  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 200,
    easing: Easing.inOut(Easing.ease)
  };

  const activeConfig = { ...config, toValue: activeDest };
  const inactiveConfig = { ...config, toValue: inactiveDest };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      startClock(clock)
    ]),
    // we run the step here that is going to update position
    cond(
      eq(status, true),
      [timing(clock, state, activeConfig)],
      [timing(clock, state, inactiveConfig)]
    ),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}

class SexyScrollable extends React.Component {
  state = { night: false };

  constructor(props) {
    super(props);
    this.night = new Animated.Value(false);
    this.animationControl = runSpring(new Value(0), 1, 0, this.night);

    this.translateX = interpolate(this.animationControl, {
      inputRange: [0, 1],
      outputRange: [0, stopage]
    });

    this.opacity1 = interpolate(this.animationControl, {
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    this.translateCloud = interpolate(this.animationControl, {
      inputRange: [0, 0.5, 1],
      outputRange: [
        2 * (borderRadius + padding),
        width - padding,
        2 * (borderRadius + padding)
      ]
    });

    this.animationControl2 = runTiming(new Value(0), 1, 0, this.night);
    this.translateText = interpolate(this.animationControl2, {
      inputRange: [0, 1],
      outputRange: [0, 400]
    });

    this.translateText2 = interpolate(this.animationControl2, {
      inputRange: [0, 1],
      outputRange: [400, 0]
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
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <View />

        <View style={{ alignSelf: "stretch", alignItems: "center" }}>
          <Animated.Text
            style={[
              styles.heading,
              {
                transform: [
                  { translateY: this.translateText },
                  {
                    translateX: sqrt(
                      sub(
                        multiply(-1, pow(this.translateText, 2)),
                        multiply(-800, this.translateText)
                      )
                    )
                  }
                ]
              }
            ]}
          >
            Day Mode
          </Animated.Text>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignSelf: "stretch",
              alignItems: "center"
            }}
          >
            <Animated.Text
              style={[
                styles.heading,
                {
                  transform: [
                    { translateY: this.translateText2 },
                    {
                      translateX: multiply(
                        sqrt(
                          sub(
                            multiply(-1, pow(this.translateText2, 2)),
                            multiply(-800, this.translateText2)
                          )
                        ),
                        -1
                      )
                    }
                  ]
                }
              ]}
            >
              Night Mode
            </Animated.Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.scrollable}
          activeOpacity={1}
          onPress={this.ontoggle}
        >
          <Animated.View
            style={{ transform: [{ translateX: this.translateX }], zIndex: 2 }}
          >
            <Animated.View
              style={{ opacity: this.opacity1, shadowColor: "#FDB813" }}
            >
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
              <Image
                style={{
                  height: 1.7 * borderRadius,
                  width: 1.7 * borderRadius
                }}
                source={require("./data/moon.png")}
              />
            </Animated.View>
          </Animated.View>
          <Animated.Image
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: this.animationControl
            }}
            source={require("./data/abc.gif")}
          />
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "#00BFFF",
              opacity: this.opacity1,
              paddingVertical: 10
            }}
          >
            <Animated.View
              style={{
                transform: [{ translateX: this.translateCloud }]
              }}
            >
              <SvgUri
                width={40}
                height={40}
                source={require("./data/cloud.svg")}
              />
            </Animated.View>

            <Animated.View>
              <SvgUri
                width={25}
                height={25}
                style={{
                  alignSelf: "flex-end",
                  paddingRight: 50,
                  opacity: 0.6
                }}
                source={require("./data/cloud.svg")}
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

    overflow: "hidden"
  },
  heading: {
    fontWeight: "700",
    fontSize: 40
  }
};

export default SexyScrollable;
