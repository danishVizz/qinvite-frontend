import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import TextInputComp from '../Components/TextInputComp'
import mycolor from '../Constants/Colors'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RadioButtonComp from "../Components/RadioComp";
import ButtonComp from "../Components/ButtonComp";
import Trans from "../Translation/translation"
import ApiCalls from "../Services/ApiCalls";
import Prefs from "../Prefs/Prefs";
import mykeys from "../Constants/keys";


export default class SignUp extends Component {

  // constructor(props)
  // {

  // }

  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [idCard, setIdcard] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");
  // const [hidePass, setHidePass] = useState(true);
  // const [hideconfirmPass, setHideconfrimPass] = useState(true);
  // const [isSelectedRB1, setisSelectedRB1] = useState(true)
  // const [isSelectedRB2, setisSelectedRB2] = useState(false)
  // const [shouldShow, setShouldShow] = useState(true);



  state = {
    isSecureTextEntry: true,
    isSecureTextEntrycomfirmpass: true,
    phoneTxt: '',
    emailTxt: '',
    passwordTxt: '',
    idcardTxt: '',
    confirmPasswordTxt: '',
    referalTxt: '',
    isSelectedRB1: true,
    isSelectedRB2: false,
    shouldShow: false,
    signupLoading:false
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.container} >
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
          <View style={styles.logocontainer}>
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
              <View style={{flex:1}}>
              <Text style={{marginTop:2, alignSelf:'center',flex:1,fontSize:12,alignItems:'center',justifyContent:'center',textAlign:'justify'}}>OR</Text>
              </View>
              <View style={{ marginLeft: 20 ,flex:1}}>
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
              onChangeText={(email) => this.setState({ emailTxt: email, emailError: false })}
            />) : null}

            {this.state.emailError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.emailEmptytext}</Text> : <View></View>}
            {this.state.isSelectedRB1 ? (<TextInputComp
              placeholder={Trans.translate('Phonenumber')}
              leftIcon={require('../../assets/icon_phone2x.png')}
              placeholderTextColor={mycolor.lightgray}
              onChangeText={(phone) => this.setState({ phoneTxt: phone, phoneError: false })}
            />) : null}
            {this.state.phoneError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.phoneerrortxt}</Text> : <View></View>}

            <TextInputComp
              placeholder={Trans.translate('IDCard')}
              leftIcon={require('../../assets/icon_user.png')}
              placeholderTextColor={mycolor.lightgray}
              onChangeText={(idcard) => this.setState({ idcardTxt: idcard, idcardError: false })}
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
              isSecureTextEntry={this.state.isSecureTextEntry}

            />
            {this.state.passwordError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.passworderrortxt}</Text> : <View></View>}


            <TextInputComp
              placeholder={Trans.translate('CPass')}
              marginTop='20'
              leftIcon={require('../../assets/icon_pass.png')}
              placeholderTextColor={mycolor.lightgray}
              rightIcon={require('../../assets/icon_visiblity.png')}
              onPressEyeBtn={() => this.onPressEyeBtn('confirmpass')}
              isSecureTextEntry={this.state.isSecureTextEntrycomfirmpass}
              onChangeText={(confirmpassword) => this.setState({ confirmPasswordTxt: confirmpassword, confirmpasswordError: false })}
            />
            {this.state.confirmpasswordError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.cpassworderrortxt}</Text> : <View></View>}



            <ButtonComp
              onPress={() => this.onSignupPress()}
              text={Trans.translate("SignUp")}
              style={{ backgroundColor: mycolor.pink, marginTop: 20 }}
              textcolor={mycolor.white}
              isloading={this.state.signupLoading}
              textstyle={{ color: mycolor.white }} />

          </View>
        </ScrollView>
      </View>
      </SafeAreaView>
    );

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


  onSignupPress() {
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
    var  formadata = new FormData()
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
        Prefs.save(mykeys.userData, JSON.stringify(data.data.userData))

        this.props.navigation.navigate('CombineComp')
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
    justifyContent:"center",
    flex:1,
    marginTop: 22
  },
  text: {
    fontWeight: 'bold',
    color: 'black'
  }


});