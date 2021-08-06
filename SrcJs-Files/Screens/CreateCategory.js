import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputComp from '../Components/TextInputComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'
import ButtonComp from '../Components/ButtonComp';
import InputSpinner from "react-native-input-spinner";
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import { Alert } from 'react-native';
import mykeys from '../Constants/keys';

export default class CreateCategory extends Component {

    state = {
        categoryid: '',
        categorynametxt:mykeys.SELECTED_MAINCATEGORY,
        categoryError: false,
        invitationcount: 1,
        categorydata: [],
        contactlist: [],
        iseditcategory: false,
        isEnabled: false,
        editable: true
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('CreateCategory')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />
                <ScrollView>
                    <View style={{ marginLeft: 23, marginRight: 23, flex: 1 }}>
                        <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Categoryname")}</Text>
                        <TextInputComp
                            placeholderTextColor={mycolor.lightgray}
                            textinstyle={{ paddingLeft: 5, width: '100%' }}
                            value={this.state.categorynametxt}
                            isEnable={this.state.editable}
                            onChangeText={(name) => this.setState({ categorynametxt: name, categoryError: false })}
                        />
                        {this.state.categoryError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.categoryerrortxt}</Text> : <View></View>}

                        <View style={{ flexDirection: 'row', marginTop: 58 }}>
                            <Text style={{ flex: 1, fontSize: 14, fontWeight: 'bold', color: 'black', flexDirection: 'row' }}>{Trans.translate('PhoneAllowed')}</Text>
                            <Switch
                                trackColor={{ false: mycolor.lightgray, true: mycolor.lightPink }}
                                thumbColor={this.state.isEnabled ? mycolor.pink : mycolor.white}
                                ios_backgroundColor={mycolor.white}
                                disabled={!(this.state.editable)}
                                onValueChange={() => this.ontogglechange()}
                                value={this.state.isEnabled}
                            />
                        </View>
                        <View style={{ marginTop: 46, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', flex: 9 }}>{Trans.translate('InvitedCount')}</Text>
                            <InputSpinner
                                style={styles.spinner}
                                max={10}
                                min={1}
                                step={1}
                                disabled={!(this.state.editable)}
                                editable={this.state.editable}
                                colorMax={"#f04048"}
                                colorMin={mycolor.pink}
                                color={mycolor.pink}
                                value={this.state.invitationcount}
                                onChange={(num) => {
                                    console.log(num);
                                }}
                                onChange={(num) => {
                                    this.setState({ invitationcount: num })
                                }}></InputSpinner>
                        </View>
                        <View style={{ flex: 1, marginTop: 50, justifyContent: 'center', alignContent: 'center', color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                            <ButtonComp onPress={() => this.OnNextScreen()} textstyle={{ color: mycolor.white, fontWeight: 'bold' }} text={Trans.translate('Next')}></ButtonComp>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        this.state.categorydata = this.props.route.params.categorydata ?? []
        console.log("-----------" + JSON.stringify(this.state.categorydata))
        if (this.state.categorydata.length != 0) {
            this.setState({
                categoryid: this.state.categorydata.id,
                categorynametxt: this.state.categorydata.name,
                isEnabled: this.state.categorydata.phones == "1" ? true : false,
                invitationcount: this.state.categorydata.people_per_qr,
                iseditcategory: true,
                contactlist: this.state.categorydata.participants,
                editable: false
            })
        }
    }

    async ontogglechange() {
        this.setState({ isEnabled: !(this.state.isEnabled) })
    }

    OnNextScreen() {
        if(this.state.categorydata.length == 0 && this.isCategoryExist()) {
            Alert.alert(Trans.translate('duplication'), Trans.translate('cat_duplication_msg'))
            return
        }
        var check = this.checkforError()
        if (check) {
            return;
        }
        var data = {
            "categoryid": this.state.categoryid,
            "categoryename": this.state.categorynametxt,
            "invitaitoncount": this.state.invitationcount,
            "isphoneallowd": this.state.isEnabled,
            "iseditcategory": this.state.iseditcategory,
            "contactlist": this.state.contactlist.length == 0 ? [] : this.state.contactlist
        }
        this.props.navigation.navigate('CategoryContactsSelection', { "categorydata": data, "categoriesArr": this.props.route.params.categoriesArr })
    }

    isCategoryExist() {
        const arr = this.props.route.params.categoriesArr.filter(obj => obj.name.toLowerCase() == this.state.categorynametxt.toLowerCase())
        return arr.length == 0 ? false : true
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    spinner: {
        flex: 1,
        height: 30,
        width: 50,
        borderRadius: 15,
        minWidth: 80,
        minHeight: 40,
    },
    button: {
        position: "absolute", bottom: 0
    }

});