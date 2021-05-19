
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
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
import TextInputComp from "../Components/TextInputComp";
import ButtonComp from "../Components/ButtonComp";
import Trans from "../Translation/translation"
import ApiCalls from "../Services/ApiCalls";
import Prefs from "../Prefs/Prefs";
import Keys from "../Constants/keys";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp2 from "../Components/HeaderComp2";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
export default class ForgotPass extends Component {

    state = {
        code: ''
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

                    <Image style={styles.image} source={require("../../assets/icon_verification.png")} />

                    <StatusBar style="auto" />

                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, fontSize: 25, fontWeight: 'bold' }}>{Trans.translate('Verifyphone')}</Text>
                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 50, marginRight: 50, fontSize: 15 }}>{Trans.translate('Verificationhint')+this.props.route.params.Forgotpassdata.phone}</Text>

                    <View style={styles.innerview}>


                        <SmoothPinCodeInput
                            // ref={this.pinInput}
                            value={this.state.code}
                            onTextChange={code => this.setState({ code: code })}
                            // onFulfill={this._checkCode}
                            // onBackspace={this._focusePrevInput}
                            onBackspace={() => console.log('No more back.')}
                        />

                        <View style={{ width: '100%' }}>
                            <ButtonComp
                                onPress={() => this.verifyCode()}
                                text={Trans.translate("Verify")}
                                isloading={this.state.lo}
                                style={{ backgroundColor: mycolor.pink, marginTop: 50, width: '100%', alignItems: 'center', alignSelf: 'center', }}
                                textcolor={mycolor.white}
                                textstyle={{ color: mycolor.white, textAlign: 'center' }} />

                        </View>
                    </View>

                </View>
            </SafeAreaView>

        );
    }
    verifyCode() {
        var verificationdata = this.props.route.params.Forgotpassdata
        if (verificationdata.otp == this.state.code) {
            this.props.navigation.navigate("ChangePassword", { "Forgotpassdata": verificationdata })
        }
        else {
            this.notifyMessage("Please enter a valid otp sent to your phone number")
        }
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
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