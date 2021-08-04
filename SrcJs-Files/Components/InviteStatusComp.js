import React, { Component } from 'react'
import { View } from 'react-native-animatable';
import mycolor from '../Constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Contacts from './Contacts';
import Trans from '../Translation/translation';

export default class InviteStatusComp extends Component {

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
      <View style={{ flex: 1, backgroundColor: mycolor.pink }}>
        <this.Tab.Navigator
          tabBarOptions={this.tabBarOptions}>
          <this.Tab.Screen name={Trans.translate('all')}
            children={() => <Contacts type="all" navigation={this.props.navigation} participants={this.props.participants} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen
            name={Trans.translate('seen')}
            children={() => <Contacts type="seen" navigation={this.props.navigation} participants={this.props.participants} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen name={Trans.translate('delivered')}
            children={() => <Contacts type="delivered" navigation={this.props.navigation} participants={this.props.participants} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen name={Trans.translate('sent')}
            children={() => <Contacts type="sent" navigation={this.props.navigation} participants={this.props.participants} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen name={Trans.translate('pending')}
            children={() => <Contacts type="pending" navigation={this.props.navigation} participants={this.props.participants} />}
          >
          </this.Tab.Screen>
        </this.Tab.Navigator>
      </View>
    );
  }

}