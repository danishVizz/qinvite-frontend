import React, { Component } from 'react'
import { View } from 'react-native-animatable';
import mycolor from '../Constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../Screens/Events'
import HeaderComp from '../Components/HeaderComp'
import { SafeAreaView } from 'react-native-safe-area-context';
import Trans from '../Translation/translation';

export default class TabNavComp extends Component {


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
        <HeaderComp style={{}} title={Trans.translate('events')} textsize={20} textfonts='bold' rightBtn={require('../../assets/icon_search.png')} tintColor='white'rightBtnClicked={()=>this.props.navigation.navigate('SearchScreen')} />
        <this.Tab.Navigator
          tabBarOptions={this.tabBarOptions}>
          <this.Tab.Screen name={Trans.translate('all')}
            //  component={Events}
            children={() => <Events type="All" navigation={this.props.navigation}/>}
            >
          </this.Tab.Screen>

          <this.Tab.Screen
          
         
          name={Trans.translate('active')}
              // component={Events}
        
            children={() => <Events type="Active"  navigation={this.props.navigation}/>}
            >
          </this.Tab.Screen>
          <this.Tab.Screen name={Trans.translate('closed')}
              // component={Events}
            children={() => <Events type="Closed" navigation={this.props.navigation} />}
            >
          </this.Tab.Screen>

        </this.Tab.Navigator>
      </SafeAreaView>

    );
  }

}