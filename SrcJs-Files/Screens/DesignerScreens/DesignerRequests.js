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
import { Text } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Prefs from '../../Prefs/Prefs'
import Keys from '../../Constants/keys'
import ApiCalls from '../../Services/ApiCalls'
import { Alert } from 'react-native';


export default class DesignerRequests extends Component {

  state = {
    isEnabled: true
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



  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.pink }}>
        <HeaderComp style={{}} title={Trans.translate('requests')} titlepos='center' textsize={20} textfonts='bold' tintColor="#fff" rightBtn={require('../../../assets/logout.png')} rightBtnClicked={() => this.logout()} />

        <View style={{ backgroundColor: mycolor.pink, height: 40, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>

          <Text style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Availablity</Text>

          <Switch
            style={{ position: 'absolute', right: 10 }}
            trackColor={{ false: mycolor.lightgray, true: mycolor.lightgreen }}
            thumbColor={this.state.isEnabled ? mycolor.green : mycolor.txtGray}
            ios_backgroundColor={mycolor.white}

            onValueChange={() => this.ontogglechange()}
            value={this.state.isEnabled}
          />

        </View>
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
  componentDidMount() {
    this.getData()
  }
  async getData() {
    var userdata = await Prefs.get(Keys.userData);
    var parsedata = JSON.parse(userdata)
    this.setState({ isEnabled: parsedata.availability == '0' ? true : false })
  }

  async ontogglechange() {
    await this.setState({ isEnabled: !(this.state.isEnabled) })
    this.setdesigneravailablity()
  }

  async setdesigneravailablity() {
    var userdata = await Prefs.get(Keys.userData);
    var parsedata = JSON.parse(userdata)
    console.log(parsedata)
    let availability=   this.state.isEnabled ? 'yes' : 'no'
    let query = '?user_id='+parsedata.id+'&trigger='+availability
  
    console.log("Query" + query)
    ApiCalls.getGenericCall("toggle_availability", query).then(data => {
      if (data.status == true) {

        var userdetails=parsedata
        userdetails.availability = this.state.isEnabled ? "0" : "1"
        console.log("USER DETAILS: "+typeof userdetails)
        Prefs.save(Keys.userData, JSON.stringify(userdetails))
      } else {
        this.setState({ isLoading: false, isFetching: false })
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.setState({ isLoading: false, isFetching: false })
      Alert.alert('Error', JSON.stringify(error));
    }
    )
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

        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'LandingScreen' }],
        });
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);

        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'LandingScreen' }],
        });
      }
    } else {
      // this.props.navigation.dispatch(
      //     StackActions.pop(1)
      // )

      if (Platform.OS === 'android') {
        await AsyncStorage.clear();

        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'LandingScreen' }],
        });
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);

        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'LandingScreen' }],
        });
      }
    }
  }

}