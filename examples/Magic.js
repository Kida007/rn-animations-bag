import React from "react";
import {
  View,
  Animated,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Text as NT
} from "react-native";
//import Animated from "react-native-reanimated";
import { Icon } from "react-native-elements";

const width = Dimensions.get("window").width;

import Svg, { Polygon, Text } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// const {
//   divide,
//   greaterThan,
//   set,
//   cond,
//   startClock,
//   stopClock,
//   clockRunning,
//   block,
//   spring,
//   add,
//   debug,
//   Value,
//   Clock,
//   interpolate
// } = Animated;

// runTiming = (translation, dest) => {
//   console.log("hello");
//   const clock = new Clock();

//   const state = {
//     finished: new Value(0),
//     velocity: new Value(0),
//     position: translation,
//     time: new Value(0)
//   };

//   const config = {
//     damping: 10,
//     mass: 0.3,
//     stiffness: 150,
//     overshootClamping: false,
//     restSpeedThreshold: 0.001,
//     restDisplacementThreshold: 0.001,
//     toValue: dest
//   };

//   return block([
//     debug("starting", translation),
//     cond(clockRunning(clock), 0, [
//       set(state.finished, 0),
//       set(state.time, 0),
//       startClock(clock)
//     ]),
//     spring(clock, state, config),
//     cond(state.finished, [debug("stopped", translation), stopClock(clock)]),
//     state.position
//   ]);
// };

const notchOffset = 80;

class Magic extends React.Component {
  constructor(props) {
    super(props);
    this.animationControl = new Animated.Value(0);
  }

  componentDidMount() {}

  render() {
    const rotateDegree = this.animationControl.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "45deg", "0deg"],
      extrapolate: "clamp"
    });

    const zIndex = this.animationControl.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [2, 1, 0],
      extrapolate: "clamp"
    });

    const opacity = this.animationControl.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1, 0.2],
      extrapolate: "clamp"
    });

    const translateX = this.animationControl.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -70, 0],
      extrapolate: "clamp"
    });

    const notchX = this.animationControl.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0 * notchOffset, -1 * notchOffset],
      extrapolate: "clamp"
    });

    const notchY = this.animationControl.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 0, 200]
    });

    const translateY = this.animationControl.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 50],
      extrapolate: "clamp"
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#292836" }}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          style={styles.container}
          onScroll={e => {
            const scrollValue = e.nativeEvent.contentOffset.y / 200;
            this.animationControl.setValue(scrollValue);
          }}
          scrollEventThrottle={16}
        >
          <View />
          <View style={styles.header} />
          <View style={{ backgroundColor: "#292836" }}>
            <AnimatedSvg
              height="95"
              width={width + notchOffset}
              style={{
                transform: [{ translateX: notchX }],
                zIndex: 1,
                top: notchY
              }}
            >
              <Polygon
                ref={ref => (this.polygon = ref)}
                points={`0,${notchOffset} 0,95 ${width +
                  notchOffset},95 ${width + notchOffset},0 ${notchOffset},0`}
                fill="#fff"
              />
              <Text
                fill="black"
                fontSize="20"
                fontWeight="bold"
                x="210"
                y="30"
                textAnchor="middle"
              >
                Stranger Things
              </Text>

              <Text
                fill="gray"
                fontSize="14"
                x="194"
                y="60"
                textAnchor="middle"
              >
                Drama. Fantasy.
              </Text>
            </AnimatedSvg>
            <Animated.Image
              style={[
                styles.image,
                {
                  transform: [
                    { rotateZ: rotateDegree },
                    { translateX },
                    { translateY }
                  ],
                  zIndex,
                  opacity
                }
              ]}
              source={require("./data/stranger.jpg")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "#fff",
              paddingTop: 30
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Icon name="stars" type="material" color="gray" size={40} />
              <NT style={{ color: "gray", marginVertical: 6 }}>89%</NT>
            </View>
            <View style={{ alignItems: "center" }}>
              <Icon name="tv" type="font-awesome" color="gray" size={40} />
              <NT style={{ color: "gray", marginVertical: 6 }}>Netflix</NT>
            </View>
            <View style={{ alignItems: "center" }}>
              <Icon name="user" type="antdesign" color="gray" size={40} />
              <NT style={{ color: "gray", marginVertical: 6 }}>TV-14</NT>
            </View>
            <View style={{ alignItems: "center" }}>
              <Icon name="timer" type="material" color="gray" size={40} />
              <NT style={{ color: "gray", marginVertical: 6 }}>52 min</NT>
            </View>
          </View>
          <NT
            style={{
              backgroundColor: "#fff",
              padding: 25,
              fontSize: 14,
              color: "#272B34"
            }}
          >
            This thrilling Netflix original drama stars Golden Globe-winning
            actress Winona Ryder as Joyce Byers, who lives in a small Indiana
            town in 1989. {"\n"} she launches a terrifying investigation into
            his disappearance with local authorities
          </NT>

          <View style={{ height: 200, backgroundColor: "#fff" }} />
          <View style={{ height: 200, backgroundColor: "#fff" }} />
          <View style={{ height: 200, backgroundColor: "#fff" }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Magic;

const styles = {
  container: {
    flex: 1
  },

  header: {
    height: 200,
    backgroundColor: "#292836"
  },

  image: {
    position: "absolute",
    width: 100,
    height: 138,
    backgroundColor: "orange",
    margin: 20,
    marginTop: -50,
    zIndex: 2,
    borderRadius: 5,
    overflow: "hidden"
  }
};
