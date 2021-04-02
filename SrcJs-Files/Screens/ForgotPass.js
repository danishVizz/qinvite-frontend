
import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import mycolor from '../Constants/Colors'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
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

export default class ForgotPass extends Component {

    state = {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View >
                    <HeaderComp2
                        lefttintColor={"#000"}
                        leftBtnClicked={()=>this.props.navigation.goBack()}
                        headerStyle={{ backgroundColor: 'white' }}
                        leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                    <Image style={styles.image} source={require("../../assets/icon_unlock.png")} />

                    <StatusBar style="auto" />

                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, fontSize: 25, fontWeight: 'bold' }}>{Trans.translate('Forgotpass')}</Text>
                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 50, marginRight: 50, fontSize: 15 }}>{Trans.translate('Forgotpasshint')}</Text>

                    <View style={styles.innerview}>


                        <TextInputComp
                            placeholder={Trans.translate('Email')}
                            leftIcon={require('../../assets/icon_email.png')}
                            placeholderTextColor={mycolor.lightgray}
                            onChangeText={(email) => this.setState({ emailTxt: email, emailError: false })}
                        />

                        <View style={{ width: '100%' }}>
                            <ButtonComp
                                text={Trans.translate("Send")}
                                isloading={this.state.setLoginLoading}
                                style={{ backgroundColor: mycolor.pink, marginTop: 50, width: '100%', alignItems: 'center', alignSelf: 'center', }}
                                textcolor={mycolor.white}
                                textstyle={{ color: mycolor.white, textAlign: 'center' }} />

                        </View>
                    </View>

                </View>
            </SafeAreaView>

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
                // this.setState({
                //   isLoading: false,
                // });
                // this.props.navigation.navigate('Home')
                // Prefs.save(mykeys.accessToken, data.data.token)
                // console.log("token " + data.data.token)
                Prefs.save(Keys.userData, JSON.stringify(data.data))

                // let value =await Prefs.get(Keys.userData)
                // console.log("My Data " + JSON.parse(value))
                this.props.navigation.navigate('CreatePackage')
                //this.props.navigation.navigate('Tab');
                // this.props.navigation.navigate('StoreCategoryScreen');
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