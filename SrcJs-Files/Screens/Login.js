
import { StatusBar } from "expo-status-bar";
import React, { Component, Tou } from "react";
import mycolor from '../Constants/Colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Keyboard, Dimensions
} from "react-native";
import { CheckBox } from 'react-native-elements';
import NetworkUtils from "../Constants/NetworkUtils";
import TextInputComp from "../Components/TextInputComp";
import ButtonComp from "../Components/ButtonComp";
import Trans from "../Translation/translation"
import ApiCalls from "../Services/ApiCalls";
import Prefs from "../Prefs/Prefs";
import Keys from "../Constants/keys";
import Global from "../Constants/Global";

const WIDTH = Dimensions.get('window').width

export default class Login extends Component {

  state = {
    emailtxt: '',
    passwordtxt: '',
    isSecureTextEntry: true,
    emailEmpty: false,
    passEmpty: false,
    setLoginLoading: false,
    rememberMe: false
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
            returnKeyType='done'
            onChangeText={(email) => this.setState({ emailtxt: email, emailEmpty: false })}
            OnsubmitEditing={Keyboard.dismiss}
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
            returnKeyType='done'
            onChangeText={(pass) => this.setState({ passwordtxt: pass, passEmpty: false })}
            OnsubmitEditing={Keyboard.dismiss}
          />
          {this.state.passEmpty ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.passworderrortxt}</Text> : <View></View>}

          <View style={{ flexDirection: 'row', width: WIDTH, paddingHorizontal: 33, marginTop: 15, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                containerStyle={{ marginLeft: 0, paddingLeft: 0, marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0, marginRight: 0 }}
                checked={this.state.rememberMe}
                checkedIcon={<Image source={require('../../assets/icon_checked.png')} style={{ height: 20, width: 20 }} />}
                uncheckedIcon={<Image source={require('../../assets/uncheckbox.png')} style={{ height: 20, width: 20, borderColor: mycolor.lightgray, borderWidth: 1 }} />}
                onPress={() => this.onPressCheckbox()}
              ></CheckBox>
              <Text style={{ color: '#707070', marginTop: 0, paddingTop: 0 }}>{Trans.translate('remember_me')}</Text>
            </View>
            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => this.props.navigation.navigate('ForgotPass')}>
              <Text style={{ color: '#707070' }}>{Trans.translate('Forgotpass')}</Text>
            </TouchableOpacity>
          </View>
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

  onPressCheckbox() {
    Prefs.save(Keys.REMEMBER_ME, JSON.stringify(this.state.rememberMe))
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  async onLoginPress() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
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
      console.log(data.data)
      if (data.status == true) {
        Prefs.save(Keys.userData, JSON.stringify(data.data))
        Global.userData = data.data
        switch (data.data.role) {
          case "0":
          case "2":
            this.props.navigation.replace('CombineComp');
            break;
          case "4":
            this.props.navigation.replace('Reception');
            break;
          case "5":
            this.props.navigation.replace('DesignerRequests');
            break;
          default:
            Alert.alert("", Trans.translate('not_auth_msg'));
        }
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