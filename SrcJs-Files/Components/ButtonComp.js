import React, { Component } from "react";
import { StyleSheet, Text, ActivityIndicator, View,TouchableOpacity } from 'react-native';
import mycolor from "../Constants/Colors";
export default class ButtonComp extends Component {
  render() {
    let view = this.props.isloading ? (
      <View style={{ alignSelf: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={this.props.textcolor} />
      </View>
    ) : (
        <Text style={[this.props.textstyle,{textAlign: "center",fontSize:16,fontWeight:'bold'}]}>{this.props.text}</Text>
      )
    return (
      <TouchableOpacity
        style={[styles.loginButton, this.props.style || {}]}
        onPress={this.props.isloading ? null : this.props.onPress}>
        {view}
      </TouchableOpacity>
    );
  }

}
const styles = StyleSheet.create({
  loginButton: {
    flexDirection: "row",
    backgroundColor: mycolor.pink,
    borderRadius: 5,
    borderColor: mycolor.pink,
    borderWidth: 1.1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  
  },
})
