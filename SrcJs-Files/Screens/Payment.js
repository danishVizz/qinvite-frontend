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
import { Alert } from 'react-native';

// const jsCode = `window.postMessage(document.getElementById('gb-main').innerHTML)`
const jsCode = "window.postMessage(document.getElementsByClassName(payment-response))"

const injectedJs = `
  window.postMessage("Your message");
`;
export class Payment extends Component {
    state = {
        visible: true
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
            </SafeAreaView>


        )
    }
    hideSpinner() {
        this.setState({ visible: false });
    }
    handleMessage(message) {
        if (message.toLowerCase() == "transaction successful")
            this.props.navigation.replace('Todos')
        else {
            Alert("Payment Failed Please Try again")
        }

    }

}
export default Payment;
