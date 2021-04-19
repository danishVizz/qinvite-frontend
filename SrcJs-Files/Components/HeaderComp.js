import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import mycolor from "../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
export default class HeaderComp extends Component {
  render() {
    return (
      <View style={[styles.containerView, this.props.headerStyle,]}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 0 }} onPress={this.props.leftBtnClicked}>
          <Image style={{ width: 30, height: 30, left: this.props.fromleft, tintColor: this.props.lefttintColor }} source={this.props.leftBtn}></Image>
        </TouchableOpacity>
        <View style={{flex: 5}}>
          <View style={{justifyContent: 'center' ,alignSelf:this.props.selfalign}}>
          <TouchableOpacity  onPress={this.props.titleclick}>
            <Text style={{ fontSize: this.props.textsize, fontWeight: this.props.textfonts, color: this.props.titleColor || mycolor.white, textAlign: this.props.titlepos }}>{this.props.title}</Text>
          </TouchableOpacity>
          </View>
         
        </View>
        <TouchableOpacity style={{ flex: 2, justifyContent: 'center', paddingRight: 18 }} onPress={this.props.rightBtnClicked}>
          <Image style={{width: 20, height: 20, left: 0, tintColor: this.props.tintColor }} source={this.props.rightBtn}></Image>
        </TouchableOpacity>
      </View>

    );
  }

}
const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: mycolor.pink,
    alignItems: 'center'
  }
})
