import React, { Component } from 'react'
import { View } from 'react-native-animatable';
import mycolor from '../Constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../Screens/Events'
import HeaderComp from '../Components/HeaderComp'
import { SafeAreaView } from 'react-native-safe-area-context';
import Trans from '../Translation/translation';

export default class TabNavComp extends Component {

  constructor(props) {
    super(props);
    this.eventRef = React.createRef()
  }

  Tab = createMaterialTopTabNavigator();
  tabBarOptions = {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    labelStyle: { textTransform: "none" },
    indicatorStyle: { backgroundColor: mycolor.pink, height: '100%', },
    style: { backgroundColor: mycolor.pink, marginTop: 10, elevation: 0, },
    indicatorStyle: {
      borderBottomColor: mycolor.white,
      borderBottomWidth: 2
    }
  }

  guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: mycolor.pink }}>
        <HeaderComp title={Trans.translate('events')} textsize={20} textfonts='bold' rightBtn={require('../../assets/icon_search.png')} tintColor='white' deleteBtn={true} deleteBtnClicked={() => { this.eventRef.current.deleteAllAlert() }} rightBtnClicked={() => this.props.navigation.navigate('SearchScreen')} />
        <this.Tab.Navigator
          tabBarOptions={this.tabBarOptions}>
          <this.Tab.Screen
            name={Trans.translate('all')}
            children={() => <Events ref={this.eventRef} type="All" navigation={this.props.navigation} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen
            name={Trans.translate('active')}
            children={() => <Events ref={this.eventRef} type="Active" navigation={this.props.navigation} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen
            name={Trans.translate('closed')}
            children={() => <Events ref={this.eventRef} type="Closed" navigation={this.props.navigation} />}
          >
          </this.Tab.Screen>
        </this.Tab.Navigator>
      </View>
    );
  }

  // deleteAll = () => {
  //   console.error("DELETE ALL")

  // }
}