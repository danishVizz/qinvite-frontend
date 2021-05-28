
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
        phonenumber: '',
        phoneError: false,
        setLoading: false
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

                    <Image style={styles.image} source={require("../../assets/icon_unlock.png")} />

                    <StatusBar style="auto" />

                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, fontSize: 25, fontWeight: 'bold' }}>{Trans.translate('Forgotpass')}</Text>
                    <Text style={{ color: "#474645", textAlign: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 50, marginRight: 50, fontSize: 15 }}>{Trans.translate('Forgotpasshint')}</Text>

                    <View style={styles.innerview}>


                        <TextInputComp
                            placeholder={Trans.translate('Phonenumber')}
                            leftIcon={require('../../assets/icon_phone2x.png')}
                            placeholderTextColor={mycolor.lightgray}
                            onChangeText={(phonenumber) => this.setState({ phonenumber: phonenumber, phoneError: false })}
                        />
                        {this.state.phoneError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.phoneerrortxt}</Text> : <View></View>}

                        <View style={{ width: '100%' }}>
                            <ButtonComp
                                text={Trans.translate("Send")}
                                isloading={this.state.setLoading}
                                onPress={() => this.onForgotPress()}
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



    onForgotPress() {
        var check = this.checkEmptyFields()
        if (check) {
            return;
        }
        var formadata = new FormData()
        formadata.append("number", this.state.phonenumber)

        const data = null
        this.logCallback('Forgot Pass Call Started', this.state.setLoading = true);
        ApiCalls.postApicall(formadata, "forget_password").then(data => {
            this.logCallback("Response came", this.state.setLoading = false);
            if (data.status == true) {
                console.log("successdata " + JSON.stringify(data))
                this.setState({ phonenumber: '' })
                this.props.navigation.navigate('CodeVerification', { "Forgotpassdata": data.data })
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
        if (this.state.phonenumber == "") {
            this.setState({
                phoneerrortxt: Trans.translate("phoneerror"),
                phoneError: true
            })
            var anycheckfalse = true;
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