
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Packages from '../Screens/Packages'
import Profile from '../Screens/Profile'
import TopTabNav from '../Components/TabNavComp'
import mycolor from '../Constants/Colors'
import { Icon } from "react-native-elements";
import Trans from '../Translation/translation'
import { useLinkProps } from '@react-navigation/native';




const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const BottomNavigator = (props) => {
  return (
    <TopTabNav navigation={props.navigation}></TopTabNav>
  );
}

export const CombineComp = (props) => {
  return (

    <Tab.Navigator
    
      activeColor="#F54260"
      inactiveColor="#D9D9D9"
      barStyle={{ backgroundColor: mycolor.white, elevation: 10 }}>
      <Tab.Screen name="Home" component={BottomNavigator} options={{
        tabBarLabel: Trans.translate('Home'),
        tabBarIcon: ({ color }) => (
          <Icon
            color={color}
            name="home"
          />)
      }}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: undefined }),
      })}
      />
      {/* <Image
            resizeMode="contain"
            source={require('../../assets/icon_phone.png')} 
            style={{tintColor:'black',marginBottom:0,height:20,width:20}}
          /> */}
      <Tab.Screen name="Packages" component={Packages } options={{
        tabBarLabel: Trans.translate('TabPackages'),
        tabBarIcon: ({ color }) => (
          <Icon
            color={color}
            name="payment"
          />
        )
      }} />

      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabel: Trans.translate('Profile'),
        tabBarIcon: ({ color }) => (
          <Icon
            color={color}
            name="person"
          />
        )
      }} />
    </Tab.Navigator>


  );
}

export default CombineComp;