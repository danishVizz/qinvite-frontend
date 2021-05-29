import React, { Component } from "react";
import { StyleSheet, StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native';
import mycolor from "../Constants/Colors";
export default class StatusBarComp extends Component {
  render() {
    return (
      // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      <View style={{backgroundColor: this.props.backgroundColor}}>
        <SafeAreaView>
          <StatusBar backgroundColor={this.props.backgroundColor} />
        </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  
})
