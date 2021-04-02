import React, { Component } from "react";
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import mycolor from "../Constants/Colors";
export default class TextComp extends Component {
  render() {
    return (
      <Text numberOfLines={this.props.lines}  style={[{color: mycolor.darkgray,includeFontPadding: false}, this.props.textStyle || {}]}>{this.props.text}</Text>
    );
  }

}
