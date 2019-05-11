import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

class AnimatedItem extends React.Component {
  state = { expanded: false };

  onPress = () => {
    this.setState({ expanded: true });
  };

  constructor(props) {
    super(props);
    const animationControl = runTiming(new Value(0), 1);

    this.rotateDegree = interpolate(animationControl, {
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "-90deg", "0deg"]
    });
  }

  render() {
    const { expanded } = this.state;
    const { item } = this.props;

    const itemStyle = expanded ? styles.expandedItem : styles.item;

    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.9}
        style={itemStyle}
        disabled={expanded}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  }
}

class AnimatedFlatlist extends React.Component {
  _renderItem = ({ item }) => {
    return <AnimatedItem item={item} />;
  };

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={["Home", "Work", "Gym", "Pet"]}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FF0080",
    padding: 20
  },

  item: {
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  expandedItem: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFill
  }
};

export default AnimatedFlatlist;

{
  /* <FlatList
          data={["Home", "Work", "Gym", "Pet"]}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          showsVerticalScrollIndicator={false}
        /> */
}
