import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native'

import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComp2 from '../Components/HeaderComp2';
import { StatusBar } from 'expo-status-bar';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import StatusBarComp from '../Components/StatusBarComp';
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";


export default class WeddingDetails extends Component {


    state = {
        ContactsList: [{ "name": "Haroon Shaukat", "status": false }, { "name": "Mubashir Mobi", "status": true }, { "name": "Haroon Iqbal", "status": false }],
        participants: [],
        isChecked: [],
        selectedLists: [],
        catdata: {}
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <HeaderComp2
                    titlepos={'center'}
                    leftBtnClicked={() => this.props.navigation.goBack()}
                    title={this.props.route.params.item.event_name}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <FlatList
                    data={this.state.participants}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={this.headerView()}
                />
            </View>

        );
    }

    headerView() {
        return (
            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text style={{ fontSize: 24, marginTop: 30, fontWeight: '600', color: mycolor.darkgray }}>{this.props.route.params.item.event_name}</Text>
                <View style={{ flexDirection: 'row', width: '100%', height: 60, marginTop: 34, alignItems: 'center' }}>
                    <Image style={{ width: 36, height: 36 }} source={require('../../assets/gentleman.png')}></Image>
                    <View style={{ marginLeft: 17 }}>
                        <Text style={{ fontSize: 16, color: mycolor.darkgray, fontWeight: '600' }}>{this.props.route.params.item.event_name}</Text>
                        <Text style={{ fontSize: 14, color: "#C9C9C9", marginTop: 3 }}>{"Host Name"}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', height: 60, marginTop: 0, alignItems: 'center' }}>
                    <Image style={{ width: 36, height: 36 }} source={require('../../assets/pink-calendar.png')}></Image>
                    <View style={{ marginLeft: 17 }}>
                        <Text style={{ fontSize: 16, color: mycolor.darkgray, fontWeight: '600' }}>{this.props.route.params.item.event_date}</Text>
                        <Text style={{ fontSize: 14, color: "#C9C9C9", marginTop: 3 }}>{"Event Date"}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', height: 60, marginTop: 0, alignItems: 'center' }}>
                    <Image style={{ width: 36, height: 36 }} source={require('../../assets/pink-phone.png')}></Image>
                    <View style={{ marginLeft: 17 }}>
                        <Text style={{ fontSize: 16, color: mycolor.darkgray, fontWeight: '600' }}>{this.props.route.params.item.event_status}</Text>
                        <Text style={{ fontSize: 14, color: "#C9C9C9", marginTop: 3 }}>{"Contact Number"}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 70, fontSize: 14, fontWeight: '700', color: mycolor.darkgray }}>Participants</Text>
            </View>
        );
    }

    renderItem({ item, index, props }) {
        return (
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5, borderRadius: 8, backgroundColor: item.check_in == '1' ? '#C5FFE6' : '#FFDBE1' }}>
                <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', marginLeft: 15, marginRight: 15 }}>
                    <Image resizeMode='cover' style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'gray' }} source={require('../../assets/icon_lady.png')}></Image>
                    <View style={{ flexDirection: 'row', marginLeft: 15, flex: 1, height: 60, alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: mycolor.darkgray }}>{item.name}</Text>
                        {/* <TouchableOpacity style={{ marginLeft: 'auto' }}>
                            {(item.check_in == "1") ?
                                <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: 12, width: 12 }} source={require('../../assets/green_tick.png')}></Image>
                                </View>
                                :
                                <Text style={{ fontSize: 12, color: mycolor.pink }}>Check In</Text>
                            }
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        );
    };

    actionOnRow(index) {
        
        var list = this.state.participants;
        console.log(list[index]);
        console.log("ID : "+list[index].id)
        console.log("NAME : "+list[index].name)
        this.updateCheckInStatus(list[index].id);
        if (list[index].check_in == "0") {
            list[index].check_in = "1";
        } else {
            list[index].check_in = "0";
        }
        console.log("check_in : "+list[index].check_in)
        this.setState({ participants: list });
    }

    async updateCheckInStatus(id) {
        let query = "/"+id
        ApiCalls.getGenericCall("check_in", query).then(data => {
            if (data.status == true) {
                console.log(data);
                // this.setState({ list: data.data, originalList: data.data })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    componentDidMount() {
        this.setState({
            participants: this.props.route.params.item.participants
        });

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

