import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { Text, Alert, View, StyleSheet, ActivityIndicator } from 'react-native'
import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import InviteStatusComp from '../Components/InviteStatusComp';
import NetworkUtils from "../Constants/NetworkUtils";
import moment from 'moment';
import ApiCalls from '../Services/ApiCalls';

export default class ContactListing extends Component {
    state = {
        isLoading: false
    }

    render() {
        var participants = this.props.route.params.Eventdata.participants ?? []
        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 textfonts={'bold'}
                    righttitle={Trans.translate('Resend')}
                    titlepos='center'
                    textsize={12}
                    rightBtnClicked={() => this.resendMessage(this.props.route.params.Eventdata.id)}
                    leftBtnClicked={() => this.props.navigation.goBack()}
                    title={Trans.translate('InvitedPeoples')}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <InviteStatusComp navigation={this.props.navigation} participants={participants} />

                {/* <FlatList
                    data={participants}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} /> */


                    this.state.isLoading && <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                         alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(52, 52, 52, 0.8)'
                    }}>
                        < ActivityIndicator size="large" color={'#fff'} />
                        <Text style={{marginHorizontal: 40, textAlign: 'center', marginTop: 20, color: '#fff'}}>{Trans.translate('invite_wait_msg')}</Text>
                    </View>}
            </View>

        );
    }

    async resendMessage(id) {
        console.log({id})
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        this.setState({ isLoading: true });
        let query = "/" + id
        console.log("resendMessage()")
        ApiCalls.getGenericCall("resend_message", query).then(data => {
            console.log("DATA")
            console.log(data)
            if (data.status == true) {
                this.setState({ isLoading: false })
                this.notifyMessage(data.message)
            } else {
                Alert.alert('Failed', data.message);
                this.setState({ isLoading: false });
            }
        }, error => {
            // Alert.alert('Error', JSON.stringify(error));
            console.log(JSON.stringify(error))
        }
        )
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            Alert.alert(msg);
        }
    }
}

// const successCallBackData = (data) => {
//     console.log(data)// can get callback data here
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        height: 60,
        backgroundColor: '#03A9F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingTest: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    list: {
        margin: 5,
        backgroundColor: 'white',
        height: 80,
        justifyContent: 'space-around',
        paddingLeft: 10,
        elevation: 1
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    }
});
