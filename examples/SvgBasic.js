/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { SafeAreaView, View, Animated, Easing, Dimensions, PanResponder, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class SvgCircle extends React.Component {
  render() {
    const { radius, opacity, centre } = this.props;
    return (
      <Svg height={height} width={width}>
        <Circle
          cx={centre.x}
          cy={centre.y}
          r={radius}
          fill="lightblue"
          fillOpacity={opacity}
        />
      </Svg>
    );
  }
}


const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle);

class SvgBasic extends React.Component {
  state = { x: width / 2, y: (height / 3) }

  constructor(props) {
    super(props);
    this.panResponder = new PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        this.setState({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
      },
    });
    this.animatedRadius = new Animated.Value(12);
    this.animatedOpacity = new Animated.Value(1);
  }

  componentDidMount() {
    this.animateCircle();
  }

  animateCircle() {
    this.animatedOpacity.setValue(1);
    this.animatedRadius.setValue(12);
    Animated.timing(this.animatedRadius, {
      toValue: 50,
      duration: 800,
      easing: Easing.linear,
    }).start();
    Animated.timing(this.animatedOpacity, {
      toValue: 0.05,
      duration: 800,
      easing: Easing.linear,
    }).start(() => this.animateCircle());
  }

  render() {
    const { x, y } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} {...this.panResponder.panHandlers}>
        <Text style={{ fontSize: 28, fontWeight: '300', color: 'skyblue' }}>Tap Anywhere</Text>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          <AnimatedSvgCircle radius={this.animatedRadius} opacity={this.animatedOpacity} centre={{ x, y }} />
        </View>
      </SafeAreaView>
    );
  }
}

export default SvgBasic;
