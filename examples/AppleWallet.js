import React from 'react';
import { View, SafeAreaView, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import cards from './data/cards';


const cardHeight = 250;
const cardTitleOffset = 45;
const cardPadding = 10;

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

    render() {
      const { y } = this.state;
      return (
        <SafeAreaView style={styles.root}>
          <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
              {
                cards.map((card, i) => {
                  const translateY = y.interpolate({
                    inputRange: [-cardHeight, 0, cardPadding * 7],
                    outputRange: [cardHeight * i, (cardHeight - cardTitleOffset) * -i, (cardHeight - 10) * -i],
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
            <Animated.ScrollView
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { y },
                    },
                  },
                ],
              )}
            />
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
  card: {
    height: cardHeight,
    borderRadius: 10,
  },
});

export default AppleWallet;
