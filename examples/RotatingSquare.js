//@flow
import React, { Component } from 'react' ;
import { View, Text, Animated, Easing} from 'react-native' ;

class RotatingSquare extends Component<{}> {

  animatedValue : number ;
  rotationValue : Animated.Value ;

  constructor(){
    super();
    this.animatedValue = new Animated.Value(0);
    this.rotationValue = new Animated.Value(0);

  }

  componentDidMount(){
    this.animate();
  }


  animated2(){
    this.rotationValue.setValue(0);
    Animated.timing(
      this.rotationValue,{
        toValue:1,
        duration:1500,
        easing:Easing.linear,
        useNativeDriver:true,
      }
    ).start(() => this.animated2());


  }

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(
      this.animatedValue,{
        toValue:1,
        duration:1500,
        easing: Easing.linear,
        useNativeDriver:true
      }
    ).start(()=>this.animated2())
  }

  render(){

    const rotateValue = this.rotationValue.interpolate({
      inputRange:[0, 0.5 ,1],
      outputRange:['0deg','180deg','360deg']
    })

    return(
      <View style={{ backgroundColor:'#ffffff', flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{ flexDirection:'row'}}>
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
        </View>

        <View style={{ flexDirection:'row'}}>
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
        </View>

        <View style={{ flexDirection:'row'}}>
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
          <Animated.View style={{ height:30, width:30, backgroundColor:'#1A3365', borderRadius:3, opacity:this.animatedValue,margin:5, transform:[{ rotateY:rotateValue}]}} />
        </View>
      </View>
    )
  }
}


export default RotatingSquare ;
