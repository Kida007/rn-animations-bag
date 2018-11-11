import * as React from 'react';
import { View, Text } from 'react-native';

type Props = {
  foo: number,
  bar?: string
}

class FlowClass extends React.Component<{ foo:number, bar?:string}> {
  render() {
    return (
      <View>
        <Text style={{ fontSize: this.props.foo }}>{this.props.bar}</Text>
      </View>
    );
  }
}

export default FlowClass;
