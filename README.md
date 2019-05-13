# rn-animations-bag

this project contains some of the coolest RN animation examples/ excercises to start with.
contains many examples with React Native's *Animated*, *PanResponder* and *react-native-svg*

How to use :

1) clone it 
2) you can try any example by importing it and rendering it in App.js :
```
import {
  RotatingSquare,
  Spring,
  SequenceAnimation,
  FlowClass,
  NavigationScreens,
  DraggableBox,
  BottomDragModal,
  FbCircles,
  SvgBasic,
} from './examples'

...
render(){
    return <SvgBasic />;
}
...
```
3. install and link libraries
```
npm install or yarn
react-native link react-native-svg
react-native link react-native-reanimated
```
4. run it
```
react-native run-ios
```
