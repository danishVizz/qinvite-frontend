
import React, { Component, useState } from "react";
import TextInputComp from '../Components/TextInputComp'
import mycolor from '../Constants/Colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Platform,
  SafeAreaView,
  Alert,
  Keyboard
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class TermsConditions extends Component {

  state = {}
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container} >
          <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
            <TouchableOpacity style={styles.backIconView} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.backIcon} source={require('../../assets/icon_back.png')}></Image>
            </TouchableOpacity>
            <View style={styles.logocontainer}>
              <Image style={styles.image} source={require('../../assets/icon_logo.png')}></Image>
            </View>
            <View style={styles.innerview}>
              <Text style={styles.heading}>{'Terms & Conditions'}</Text>
              <Text style={styles.content}>
                {'Help protect your website and its users with clear and fair website terms and conditions. These terms and conditions for a website set out key issues such as acceptable use, privacy, cookies, registration and passwords, intellectual property, links to other sites, termination and disclaimers of responsibility. Terms and conditions are used and necessary to protect a website owner from liability of a user relying on the information or the goods provided from the site then suffering a loss. Making your own terms and conditions for your website is hard, not impossible, to do. It can take a few hours to few days for a person with no legal background to make. But worry no more; we are here to help you out.Help protect your website and its users with clear and fair website terms and conditions. These terms and conditions for a website set out key issues such as acceptable use, privacy, cookies, registration and passwords, intellectual property, links to other sites, termination and disclaimers of responsibility. Terms and conditions are used and necessary to protect a website owner from liability of a user relying on the information or the goods provided from the site then suffering a loss. Making your own terms and conditions for your website is hard, not impossible, to do. It can take a few hours to few days for a person with no legal background to make. But worry no more; we are here to help you out. All you need to do is fill up the blank spaces and then you will receive an email with your personalized terms and conditions. All you need to do is fill up the blank spaces and then you will receive an email with your personalized terms and conditions.'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );

  }
}

const styles = StyleSheet.create({
  logocontainer: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerview: {
    backgroundColor: "#fff",
    paddingLeft: 33,
    paddingRight: 33,
    marginBottom: 30
  },
  backIconView: {
    width: '100%',
    marginTop: 10,
    marginLeft: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#000',
  },
  image: {
    marginBottom: 30,
    height: 95,
    width: 162,
    resizeMode: 'contain'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    marginTop: 20,
    textAlign: 'justify'
  }
});