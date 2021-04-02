import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, Image, ActivityIndicator, View } from 'react-native';
import mycolor from "../Constants/Colors";
export default class HeaderComp2 extends Component {
  render() {
    return (
    
      <View style={[styles.containerView, this.props.headerStyle,]}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }} onPress={this.props.leftBtnClicked}>
          <Image style={{ width: 30, height: 30, left: this.props.fromleft, tintColor: this.props.lefttintColor }} source={this.props.leftBtn}></Image>
        </TouchableOpacity>
       
        <View style={{flex: 6}}>
          <View style={{justifyContent: 'center' ,alignSelf:this.props.selfalign}}>
          <TouchableOpacity  onPress={this.props.titleclick}>
            <Text style={{ fontSize: this.props.textsize, fontWeight: this.props.textfonts, color: this.props.titleColor || mycolor.white, textAlign: this.props.titlepos }}>{this.props.title}</Text>
          </TouchableOpacity>
          </View>
         
        </View >
        <View style={{flex: 1}}>
      
        <TouchableOpacity style={{justifyContent: 'center', paddingRight: 10 }} onPress={this.props.rightBtnClicked}>
        <Text style={{ fontSize: this.props.textsize, fontWeight: this.props.righttextfonts, color: this.props.titleColor || mycolor.white, textAlign: 'right' }}>{this.props.righttitle}</Text>
          </TouchableOpacity>
          </View>
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
