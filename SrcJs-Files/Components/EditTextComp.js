import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet,View, Image, TextInput,Text} from 'react-native';
import mycolor from "../Constants/Colors";
export default class EditTextComp extends Component {
  state = {
    backgroundColor: mycolor.lightgray
  }
  render() {
    return (
      
      <View style={[styles.TextInputView, {
        marginTop: this.props.top == undefined ? 13 : this.props.top,
         }, this.props.textviewstyle || {}]}>
      <Text style={styles.label}>{this.props.text}</Text>

      <TextInput
          underlineColorAndroid={mycolor.lightgray}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.empty ? "grey" : mycolor.pink}
          autoCapitalize="none"
          multiline={this.props.multiline || false}
          style={[styles.TextInput, this.props.textinstyle || {}]}
          onBlur={() => this.onBlur()}
          value = {this.props.value}
          onFocus={() => this.onFocus()}
          selectionColor={mycolor.pink}
          onChangeText={this.props.onChangeText}
          editable={(this.props.isEnable === undefined || this.props.isEnable === true) ? true : false}
          secureTextEntry={this.props.isSecureTextEntry} />
    
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
    width: '100%',
    fontSize: 14,
    backgroundColor:'#fff',
    includeFontPadding: false,
  },

  TextInputView: {
    marginTop:20,
    backgroundColor: '#fff'

  },
  label: {
    backgroundColor: '#FFF',
    alignItems:'center',
    fontSize:12,color:'#C1C1C1'

  },
});

