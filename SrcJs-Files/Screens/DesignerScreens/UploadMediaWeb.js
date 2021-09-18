
import { View, Alert } from 'react-native'
import React, { Component } from 'react';
import { WebView } from 'react-native-webview'
import { ActivityIndicator } from 'react-native-paper';
import mycolor from '../../Constants/Colors';

export default class UploadMediaWeb extends Component {

    state = {
        visible: true,
    }


    render() {


        return (
            <View style={{ flex: 1 }}>
                <WebView
                    onLoad={() => this.hideSpinner()}
                    automaticallyAdjustContentInsets={false}

                    javaScriptEnabled={true}
                    // onMessage = {(event) => console.log(event.nativeEvent.data)}
                    onMessage={event => {
                        // console.log({event})
                        this.handleMessage(event.nativeEvent.data)
                    }}

                    source={{ uri: `https://qinvite.vizzwebsolutions.com/admin/submit_design?event_id=${this.props.route.params.event.designer_id}&designer_id=${this.props.route.params.event.event_id}` }} />


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
            </View>
        )

    }

    hideSpinner() {
        this.setState({ visible: false });
    }


    handleMessage(message) {
        if (message.toLowerCase() == 1) {
            Alert.alert("Image Uploaded Successfully")
            this.props.navigation.navigate("DesignerRequests")
        }
        else {
            Alert.alert("Payment Failed Please Try again")
        }
    }

}