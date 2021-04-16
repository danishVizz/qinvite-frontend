import React, { Component } from 'react'
import { View } from 'react-native-animatable';
import mycolor from '../../Constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Events from '../../Screens/DesignerScreens/AllRequests'
import AllRequests from '../../Screens/DesignerScreens/AllRequests'
import HeaderComp from '../../Components/HeaderComp'
import { SafeAreaView } from 'react-native-safe-area-context';
import Trans from '../../Translation/translation';

export default class DesignerRequests extends Component {


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

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.pink }}>
        <HeaderComp style={{}} title={Trans.translate('requests')} titlepos='center' textsize={20} textfonts='bold' />
        <this.Tab.Navigator
          tabBarOptions={this.tabBarOptions}>
          <this.Tab.Screen name="All"
            //  component={Events}
            children={() => <AllRequests type="All" navigation={this.props.navigation}/>}
            >
          </this.Tab.Screen>

          <this.Tab.Screen name="Accepted"
              // component={Events}
            children={() => <AllRequests type="Accepted"  navigation={this.props.navigation}/>}
            >
          </this.Tab.Screen>
          <this.Tab.Screen name="Rejected"
              // component={Events}
            children={() => <AllRequests type="Rejected" navigation={this.props.navigation} />}
            >
          </this.Tab.Screen>

        </this.Tab.Navigator>
      </SafeAreaView>

    );
  }

}