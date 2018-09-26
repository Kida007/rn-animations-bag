import React from 'react'  ;
import { View, Easing, Animated } from 'react-native' ;

class Spring extends React.Component {


  constructor(){
    super();
    this.springValue = new Animated.Value(0.3) ;
  }

  spring(){
    this.springValue.setValue(0.3) ;

    Animated.spring(
      this.springValue,
      {
        toValue:1,
        friction:2
      }
    ).start();

  }

  componentDidMount(){
    this.spring();
  }

  render(){

    return(
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <View>
          <Animated.View style={{ height:100, width:100, backgroundColor:'#1A3365', borderRadius:3, transform:[{scale:this.springValue}] }} />
        </View>
      </View>
    )
  }

}


export default Spring ;
