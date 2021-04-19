import React, { Component } from 'react'
import { View } from 'react-native-animatable';
import mycolor from '../Constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../Screens/Events'
import HeaderComp from './HeaderComp'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, TextInput } from 'react-native'
import AllEvents from '../Screens/AllEvents';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Trans from '../Translation/translation';

export default class ReceptionTabComp extends Component {

  state = {
    showFilter: false,
    query:''
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
    console.log("this.props.navigation TABNAV");
    console.log(this.props.navigation);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.pink }}>
        {/* <HeaderComp style={{}} title='Events' textsize={20} textfonts='bold' rightBtn={require('../../assets/icon_search.png')} tintColor='white' /> */}
        <View style={{ backgroundColor: mycolor.pink, padding: 20, paddingBottom: 0 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: 40, alignItems: 'center', borderRadius: 4 }}>
            <Image resizeMode="cover" style={styles.searchImg} source={require('../../assets/icon_search.png')}></Image>
            <TextInput style={{ flex: 4 }} placeholder={Trans.translate('search')} onChangeText={(text) => this.setState({ query: text })}></TextInput>
            <TouchableOpacity onPress={() => this.setState({ showFilter: true })}>
              <Image resizeMode="cover" style={styles.searchImg} source={require('../../assets/filter.png')}></Image>
            </TouchableOpacity>

          </View>

        </View>
        <this.Tab.Navigator
          tabBarOptions={this.tabBarOptions}>
          <this.Tab.Screen name={Trans.translate('all')}
            //  component={Events}
            children={() => <AllEvents query ={this.state.query} type="All" navigation={this.props.navigation} showFilter={this.state.showFilter}/>}
          >
          </this.Tab.Screen>

          <this.Tab.Screen name={Trans.translate('active')}
            // component={Events}
            children={() => <AllEvents query ={this.state.query} type="Active" navigation={this.props.navigation} showFilter={this.state.showFilter} />}
          >
          </this.Tab.Screen>
          <this.Tab.Screen name={Trans.translate('closed')}
            // component={Events}
            children={() => <AllEvents query ={this.state.query} type="Closed" navigation={this.props.navigation} showFilter={this.state.showFilter} />}
          >
          </this.Tab.Screen>

        </this.Tab.Navigator>
      </SafeAreaView>

    );
  }

  // search(s) {
  //   if (s.length >= 3) {
  //     this.setState({ query: s })
  //   }
  // }

  getaccesstochild(query) {
   return query;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center'
  },
  searchImg: {
    width: 20,
    height: 20,
    tintColor: mycolor.lightgray,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 14,
    marginBottom: 14
  }
});