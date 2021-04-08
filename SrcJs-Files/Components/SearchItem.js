import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import mycolor from "../Constants/Colors";
import { Divider } from "react-native-paper";




export default class Searchitem extends Component {
  render() {
    return (
      <View stlye={{ flex: 1 }}>
        <TouchableOpacity onPress = {this.props.onPress}>
          <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, marginTop: 17, alignItems: "center" }}>
            <View style={{ flex: 3, alignItems: "flex-start" }}>
              <Text text={this.props.text}></Text>
            </View>
            {/* <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icon
              name="clear"
              style={{ alignSelf: "flex-end" }}
              color={mycolor.lightgray}
              onPress = {this.props.onclear}
            >
            </Icon>
          </View> */}
          </View>
          <Divider style={{ backgroundColor: mycolor.lightgray, width: "100%", height: 1, marginTop: 17 }} />
        </TouchableOpacity>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  loginButton: {
    flexDirection: "row",
    backgroundColor: mycolor.themecolor,
    borderRadius: 12,
    borderColor: mycolor.themecolor,
    borderWidth: 1.1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  },
  imageStyle: {
    width: 92, height: 103, borderRadius: 10
  }
});
