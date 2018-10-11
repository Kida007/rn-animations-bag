//@flow
import React from 'react';
import { View, Animated, Easing, StatusBar} from 'react-native' ;

const arr = []
for ( let i=0; i<400; i++) arr.push(i)

class SequenceAnimation extends React.Component<{}> {

   animatedValue: Array<number> ;

  constructor(){
    super();
    this.animatedValue = [] ;
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0) ;
    });

  }


  componentDidMount(){
    this.animate();
  }


  animate(){

    const animations = arr.map(item => {
      return Animated.timing(
        this.animatedValue[item],
        {
          toValue:'1',
          duration:2000
        }
      )
    })

    Animated.stagger(1,animations).start();

  }

  render(){

    const animatedViewlets = arr.map((a,i)=> {
      return <Animated.View key={i} style={[{ opacity:this.animatedValue[a], height:20, width:20, marginLeft:3,backgroundColor:'red',  marginTop:3 }]}/>
    });

    return(
      <View style={{ flexDirection:'row', flexWrap:'wrap', flex:1}}>
        <StatusBar hidden/>
        {animatedViewlets}
      </View>
    );

  }

}


export default SequenceAnimation ;
