import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Alert, View, StyleSheet } from 'react-native'
import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import moment from 'moment';
import ApiCalls from '../Services/ApiCalls';
import { ActivityIndicator } from 'react-native';
import NetworkUtils from "../Constants/NetworkUtils";
import Keys from '../Constants/keys'
export default class ContactStatus extends Component {
    state = {
        isLoading: false,
        list: []
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <HeaderComp2 textfonts={'bold'}
                    titlepos='center'
                    textsize={12}
                    rightBtnClicked={() => this.resendMessage(this.props.route.params.Eventdata.id)}
                    leftBtnClicked={() => this.props.navigation.goBack()}
                    title={Trans.translate('InvitedPeoples')}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


                {this.state.isLoading && <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.2)'
                }}>
                    < ActivityIndicator size="large" color={mycolor.pink} />
                </View>}
            </View>

        );
    }

    renderItem({ item, index, props }) {
        console.log("inex: " + item.invitation_date);
        var status = ''
        if (item.status == "0") { status = "Pending" }
        else if (item.status == "1") { status = "Message Sent" }
        else if (item.status == "2") { status = "Message Delivered" }
        else if (item.status == "3") { status = "Message Seen" }
        return (
            <ConversationComp
                contact={item.number}
                imagepath={require('../../assets/icon_contact.png')}
                contactname={item.name}
                status={status}
                time={String(moment(item.invitation_date).format("hh:mm A"))}
            />
        );
    }

    componentDidMount() {
        var event_id = Keys.invitealldata["Eventdata"].event_id
        this.getMessageDetail(event_id)
    }

    async getMessageDetail(id) {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        console.log(id)
        this.setState({ isLoading: true });
        let query = "?event_id=" + id
        ApiCalls.getGenericCall("get_message_details", query).then(data => {
            console.log("DATA")
            console.log(data)
            if (data.status == true) {
                this.setState({ list: data.data, isLoading: false })
            } else {
                Alert.alert('Failed', data.message);
                this.setState({ isLoading: false })

            }
        }, error => {
            console.log(JSON.stringify(error))
        }
        )
    }
}


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
