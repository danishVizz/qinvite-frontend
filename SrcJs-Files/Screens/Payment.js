import { View } from 'react-native'
import React, { Component } from 'react';
import { WebView } from 'react-native-webview'
import Keys from "../Constants/keys"
import mycolor from "../Constants/Colors"
import Trans from "../Translation/translation"
import StatusBarComp from '../Components/StatusBarComp';
import { ActivityIndicator } from 'react-native';
import HeaderComp from '../Components/HeaderComp';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { Alert, Text, Image } from 'react-native';
import ButtonComp from '../Components/ButtonComp';
import AwesomeAlert from 'react-native-awesome-alerts'

// const jsCode = `window.postMessage(document.getElementById('gb-main').innerHTML)`
const jsCode = "window.postMessage(document.getElementsByClassName(payment-response))"

const injectedJs = `
  window.postMessage("Your message");
`;
export class Payment extends Component {
    state = {
        visible: true,
        showAlert: false
    }
    render() {

        return (


            <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.pink }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp textfonts={'bold'} fromleft={10} title={Trans.translate('Payment')} textfonts={'bold'} textsize={18} titlepos="center" />

                <WebView
                    onLoad={() => this.hideSpinner()}
                    automaticallyAdjustContentInsets={false}
                    javaScriptEnabled={true}
                    // injectedJavaScript="window.ReactNativeWebView.postMessage(document.body)"
                    // injectedJavaScript="window.ReactNativeWebView.postMessage(document.getElementsByClassName(payment-response))"
                    onMessage={event => {
                        this.handleMessage(event.nativeEvent.data)
                    }}
                    // source={{ uri: `https://qinvite.vizzwebsolutions.com/payments?event_id=${Keys.invitealldata["Eventdata"].event_id}` }} />
                    source={{ uri: `https://qinvite.vizzwebsolutions.com/payments?event_id=${this.props.route.params.event_id}` }} />
                {/* ></WebView> */}
                {this.state.visible && (
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size="large" color={mycolor.pink} />
                    </View>
                )}
                <AwesomeAlert
                    show={this.state.showAlert}
                    contentContainerStyle={{ width: '100%', borderRadius: 4 }}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    customView={this.alertView()}
                />

            </SafeAreaView>


        )
    }

    hideSpinner() {
        this.setState({ visible: false });
    }

    handleMessage(message) {
        if (message.toLowerCase() == "transaction successful")
            this.setState({ showAlert: true })
        else {
            Alert("Payment Failed Please Try again")
        }

    }

    onpaymentsuccess() {
        this.setState({ showAlert: false })
        this.props.navigation.replace('Todos')
    }
    
    alertView() {
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 28, marginTop: 5, textAlign: 'center', fontWeight: 'bold', color: mycolor.darkgray }}>{Trans.translate("Paymentsuccess")}</Text>
                <View style={{ flexDirection: 'row', marginTop: 40, width: '100%', justifyContent: 'center' }}>
                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/icon_success.png')}></Image>
                </View>
                <View style={{ marginTop: 20, justifyContent: 'center', alignContent: 'center' }}>
                    <ButtonComp onPress={() => this.onpaymentsuccess()} style={{ backgroundColor: "#25AE88" }} textstyle={{ color: mycolor.white, fontSize: 14 }} text={Trans.translate('Ok')}></ButtonComp>
                </View>
            </View>
        );
    }


}
export default Payment;
