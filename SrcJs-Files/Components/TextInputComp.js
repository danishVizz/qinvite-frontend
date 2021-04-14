import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View, Image, TextInput } from 'react-native';
import mycolor from "../Constants/Colors";
const imagePath = '../../assets/';
export default class TextInputComp extends Component {
  state = {
    backgroundColor: mycolor.lightgray
  }
  render() {
    return (

      <View style={[styles.TextInputView, {
        marginTop: this.props.top == undefined ? 13 : this.props.top,
        borderColor: this.props.empty ? 'red' : this.state.backgroundColor,
        borderWidth: this.props.empty ? 2 : 1.1
      }, this.props.textviewstyle || {}, this.props.style]}>
        <TouchableOpacity onPress={this.props.onPressRightBtn}>
          <Image resizeMode="contain" source={this.props.leftIcon} style={{ width: 22, height: 22, zIndex: 1, tintColor: this.props.tintcolor }} />
        </TouchableOpacity>
      
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.empty ? "grey" : mycolor.lightgray}
          autoCapitalize="none"
          multiline={this.props.multiline || false}
          style={[styles.TextInput, this.props.textinstyle || {}]}
          onBlur={() => this.onBlur()}
          value={(this.props.value)}
          onFocus={() => this.onFocus()}
          selectionColor={mycolor.pink}
          keyboardType={this.props.inputtype}
          onChangeText={this.props.onChangeText}
          editable={(this.props.isEnable === undefined || this.props.isEnable === true) ? true : false}
          secureTextEntry={this.props.isSecureTextEntry} />
        <TouchableOpacity onPress={this.props.onPressEyeBtn}>
          <Image resizeMode="contain" source={this.props.rightIcon}
            style={[{
              width: 22, height: 22, zIndex: 1, marginRight: 18, tintColor: (!this.props.isSecureTextEntry) ?
                mycolor.pink : mycolor.lightgray
            }, this.props.rightImgStyle || {}]} />
        </TouchableOpacity>


      </View>
    );
  }
  onFocus() {
    this.setState({
      backgroundColor: mycolor.pink
    })
  }

  onBlur() {
    this.setState({
      backgroundColor: mycolor.lightgray
    })
  }
}
const styles = StyleSheet.create({
  TextInput: {
    width: '80%',
    paddingLeft: 20,
    // fontFamily: "NotoSansKR-Regular",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    fontSize: 14,
    includeFontPadding: false,
  },

  TextInputView: {
    borderWidth: 1.1,
    height: 60,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingLeft: 17,
    backgroundColor: '#FFF'

  },
});

