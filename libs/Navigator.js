import React from 'react' ;
import { StyleSheet, View, Animated, Dimensions, PanResponder } from 'react-native' ;

const { width } = Dimensions.get('window');


const buildScreenConfig = ( children=[] ) => {

  const config = {} ;

  children.forEach(child => {
    config[child.props.name] = { key:child.props.name, component:child.props.component } ;

  }) ;

  return config ;
}


export const Route = () => null ;

export class Navigator extends React.Component {

  _animatedValue = new Animated.Value(0);

  _panResponder = PanResponder.create({

    onMoveShouldSetPanResponder: (evt, gestureState) => {

      const isFirstScreen =  this.state.stack.length === 1 ;
      const isFarLeft  = evt.nativeEvent.pageX < Math.floor(width * 0.25) ;

      if(!isFirstScreen && isFarLeft)
        return true ;
      return false ;
    },

    onPanResponderMove: (evt, gestureState) => {
      this._animatedValue.setValue(evt.nativeEvent.pageX)

    },

    onPanResponderTerminationRequest: (evt, gestureState) => true ,

    onPanResponderRelease: (evt, gestureState) => {

      const transXValue = evt.nativeEvent.pageX ;

      if(transXValue >=  width/2) this.handlePop();

      else {
        Animated.timing(this._animatedValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }


    },

    onPanResponderTermination: (evt, gestureState) => {

    },

  });

  constructor(props){
    super(props);

    const screenConfig = buildScreenConfig(props.children) ;
    const initialScreenName = props.children[0].props.name;

    this.state = { stack:[screenConfig[initialScreenName]], screenConfig } ;

  }


  handlePop = () => {

    Animated.timing(this._animatedValue,
      {
        toValue:width,
        duration:300,
        usingNativeDriver:true

      }
    ).start(()=>{
      this.setState(state => {
        this._animatedValue.setValue(0);
        const { stack } = state ;

        if(stack.length > 1 )
          return { ...state, stack: stack.slice(0,stack.length-1)} ;

        return state ;
      }) ;
    })


  }


  handlePush = (screenName) => {


    this.setState(state => ({
      ...state ,
      stack: [ ...state.stack, state.screenConfig[screenName] ]
    }), ()=> {

      this._animatedValue.setValue(width);
      Animated.timing(this._animatedValue,
        {
          toValue:0,
          duration:300,
          usingNativeDriver:true
        }
      ).start();

    }
   )
  }

  render(){
    return (
      <View style={styles.container} { ...this._panResponder.panHandlers}>
        {
          this.state.stack.map((screen, index) => {
            const CurrentScreen = screen.component;

            const screenStyle = [ styles.screen ] ;

            if( index>0 && index === this.state.stack.length-1)
              screenStyle.push({ transform:[{ translateX:this._animatedValue }]})


            return (
              <Animated.View  key={screen.key} style={screenStyle}>
                <CurrentScreen navigator={{ push:this.handlePush, pop:this.handlePop }} />
              </Animated.View>
            )
          })
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row'
  },

  screen:{
    ...StyleSheet.absoluteFillObject,
    flex:1,
  }
})
