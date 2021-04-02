import { Component } from "react";
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, View } from "react-native";
import TextInputComp from "../Components/TextInputComp";
import Trans from "../Translation/translation";
import mycolor from "../Constants/Colors";
import ButtonComp from "../Components/ButtonComp";
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";
import { ScrollView } from "react-native-gesture-handler";
import HeaderComp2 from "../Components/HeaderComp2";



export default class CreatePackage extends Component {

    state = {
        ContactsList: [],
        PacakgeNameError: false,
        InvitaionCountError: false,
        isLoading: false,
        packagenametxt: '',
        invitationcounttxt: '',
        discounttxt: ''


    }
    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor='#F54260' />
                <HeaderComp2 alignSelf='center' textsize={18} textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('CreatePackage')} titlepos='center' ></HeaderComp2>



                <ScrollView>
                    <View style={{ flex: 1, marginLeft: 33, marginRight: 33 }}>
                        <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("PackageName")}</Text>
                        <TextInputComp
                            placeholder={Trans.translate("PackageName")}
                            placeholderTextColor={mycolor.lightgray}
                            textinstyle={{ paddingLeft: 0, width: '100%' }}
                            onChangeText={(packagename) => this.setState({ packagenametxt: packagename, PacakgeNameError: false })}
                        />
                        {this.state.PacakgeNameError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.packageNameErrortxt}</Text> : <View></View>}

                        <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("InivationCount")}</Text>
                        <TextInputComp
                            placeholder={'0'}
                            inputtype={'numeric'}
                            placeholderTextColor={mycolor.lightgray}
                            textinstyle={{ paddingLeft: 0, width: '100%' }}
                            onChangeText={(count) => this.setState({ invitationcounttxt: count, InvitaionCountError: false })}
                        />
                        {this.state.InvitaionCountError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.invitationcountErrortxt}</Text> : <View></View>}

                        {/* <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("QrNo")}</Text>
                        <TextInputComp
                            placeholder={'0'}
                            placeholderTextColor={mycolor.lightgray}
                            textinstyle={{ paddingLeft: 0, width: '100%' }}
                            inputtype={'numeric'}
                            onChangeText={(date) => this.setState({ eventdate: date })}
                        /> */}
                        <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Discount")}</Text>
                        <TextInputComp
                            placeholder={'0'}
                            inputtype={'numeric'}
                            placeholderTextColor={mycolor.lightgray}
                            textinstyle={{ paddingLeft: 0, width: '100%' }}
                            onChangeText={(discount) => this.setState({ discounttxt: discount })}
                        />

                        <View style={{ flex: 1, marginTop: 30 }}>
                            <ButtonComp
                                onPress={() => this.OnCreatePackage()}
                                isloading={this.state.isLoading}
                                textcolor={mycolor.white}
                                textstyle={{ color: mycolor.white, fontWeight: 'bold' }} text={Trans.translate('CreatePackage')} ></ButtonComp>

                        </View>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>

        );

    }


    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }


    async OnCreatePackage() {

        var check = this.checkforError()
        if (check) {
            return;
        }
        var usersdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(usersdata)
        console.log("MYDATA" + parsedata.id)

        var formadata = new FormData()

        formadata.append("package_name", this.state.packagenametxt)
        formadata.append("discount_code", this.state.discounttxt)
        formadata.append("user_id", parsedata.id)
        formadata.append("no_of_people", this.state.invitationcounttxt)
        // formadata.append("package_price", this.state.passwordtxt)
        console.log(formadata)

       
        this.logCallback('Creating Package Start', this.state.isLoading = true);
        ApiCalls.postApicall(formadata, "add_package").then(data => {
            this.logCallback("Response came", this.state.isLoading = false);
            if (data.status == true) {
                this.props.navigation.replace('Packages')

            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.isLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    checkforError() {
        var anycheckfalse = false;
        if (this.state.packagenametxt == "") {
            this.setState({
                packageNameErrortxt: Trans.translate("packagenameisreq"),
                PacakgeNameError: true
            })
            anycheckfalse = true;
        }
        if (this.state.invitationcounttxt == "") {
            this.setState({
                invitationcountErrortxt: Trans.translate("invitationcountisreq"),
                InvitaionCountError: true
            })
            anycheckfalse = true;
        }
        if (anycheckfalse) {
            return true;
        }

        return false;
    }



    // componentDidMount() {
    //     PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //         {
    //             'title': 'Contacts',
    //             'message': 'This app would like to view your contacts.'
    //         }
    //     ).then(() => {
    //         Contacts.getAll()
    //             .then((contacts) => {
    //                 // work with contacts
    //                 // var parsedata = JSON.parse(contacts)
    //                 this.setState({ContactsList:contacts})
    //                 this.state.ContactsList.map((person, i) => 
    //                 {

    //                     console.log(person.displayName+" "+person.phoneNumbers[0]?.number +" "+  person.phoneNumbers[1]?.number)
    //                     // console.log(person.familyName+" "+person.phoneNumbers[0].number)
    //                 }
    //                 )

    //             })
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
});