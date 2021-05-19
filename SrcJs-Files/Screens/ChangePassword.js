
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import mycolor from '../Constants/Colors'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ToastAndroid,
    Platform,
    AlertIOS,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TextInputComp from "../Components/TextInputComp";
import ButtonComp from "../Components/ButtonComp";
import Trans from "../Translation/translation"
import ApiCalls from "../Services/ApiCalls";
import Prefs from "../Prefs/Prefs";
import Keys from "../Constants/keys";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp2 from "../Components/HeaderComp2";

export default class ChangePassword extends Component {

    state = {
        isSecureTextEntry: true,
        isSecureTextEntrycomfirmpass: true,
        passwordTxt: '',
        confirmPasswordTxt: '',

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View >
                    <HeaderComp2
                        lefttintColor={"#000"}
                        leftBtnClicked={() => this.props.navigation.goBack()}
                        headerStyle={{ backgroundColor: 'white' }}
                        leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                    <Image style={styles.image} source={require("../../assets/icon_changepass.png")} />

                    <StatusBar style="auto" />

                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, fontSize: 25, fontWeight: 'bold' }}>{Trans.translate('NewPass')}</Text>
                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 50, marginRight: 50, fontSize: 15 }}>{Trans.translate('Newpasshint')}</Text>

                    <View style={styles.innerview}>


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

                        <View style={{ width: '100%' }}>
                            <ButtonComp
                                text={Trans.translate("Save")}
                                isloading={this.state.setLoading}
                                onPress={() => this.onChangePass()}
                                style={{ backgroundColor: mycolor.pink, marginTop: 50, width: '100%', alignItems: 'center', alignSelf: 'center', }}
                                textcolor={mycolor.white}
                                textstyle={{ color: mycolor.white, textAlign: 'center' }} />

                        </View>
                    </View>

                </View>
            </SafeAreaView>

        );
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
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


    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }

    onChangePass() {
        var check = this.checkEmptyFields()
        if (check) {
            return;
        }
        var formadata = new FormData()
        formadata.append("user_id", this.props.route.params.Forgotpassdata.user_id)
        formadata.append("password", this.state.passwordTxt)

        const data = null
        this.logCallback('Change Pass Call Started', this.state.setLoading = true);
        ApiCalls.postApicall(formadata, "update_password").then(data => {
            this.logCallback("Response came", this.state.setLoading = false);
            if (data.status == true) {
                console.log("successdata " + JSON.stringify(data))
                this.notifyMessage(data.message)
                this.props.navigation.replace('LandingScreen')
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.setLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }
    checkEmptyFields() {
        var anycheckfalse = false;
        if (this.state.passwordTxt == "") {
            this.setState({
                passworderrortxt: Trans.translate("Passwordisreq"),
                passwordError: true
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

        if (anycheckfalse) {
            return true;
        }
        this.setState({
            passwordError: false,
            confirmpasswordError: false
        })

        return false;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",


    },

    image: {
        marginBottom: 10,
        marginTop: 40,
        height: 148,
        width: 148,
        alignSelf: 'center',
        resizeMode: 'contain'
    },

    innerview: {
        backgroundColor: "#fff",
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 33, marginRight: 33
    },


});