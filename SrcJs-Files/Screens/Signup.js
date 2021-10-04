
import React, { Component, useState } from "react";
import TextInputComp from '../Components/TextInputComp'
import mycolor from '../Constants/Colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Platform,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity
} from "react-native";
import NetworkUtils from "../Constants/NetworkUtils";
import { CheckBox } from 'react-native-elements';
import RadioButtonComp from "../Components/RadioComp";
import ButtonComp from "../Components/ButtonComp";
import Trans from "../Translation/translation"
import ApiCalls from "../Services/ApiCalls";
import PhoneInput from 'react-native-phone-number-input';

var Phoneref;
export default class SignUp extends Component {

  state = {
    isSecureTextEntry: true,
    isSecureTextEntrycomfirmpass: true,
    phoneTxt: '',
    phoneTxt2: '',
    emailTxt: '',
    passwordTxt: '',
    idcardTxt: '',
    confirmPasswordTxt: '',
    referalTxt: '',
    isSelectedRB1: true,
    isSelectedRB2: false,
    shouldShow: false,
    signupLoading: false,
    isChecked: false,
    displayLogo: true
  }


  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(event) {
    this.setState({
      displayLogo: false
    })
  }

  _keyboardDidHide() {
    this.setState({
      displayLogo: true
    })
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>

        <ScrollView keyboardShouldPersistTaps="always">
          <View style={[styles.logocontainer, { display: this.state.displayLogo ? "flex" : "none" }]}>
            <Image style={styles.image} source={require('../../assets/icon_logo.png')}></Image>
          </View>
          <View style={styles.innerview}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{Trans.translate("Signuphint")}</Text>
            <View style={styles.radioview}>
              <RadioButtonComp
                size={12} text={Trans.translate("Phonenumber")}
                onPress={() => this.changebuttons(1)}
                isSelected={this.state.isSelectedRB1}
              >
              </RadioButtonComp>
              <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 2, alignSelf: 'center', flex: 1, fontSize: 12, alignItems: 'center', justifyContent: 'center', textAlign: 'justify' }}>OR</Text>
              </View>
              <View style={{ marginLeft: 20, flex: 1 }}>
                <RadioButtonComp
                  size={12} text={Trans.translate('Email')}
                  onPress={() => this.changebuttons(2)}
                  isSelected={this.state.isSelectedRB2}
                >
                </RadioButtonComp>
              </View>
            </View>
            {this.state.isSelectedRB2 ? (<TextInputComp
              placeholder={Trans.translate('Email')}
              leftIcon={require('../../assets/icon_email.png')}
              placeholderTextColor={mycolor.lightgray}
              OnsubmitEditing={Keyboard.dismiss}
              onChangeText={(email) => this.setState({ emailTxt: email, emailError: false })}
            />) : null}

            {/* {this.state.emailError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.emailEmptytext}</Text> : <View></View>}
            {this.state.isSelectedRB1 ? (<TextInputComp
              placeholder={Trans.translate('Phonenumber')}
              leftIcon={require('../../assets/icon_phone2x.png')}
              placeholderTextColor={mycolor.lightgray}
              OnsubmitEditing={Keyboard.dismiss}
              onChangeText={(phone) => this.setState({ phoneTxt: phone, phoneError: false })}
            />) : null}
            {this.state.phoneError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.phoneerrortxt}</Text> : <View></View>} */}

            {this.state.emailError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.emailEmptytext}</Text> : <View></View>}
            {this.state.isSelectedRB1 ? (<PhoneInput
              ref={(inputref) => { this.Phoneref = inputref }}
              placeholder={Trans.translate('Phonenumber')}
              defaultValue={this.state.phonenumber}
              defaultCode="QA"
              layout="first"
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              onChangeFormattedText={text => {
                this.setState({ phoneTxt: text, phoneError: false })
              }}
            />) : null}
            {this.state.phoneError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.phoneerrortxt}</Text> : <View></View>}

            <TextInputComp
              placeholder={Trans.translate('IDCard')}
              leftIcon={require('../../assets/icon_user.png')}
              placeholderTextColor={mycolor.lightgray}
              inputtype={'numeric'}
              onChangeText={(idcard) => this.setState({ idcardTxt: idcard, idcardError: false })}
              OnsubmitEditing={Keyboard.dismiss}
            />
            {this.state.idcarderror ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.idcarderrortxt}</Text> : <View></View>}

            <TextInputComp
              placeholder={Trans.translate('Password')}
              marginTop='20'
              leftIcon={require('../../assets/icon_pass.png')}
              placeholderTextColor={mycolor.lightgray}
              rightIcon={require('../../assets/icon_visiblity.png')}
              onPressEyeBtn={() => this.onPressEyeBtn('password')}
              onChangeText={(password) => this.setState({ passwordTxt: password, passwordError: false })}
              OnsubmitEditing={Keyboard.dismiss}
              isSecureTextEntry={this.state.isSecureTextEntry}

            />
            {this.state.passwordError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.passworderrortxt}</Text> : <View></View>}


            {this.state.isSelectedRB2 ? (<TextInputComp
              placeholder={Trans.translate('Phonenumber')}
              leftIcon={require('../../assets/icon_phone2x.png')}
              placeholderTextColor={mycolor.lightgray}
              OnsubmitEditing={Keyboard.dismiss}
              onChangeText={(phone2) => this.setState({ phoneTxt2: phone2, phoneError2: false })}
            />) : null}
            {this.state.phoneError2 ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.phoneerrortxt2}</Text> : <View></View>}

            <TextInputComp
              placeholder={Trans.translate('CPass')}
              marginTop='20'
              leftIcon={require('../../assets/icon_pass.png')}
              placeholderTextColor={mycolor.lightgray}
              rightIcon={require('../../assets/icon_visiblity.png')}
              onPressEyeBtn={() => this.onPressEyeBtn('confirmpass')}
              isSecureTextEntry={this.state.isSecureTextEntrycomfirmpass}
              onChangeText={(confirmpassword) => this.setState({ confirmPasswordTxt: confirmpassword, confirmpasswordError: false })}
              OnsubmitEditing={Keyboard.dismiss}
            />
            {this.state.confirmpasswordError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.cpassworderrortxt}</Text> : <View></View>}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <CheckBox
                containerStyle={{ marginLeft: 0, paddingLeft: 0 }}
                checked={this.state.isChecked}
                checkedIcon={<Image source={require('../../assets/icon_checked.png')} style={{ height: 20, width: 20 }} />}
                uncheckedIcon={<Image source={require('../../assets/uncheckbox.png')} style={{ height: 20, width: 20, borderColor: mycolor.lightgray, borderWidth: 1 }} />}
                onPress={() => this.setState({ isChecked: !(this.state.isChecked) })}
              ></CheckBox>
              <TouchableOpacity style={{ flex: 1, fontSize: 12, color: mycolor.lightgray, includeFontPadding: false }} onPress={() => this.onPressCheckbox()}>
                <Text style={{ marginTop: 15 }}>{'By registerting, I agree to terms & conditions of Qinvite.'}</Text>
              </TouchableOpacity>
            </View>

            <ButtonComp
              onPress={() => this.onSignupPress()}
              text={Trans.translate("SignUp")}
              style={{ backgroundColor: mycolor.pink, marginTop: 20, marginBottom: 20 }}
              textcolor={mycolor.white}
              isloading={this.state.signupLoading}
              textstyle={{ color: mycolor.white }} />

          </View>

        </ScrollView>
      </SafeAreaView>

    );
  }

  notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      Alert.alert(msg);
    }
  }

  onPressEyeBtn(value) {
    console.log('Eye btn pressed');
    if (value == 'password') {
      this.setState({ isSecureTextEntry: !(this.state.isSecureTextEntry) });
    } else {
      this.setState({ isSecureTextEntrycomfirmpass: !(this.state.isSecureTextEntrycomfirmpass) });
    }
  }

  changebuttons(button) {

    switch (button) {
      case 1:
        this.setState({ isSelectedRB1: true })
        this.setState({ isSelectedRB2: !(this.state.isSelectedRB1) ? false : this.state.isSelectedRB2 })
        break;
      case 2:
        // setisSelectedRB2(true)
        // setisSelectedRB1(!isSelectedRB2 ? false : isSelectedRB1)
        this.setState({ isSelectedRB2: true })
        this.setState({ isSelectedRB1: !(this.state.isSelectedRB2) ? false : this.state.isSelectedRB1 })

        break;
    }
  }

  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }

  onPressCheckbox() {
    // this.setState({ isChecked: !(this.state.isChecked) })
    !this.state.isChecked && this.props.navigation.navigate('TermsConditions')
  }

  async onSignupPress() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }

    if (!this.state.isChecked) {
      // Alert.alert('T&C', 'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy')
      Alert.alert('T&C', Trans.translate('termsandcons'))
      return
    }
    var check = this.checkforError()
    if (check) {
      return;
    }
    // var acceptedTerms = this.getAcceptedTerms();

    const data = null
    this.logCallback('Signup Start', this.state.signupLoading = true);
    if (this.state.emailTxt == "") {
      var bodyparams = JSON.stringify({
        password: this.state.passwordTxt,
        cnic: this.state.idcardTxt,
        phone: this.state.phoneTxt,
      });
    }
    else {
      var bodyparams = JSON.stringify({
        email: this.state.emailTxt,
        password: this.state.passwordTxt,
        cnic: this.state.idcardTxt,

      });
    }
    var formadata = new FormData()
    // data.append("email", email)
    formadata.append("password", this.state.passwordTxt)
    formadata.append("cnic", this.state.idcardTxt)
    formadata.append("phone", this.state.phoneTxt)
    console.log(formadata)

    ApiCalls.postApicall(formadata, "signup").then(data => {
      this.logCallback("Response came", this.state.signupLoading = false);
      console.log(data);
      if (data.status == true) {
        this.logCallback(data.status)

        this.logCallback(data, this.state.signupLoading = false);
        // console.log("Data after signup"+JSON.stringify(data.data))
        // Prefs.save(mykeys.userData, JSON.stringify(data.data))
        // Prefs.save(Keys.userData, JSON.stringify(data.data))
        this.notifyMessage(data.message)

        this.props.navigation.navigate('LandingScreen')
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.signupLoading = false);
      console.log(JSON.stringify(error))
      // Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  checkforError() {
    var anycheckfalse = false;
    if (this.state.emailTxt == "" && this.state.isSelectedRB2) {
      this.setState({
        emailEmptytext: Trans.translate("EmailisRequired"),
        emailError: true
      })
      anycheckfalse = true;
    }
    if (this.state.passwordTxt == "") {
      this.setState({
        passworderrortxt: Trans.translate("Passwordisreq"),
        passwordError: true
      })
      anycheckfalse = true;
    }
    if (this.state.idcardTxt == "") {
      this.setState({
        idcarderrortxt: Trans.translate("IdCardreq"),
        idcarderror: true
      })
      anycheckfalse = true;
    }
    if (this.state.passwordTxt !== this.state.confirmPasswordTxt) {
      this.setState({
        cpassworderrortxt: Trans.translate("cpassworderror"),
        confirmpasswordError: true
      })
      anycheckfalse = true;
    }
    if (this.state.phoneTxt == "" && this.state.isSelectedRB1) {
      this.setState({
        phoneerrortxt: Trans.translate("phoneerror"),
        phoneError: true
      })
      anycheckfalse = true;
    }
    if (this.state.phoneTxt2 == "" && this.state.isSelectedRB2) {
      this.setState({
        phoneerrortxt2: Trans.translate("phoneerror"),
        phoneError2: true
      })
      anycheckfalse = true;
    }
    // if (this.state.passwordTxt.length < 8) {
    //   this.setState({
    //     passworderrortxt: Trans.translate("passwordsecerror"),
    //     passwordError: true
    //   })
    //   anycheckfalse = true;
    // }

    if (anycheckfalse) {
      return true;
    }

    this.setState({
      emailError: false,
      passwordError: false,
      confirmpasswordError: false
    })
    return false;
  }
}



const styles = StyleSheet.create({
  logocontainer: {

    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80
  },

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  innerview: {
    backgroundColor: "#fff"
    , paddingLeft: 33,
    paddingRight: 33
  },

  image: {
    marginBottom: 48,
    height: 95,
    width: 162,
    resizeMode: 'contain'
  },

  radioview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    flex: 1,
    marginTop: 22
  },
  text: {
    fontWeight: 'bold',
    color: 'black'
  },
  phoneContainer: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    fontSize: 14,
    includeFontPadding: false,
  },

  textInput: {
    paddingVertical: 0,
    height: 60,
    backgroundColor: null
  }
});