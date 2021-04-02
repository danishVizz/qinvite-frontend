import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputComp from '../Components/TextInputComp';

import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'
import ButtonComp from '../Components/ButtonComp';
import InputSpinner from "react-native-input-spinner";




export default class CreateCategory extends Component {

    state = {
        categorynametxt: '',
        categoryError: false,
        invitationcount: 0,
        isEnabled: false
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{ marginLeft: 23, marginRight: 23, flex: 1 }}>
                        <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Categoryname")}</Text>
                        <TextInputComp
                            placeholderTextColor={mycolor.lightgray}
                            textinstyle={{ paddingLeft: 5, width: '100%' }}
                            onChangeText={(name) => this.setState({ categorynametxt: name, categoryError: false })}
                        />
                        {this.state.categoryError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.categoryerrortxt}</Text> : <View></View>}


                        <View style={{ flexDirection: 'row', marginTop: 58 }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'bold', color: 'black', flexDirection: 'row' }}>{Trans.translate('PhoneAllowed')}</Text>
                            <Switch
                                trackColor={{ false: mycolor.lightgray, true: mycolor.lightPink }}
                                thumbColor={this.state.isEnabled ? mycolor.pink : mycolor.darkgray}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.ontogglechange()}
                                value={this.state.isEnabled}
                            />
                        </View>
                        <View style={{ marginTop: 46, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', flex: 9 }}>{Trans.translate('InvitedCount')}</Text>
                            <InputSpinner
                                style={styles.spinner}
                                type={"real"}
                                min={1}
                                inputStyle={{ height: 40 }}
                                step={1} s
                                skin='paper'
                                colorRight={mycolor.darkgray}
                                colorLeft={mycolor.darkgray}
                                onChange={(num) => {
                                    this.setState({ invitationcount: num })
                                }}></InputSpinner>


                        </View>
                        <View style={{ flex: 1, marginTop: 50, justifyContent: 'center', alignContent: 'center', color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                            <ButtonComp onPress={() => this.OnNextScreen()} textstyle={{ color: mycolor.white, fontWeight: 'bold' }} text={Trans.translate('AddCategory')}></ButtonComp>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>


        );
    }

    async ontogglechange() {
        await this.setState({ isEnabled: !(this.state.isEnabled) })
    }

    OnNextScreen() {
        var check = this.checkforError()
        if (check) {
            return;
        }
        var data = {
            "categoryename": this.state.categorynametxt,
            "invitaitoncount": this.state.invitationcount,
            "isphoneallowd": this.state.isEnabled
        }
        this.props.navigation.navigate('CategoryContactsSelection', { "categorydata": data })
    }


    checkforError() {
        var anycheckfalse = false;
        if (this.state.categorynametxt == "") {
            this.setState({
                categoryerrortxt: Trans.translate("categorynameisreq"),
                categoryError: true
            })
            anycheckfalse = true;
        }
        if (anycheckfalse) {
            return true;
        }

        return false;
    }

    // ()=>this.props.navigation.navigate('CategoryContactSelection')
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },

    spinner: {
        flex: 1,
        height: 40,
        width: 50,
        borderRadius: 15,
        minWidth: 80,
        minHeight: 40,

    },
    button: {
        position: "absolute", bottom: 0
    }

});