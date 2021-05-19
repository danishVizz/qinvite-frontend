import { Component } from "react";
import React from 'react'
import { Button, Image, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Dimensions, View, Text } from "react-native";
import Draggable from 'react-native-draggable';
import ViewShot from "react-native-view-shot";
import { SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import Trans from "../Translation/translation";
import { SlidersColorPicker } from 'react-native-color'
import { DragTextEditor } from 'react-native-drag-text-editor';
import tinycolor from 'tinycolor2';
import InputSpinner from "react-native-input-spinner";
import QRCodeScanner from 'react-native-qrcode-scanner';
import AwesomeAlert from 'react-native-awesome-alerts';
import CountDown from 'react-native-countdown-component';
import { RNCamera } from 'react-native-camera';
import mycolor from "../Constants/Colors";
import HeaderComp2 from '../Components/HeaderComp2';
import ButtonComp from '../Components/ButtonComp';
import FloatingButtonComp from '../Components/FloatingButtonComp';
import StatusBarComp from '../Components/StatusBarComp';
import ApiCalls from '../Services/ApiCalls';
const WINDOW = Dimensions.get('window');

export default class ScannerScreen extends Component {
    state = {
        showAlert: false,
        showsuccessAlert: false,
        isLoading: false,
        name: 'Aisha Alobaidi',
        phone: '+974 3333 9082',
        person: 1,
        kids: 0,
        phoneAllowed: 1,
        host: 'Mariam',
        scanner: false,
        participantID: ''
    }

    onSuccess = e => {
        this.setState({ showAlert: true });
        console.log("SACNNED DATA");
        console.log(JSON.parse(e.data));
        let response = JSON.parse(e.data)
        this.setState({
            participantID: response.id,
            name: response.name,
            phone: response.number,
            person: response.category.people_per_qr,
            phoneAllowed: response.isphoneallow,
            host: response.host_data.first_name
        });
        // this.scanner.reactivate();
    };

    render() {
        // const imagedata=

        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <View style={{ flexDirection: 'row', height: 60, width: '100%', alignItems: 'center', paddingLeft: 20, paddingRight: 20, backgroundColor: mycolor.pink }}>

                    <Text style={{ color: '#FFF', fontSize: 16 }}>{Trans.translate('event_ends_in')} </Text>
                    <CountDown
                        size={10}
                        until={1000}
                        onFinish={() => alert('Finished')}
                        digitStyle={{ padding: 0 }}
                        digitTxtStyle={{ color: '#FFF', fontSize: 16, fontWeight: 'normal' }}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                        separatorStyle={{ color: '#FFF', margin: -20 }}
                    />
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => this.logout()}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../assets/power-off.png')}></Image>
                    </TouchableOpacity>

                </View>

                <AwesomeAlert
                    show={this.state.showAlert}
                    contentContainerStyle={{ width: '100%', borderRadius: 4 }}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    customView={this.alertView()}
                />

                { this.state.scanner &&
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        ref={(node) => { this.scanner = node }}
                        reactivate={this.state.showAlert}
                        // flashMode={RNCamera.Constants.FlashMode.torch}
                        // topContent={
                        //     <Text style={styles.centerText}>
                        //         Go to{' '}
                        //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.</Text>
                        // }
                        // bottomContent={
                        //     <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ showAlert: true })}>
                        //         <Text style={styles.buttonText}>OK. Got it!</Text>
                        //     </TouchableOpacity>
                        // }
                        containerStyle={{ backgroundColor: '#fff', display: this.state.scanner == true ? 'flex' : 'none' }}
                    />
                }

                { !this.state.scanner &&
                    <View style={{ display: this.state.scanner == false ? 'flex' : 'none', flex: 1, justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>
                        <ButtonComp
                            onPress={() => this.setState({ scanner: true })}
                            style={{ width: 200, height: 200, borderRadius: 100 }}
                            textstyle={{ color: mycolor.white, fontWeight: 'bold' }}
                            text={Trans.translate('scan')}></ButtonComp>
                    </View>
                }


                <AwesomeAlert
                    show={this.state.showsuccessAlert}
                    contentContainerStyle={{ width: '100%', borderRadius: 4 }}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    customView={this.alertsuccessView()}
                />

            </View>


        );
    }

    oncheckedin() {
        this.setState({ isLoading: false, showAlert: false, scanner: false });
    }

    alertsuccessView() {
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 28, marginTop: 5, textAlign: 'center', fontWeight: 'bold', color: mycolor.darkgray }}>{Trans.translate("Checkedin")}</Text>
                <View style={{ flexDirection: 'row', marginTop: 40, width: '100%', justifyContent: 'center' }}>
                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/icon_success.png')}></Image>
                </View>
                <View style={{ marginTop: 20, justifyContent: 'center', alignContent: 'center' }}>
                    <ButtonComp onPress={() => this.oncheckedin()} style={{ backgroundColor: "#25AE88" }} textstyle={{ color: mycolor.white, fontSize: 14 }} text={Trans.translate('Ok')}></ButtonComp>
                </View>
            </View>
        );
    }

    alertView() {
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 28, marginTop: 45, fontWeight: 'bold', color: mycolor.darkgray }}>{this.state.name}</Text>
                <Text style={{ fontSize: 16, marginTop: 23, color: mycolor.darkgray, fontWeight: '500' }}>{this.state.phone}</Text>
                <Text style={{ fontSize: 16, marginTop: 10, color: mycolor.darkgray, fontWeight: '500' }}>{Trans.translate('invited_by_host') + ": " + this.state.host}</Text>
                <View style={{ flexDirection: 'row', marginTop: 50, width: '100%' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 50, height: 27 }} source={require('../../assets/union.png')}></Image>
                        <Text style={{ fontSize: 13, marginTop: 20, color: mycolor.darkgray, fontWeight: '500' }}>{this.state.person + ' ' + Trans.translate('person')}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 33, height: 32 }} source={require('../../assets/kids.png')}></Image>
                        <Text style={{ fontSize: 13, marginTop: 20, color: mycolor.darkgray, fontWeight: '500' }}>{this.state.kids + ' ' + Trans.translate('kids')}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 18, height: 33 }} source={require('../../assets/phone.png')}></Image>
                        <Text style={{ fontSize: 13, marginTop: 20, color: mycolor.darkgray, fontWeight: '500' }}>{this.state.phoneAllowed == '1' ? Trans.translate('allowed') : 'Not Allowed'}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 100, justifyContent: 'center', alignContent: 'center', color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                    <ButtonComp onPress={() => this.updateCheckInStatus(this.state.participantID)} textstyle={{ color: mycolor.white, fontWeight: 'bold' }} text={Trans.translate('check_in')} isloading={this.state.isLoading}></ButtonComp>
                </View>
                <View style={{ marginTop: 0, justifyContent: 'center', alignContent: 'center' }}>
                    <ButtonComp onPress={() => this.setState({ scanner: false, showAlert: false })} style={{ backgroundColor: '#fff', borderWidth: 0 }} textstyle={{ color: mycolor.darkgray, fontSize: 14 }} text={Trans.translate('cancel')}></ButtonComp>
                </View>
            </View>
        );
    }

    componentDidMount() {

    }

    async logout() {
        console.log("LOGOUT");
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        console.log(asyncStorageKeys.length);
        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
                this.props.navigation.dispatch(
                    StackActions.pop(1)
                )
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
                this.props.navigation.dispatch(
                    StackActions.pop(1)
                )
            }
        } else {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
                this.props.navigation.dispatch(
                    StackActions.pop(1)
                )
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
                this.props.navigation.dispatch(
                    StackActions.pop(1)
                )
            }
        }
    }



    async updateCheckInStatus(id) {
        this.setState({ isLoading: true });
        let query = "/" + id
        ApiCalls.getGenericCall("check_in", query).then(data => {
            if (data.status == true) {
                this.setState({ showsuccessAlert: true })
            } else {
                Alert.alert('Failed', data.message);
                this.setState({ isLoading: false, showAlert: false, scanner: false });
            }
        }, error => {
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }
}

const styles = StyleSheet.create({
    centerText: {
        // flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});