import React, { Component } from 'react'
import { View } from 'react-native-animatable';
import mycolor from '../../Constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Events from '../../Screens/DesignerScreens/AllRequests'
import AllRequests from '../../Screens/DesignerScreens/AllRequests'
import HeaderComp from '../../Components/HeaderComp'
import { SafeAreaView } from 'react-native-safe-area-context';
import Trans from '../../Translation/translation';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

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
        <HeaderComp style={{}} title={Trans.translate('requests')} titlepos='center' textsize={20} textfonts='bold' tintColor="#fff" rightBtn={require('../../../assets/logout.png')} rightBtnClicked={() => this.logout()} />
        <this.Tab.Navigator
          tabBarOptions={this.tabBarOptions}>
          <this.Tab.Screen name={Trans.translate('all')}
            //  component={Events}
            children={() => <AllRequests type="All" navigation={this.props.navigation} />}
          >
          </this.Tab.Screen>

          <this.Tab.Screen name={Trans.translate('accepted')}
            // component={Events}
            children={() => <AllRequests type="Accepted" navigation={this.props.navigation} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen name={Trans.translate('rejected')}
            // component={Events}
            children={() => <AllRequests type="Rejected" navigation={this.props.navigation} />}
          >
          </this.Tab.Screen>

        </this.Tab.Navigator>
      </SafeAreaView>

    );
  }

  async logout() {
    // AsyncStorage.clear()
    //     .then(() => this.props.navigation.dispatch(
    //         StackActions.popToTop()
    //     ));

    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
        this.props.navigation.dispatch(
          StackActions.pop(1)
        )

        // const pushAction = StackActions.push('LandingScreen');
        // this.props.navigation.dispatch(pushAction);
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
        this.props.navigation.dispatch(
          StackActions.pop(1)
        )

        // const pushAction = StackActions.push('LandingScreen');
        // this.props.navigation.dispatch(pushAction);
      }
    }

  }

}