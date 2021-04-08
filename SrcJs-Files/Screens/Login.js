import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import mycolor from '../Constants/Colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TextInputComp from "../Components/TextInputComp";
import ButtonComp from "../Components/ButtonComp";
import Trans from "../Translation/translation"
import ApiCalls from "../Services/ApiCalls";
import Prefs from "../Prefs/Prefs";
import Keys from "../Constants/keys";

export default class Login extends Component {

  state = {
    // emailtxt: '123456',
    // passwordtxt: '123456',
    emailtxt: '',
    passwordtxt: '',
    isSecureTextEntry: true,
    emailEmpty: false,
    passEmpty: false,
    setLoginLoading:false
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/icon_logo.png")} />
        <StatusBar style="auto" />

        <View style={styles.innerview}>
          <TextInputComp
            placeholder={Trans.translate("IDCard")}
            leftIcon={require('../../assets/icon_user.png')}
            placeholderTextColor={mycolor.lightgray}
            empty={this.state.emailEmpty}
            value={this.state.emailtxt}
            onChangeText={(email) => this.setState({ emailtxt: email, emailEmpty: false })}
          />
          {this.state.emailEmpty ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.Emailerrortxt}</Text> : <View></View>}
          <TextInputComp
            placeholder={Trans.translate("Password")}
            marginTop='20'
            empty={this.state.passEmpty}
            value={this.state.passwordtxt}
            leftIcon={require('../../assets/icon_pass.png')}
            placeholderTextColor={mycolor.lightgray}
            rightIcon={require('../../assets/icon_visiblity.png')}
            onPressEyeBtn={() => this.setState({ isSecureTextEntry: !(this.state.isSecureTextEntry) })}
            isSecureTextEntry={this.state.isSecureTextEntry}
            onChangeText={(pass) => this.setState({ passwordtxt: pass, passEmpty: false })}
          />
          {this.state.passEmpty ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.passworderrortxt}</Text> : <View></View>}


           <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPass')}style={{alignSelf:'flex-end'}}>
          <Text style={{ color: '#707070', textAlign: 'right', alignSelf: 'flex-end', marginTop: 10, }}>{Trans.translate('Forgotpass')}</Text>
          </TouchableOpacity>

          <View style={{ minWidth: "100%" }}>
            <ButtonComp
              onPress={() => this.onLoginPress()}
              text={Trans.translate("Login")}
              isloading={this.state.setLoginLoading}
              style={{ backgroundColor: mycolor.pink, marginTop: 20, }}
              textcolor={mycolor.white}
              textstyle={{ color: mycolor.white }} />

            <ButtonComp
              onPress={() => this.props.navigation.navigate('SignUpScreen')}
              text={Trans.translate("SignUp")}
              
              style={{ backgroundColor: mycolor.white, marginTop: 20 }}
              textcolor={mycolor.darkgray}
              textstyle={{ color: mycolor.pink }} />
          </View>
        </View>
      </View>
    );
  }


  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }



  onLoginPress() {
    var check = this.checkEmptyFields()
    if (check) {
      return;
    }


    var formadata = new FormData()
    formadata.append("username", this.state.emailtxt)
    formadata.append("password", this.state.passwordtxt)
    console.log(formadata)

    const data = null
    this.logCallback('Login Start', this.state.setLoginLoading = true);
    ApiCalls.postApicall(formadata, "login").then(data => {
      this.logCallback("Response came", this.state.setLoginLoading = false);
      if (data.status == true) {
          Prefs.save(Keys.userData, JSON.stringify(data.data))
        this.props.navigation.navigate('CombineComp')
        // this.props.navigation.navigate('ChooseCategory')
 
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.setLoginLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }
  checkEmptyFields() {
    var anycheckfalse = false;
    if (this.state.emailtxt == "") {
      this.setState({
        emailEmpty: true,
        Emailerrortxt: Trans.translate("EmailisRequired"),
      })
      var anycheckfalse = true;
    }
    if (this.state.passwordtxt == "") {
      this.setState({
        passworderrortxt: Trans.translate("Passwordisreq"),
        passEmpty: true
      })
      var anycheckfalse = true;
    }
    if (this.state.tusername == "" || this.state.tpassword == "") {
      return true;
    }

    if (anycheckfalse) {
      return true;
    }

    return false;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },

  image: {
    marginBottom: 100,
    height: 95,
    width: 162,
    resizeMode: 'contain'
  },

  innerview: {
    backgroundColor: "#fff",
    alignItems: 'center',
    marginLeft: 33, marginRight: 33
  },


});