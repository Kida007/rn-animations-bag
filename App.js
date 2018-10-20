
import * as React from 'react'
import { RotatingSquare, Spring, SequenceAnimation, FlowClass, NavigationScreens, DraggableBox } from './examples' ;
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation' ;

type Props = {}

class App extends React.Component<Props> {

  render(){
    return(
      <DraggableBox />
    )
  }
}


export default App ;
