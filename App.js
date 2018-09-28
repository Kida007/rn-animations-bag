//@flow

import React, { Component } from 'react' ;
import { RotatingSquare, Spring, SequenceAnimation } from './examples' ;
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation' ;

type Props = {

}

class App extends Component<Props> {

  multiply(n1: number,n2: number) :number {
    return n1 * n2 ;
  }

  render(){

    let x: number = 123;

    return(
      <View style={{ justifyContent:'center', alignItems:'center', flex:1}}>
          <Text>{this.multiply(10,10)}</Text>
      </View>
    )
  }
}


export default App ;
