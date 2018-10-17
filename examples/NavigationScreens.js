import React from 'react' ;
import { StyleSheet, View, Button, LayoutAnimation } from 'react-native' ;
import { Navigator, Route } from  '../libs/Navigator' ;

const  Screen1 = (props) =>  {



    const { navigator } = props ;

    return(
      <View style={[ styles.screen, { backgroundColor:'#FFFFFF'}]}>
        <Button
          title='screen 2'
          onPress={()=>navigator.push('Screen2')}
        />

        <Button
          title='pop'
          onPress={()=>navigator.pop()}
        />
      </View>
    );


}

class  Screen2 extends React.Component {



  render(){

    const { navigator } = this.props ;

    return(
      <View style={[ styles.screen, { backgroundColor:'#00C15D'}]}>
        <Button
          title='screen 3'
          onPress={()=>navigator.push('Screen3')}
        />

        <Button
          title='pop'
          onPress={()=>navigator.pop()}
        />
      </View>
    )
  }

}


class  Screen3 extends React.Component {



  render(){

    const { navigator } = this.props ;

    return(
      <View style={[ styles.screen, { backgroundColor:'#B2B3B5'}]}>
        <Button
          title='pop'
          onPress={()=>navigator.pop()}
        />
      </View>
    )
  }

}



export default class NavigationScreens extends React.Component {
  render(){

    console.log(Screen1) ;
    return(
      <Navigator>
        <Route name='Screen1' component={Screen1}/>
        <Route name='Screen2' component={Screen2}/>
        <Route name='Screen3' component={Screen3}/>
      </Navigator>
    )
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
