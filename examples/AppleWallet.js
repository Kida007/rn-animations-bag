import React from 'react';
import { View, SafeAreaView, Animated, StyleSheet, Dimensions, PanResponder } from 'react-native';
import cards from './data/cards';


const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;
const { height } = Dimensions.get('window');


class Card extends React.Component {
  render() {
    const { color } = this.props;
    return <View style={[styles.card, { backgroundColor: color }]} />;
  }
}


// eslint-disable-next-line react/no-multi-comp
class AppleWallet extends React.Component {
    state = {
      y: new Animated.Value(0),
    };


    constructor(props) {
      super(props);

      const { y } = this.state;

      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          y.setValue(-1 * gestureState.dy);
          console.log(y);
        },
        onPanResponderRelease: () => {
          Animated.timing(y, {
            duration: 100,
            toValue: 0,
          }).start();
        },
      });
    }

    render() {
      const { y } = this.state;
      return (
        <SafeAreaView style={styles.root}>
          <View style={styles.container} {...this.panResponder.panHandlers}>
            <View style={StyleSheet.absoluteFill}>
              {
                cards.map((card, i) => {
                  const translateY = y.interpolate({
                    inputRange: [-(cardHeight * 10), 0, 5 * cardPadding],
                    outputRange: [cardHeight * 10 * (i / 1.5), (cardHeight - cardTitle) * -i, (cardHeight - cardPadding) * -i],
                    extrapolateRight: 'clamp',
                  });
                  return (
                    <Animated.View key={card.name} style={{ transform: [{ translateY }] }}>
                      <Card {...card} />
                    </Animated.View>
                  );
                })
                }
            </View>
          </View>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    margin: 16,
    marginTop: 35,
  },
  container: {
    flex: 1,
  },
  content: {
    height: height * 2,
  },
  card: {
    height: cardHeight,
    borderRadius: 10,
  },
});

export default AppleWallet;
