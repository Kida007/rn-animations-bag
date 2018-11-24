/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, StyleSheet, Image, StatusBar, Animated, Dimensions } from 'react-native';
import Svg, { Rect, Defs, ClipPath } from 'react-native-svg';
import waveform from './data/waveform.json';


const barWidth = 4;
const barMargin = 2;
const wWidth = Dimensions.get('window').width;
const offset = wWidth / 2;
const AnimatedRect = Animated.createAnimatedComponent(Rect);

class Waveform extends React.Component {
  render() {
    const { wave, color, progress } = this.props;
    const width = wave.width * (barWidth + barMargin);
    const height = (1.61 * wave.height) + barMargin;
    const x = progress ? progress.interpolate({
      inputRange: [0, width - wWidth],
      outputRange: [-width + offset, 0],
    }) : 0;
    console.log(width, height);
    return (
      <Svg width={width} height={height}>
        <Defs>
          <ClipPath id="progress">
            <AnimatedRect {...{ width, height, x }} />
          </ClipPath>
        </Defs>
        {
          wave.samples.map((sample, key) => (
            <React.Fragment key={key}>
              <Rect x={key * (barWidth + barMargin) + offset} y={wave.height - sample} height={sample} fill={color} width={barWidth} clipPath="url(#progress)" />
              <Rect x={key * (barWidth + barMargin) + offset} y={wave.height + barMargin} height={0.61 * sample} fill={color} width={barWidth} opacity={0.5} clipPath="url(#progress)" />
            </React.Fragment>
          ))
        }
      </Svg>
    );
  }
}


class SoundCloudPlayer extends React.Component {
  state = {
    x: new Animated.Value(0),
  }

  render() {
    const { x } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image source={require('../pic.jpg')} style={styles.cover} />
        <View style={styles.progress}>
          <Animated.ScrollView
            horizontal
            bounce={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x },
                  },
                },
              ],
            )}
          >
            <Waveform color="white" wave={waveform} />
            <View style={StyleSheet.absoluteFill}>
              <Waveform color="#ee742f" progress={x} wave={waveform} />
            </View>
          </Animated.ScrollView>
        </View>
      </View>
    );
  }
}

export default SoundCloudPlayer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  cover: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },

  progress: {
    flex: 0.5,
  },

});
